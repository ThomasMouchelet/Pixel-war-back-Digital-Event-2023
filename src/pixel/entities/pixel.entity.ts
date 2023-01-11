import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("pixel")
export class PixelEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    x: number;

    @Column()
    y: number;

    @Column()
    color: string;

    @ManyToOne(() => User, (user) => user.pixel)
    user: User;
}
