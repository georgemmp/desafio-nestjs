import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToMany, Unique } from "typeorm";
import { Task } from "./task.entity";
import * as bcrypt from 'bcrypt';

@Entity()
@Unique(['email', 'username'])
export class User extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(() => Task, task => task.user)
    tasks: Task[];

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password;
    }
}