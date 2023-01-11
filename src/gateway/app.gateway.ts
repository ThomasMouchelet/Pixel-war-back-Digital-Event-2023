import { ConnectedSocket, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { PixelService } from 'src/pixel/pixel.service';
import { Console } from 'console';
import { AuthService } from 'src/auth/auth.service';
import { UserService } from 'src/user/user.service';

@WebSocketGateway({ cors: { origin: "*" } })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect, OnModuleInit {
  @WebSocketServer()
  public server: Server;

  constructor(
    private pixelService: PixelService,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  async onModuleInit() {
    console.log('ChatGateway initialized');
  }

  async handleConnection(@ConnectedSocket() socket: Socket){
    console.log('Client connected');

    
    try {
      const decodedToken = await this.authService.verifyJwt(socket.handshake.headers.authorization);
      const user = await this.userService.findOne(decodedToken.id);

      if (!user) {
        return this.disconnect(socket);
      } else {
        socket.data.user = user;
        // await this.connectedUserService.create({ socketId: socket.id, user });
      }
      
    } catch (error) {
        return this.disconnect(socket);
    }

    const pixels = await this.pixelService.findAll();
    this.server.emit('newPixel', pixels);
  }

  async handleDisconnect(socket: Socket) {
    console.log('Client disconnected');
  }

  private disconnect(socket: Socket) {
    console.log('Client disconnected');
  }

  @SubscribeMessage('newPixel')
  async handleNewPixel(socket: Socket, payload: any) {
    console.log('newPixel', payload);
    console.log("handleNewPixel authorization", socket.handshake.headers.authorization)
    console.log("handleNewPixel user", socket.data.user)
    const pixel = await this.pixelService.create(payload);
    console.log('handleNewPixel create', pixel);

    const pixels = await this.pixelService.findAll();
    this.server.emit('newPixel', pixels);
  }
}
