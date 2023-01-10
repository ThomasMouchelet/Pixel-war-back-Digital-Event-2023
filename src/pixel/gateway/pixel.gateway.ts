import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import * as dotenv from 'dotenv';

import { PixelService } from '../pixel.service';
import { PixelDto } from '../dto/pixel.dto';
import { Server, Socket } from 'socket.io';
import { ForbiddenException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

dotenv.config();

@WebSocketGateway({ cors: { origin: '*' }})
export class PixelGateway {
  @WebSocketServer()
  public server: Server;

  constructor(
    private readonly pixelService: PixelService,
    private readonly userService: UserService,
  ) {}

  async handleConnection(socket: Socket){
    console.log('Client connected');
    // Lorsque le user se connecte, on récupère son token
    // onst decodedToken = await this.authService.verifyJwt(socket.handshake.headers.authorization);
    // const user = await this.userService.findOne(decodedToken.id);
    // socket.data.user = user;
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
    // Récupérer le user dans le socker
    // const user = socket.data.user;
    console.log('newPixel', payload);
    const pixel = await this.pixelService.create(payload);
    console.log('handleNewPixel create', pixel);

    const pixels = await this.pixelService.findAll();
    this.server.emit('newPixel', pixels);
  }

  // @SubscribeMessage('createPixel')
  // async handleCreatePixel(socket: Socket, payload: PixelDto) {
  //   try {
  //     const pixel = await this.pixelService.create(payload);
  //     const updateUserScore = await this.userService.updateScore(pixel.user.id);
  //     console.log('updateUserScore => ', updateUserScore);

  //     const pixels = await this.pixelService.findAll();
  //     const lastUsers = await this.pixelService.findLastTwentyUser();
  //     const payloadResponse = {
  //       pixels: pixels,
  //       lastUsers: lastUsers,
  //     };
  //     // console.log("payloadResponse => ", payloadResponse);
  //     await this.server.emit('responsePixel', payloadResponse);
  //   } catch (error) {
  //     console.log('error => ', error.message);
  //     this.server.emit('createdPixel', {
  //       error: new ForbiddenException(error.message),
  //     });
  //   }
  // }
}
