import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user.model';
import { Model } from 'mongoose';
import { UserInput } from './dto/user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    private readonly saltRounds = 10;

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

    async findById(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if(!user) throw new NotFoundException("User not found");
        return user;
    }

    async findOne(info: Object): Promise<User> {
        const user = await this.userModel.findOne(info);
        if(!user) throw new NotFoundException("User not found");
        return user;
    }

    async create(user: UserInput): Promise<User> {
        const { password, ...otherUser } = user;
        const userHashPassword = await bcrypt.hash(password, this.saltRounds);
        const newUser = await this.userModel.create({
            password: userHashPassword,
            ...otherUser
        });
        if(!newUser) throw new Error("Error user create");
        return newUser;
    }

    async update(id: string, user: UserInput): Promise<User> {
        const updateUser = await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
        if(!updateUser) throw new Error("Error user update");
        return updateUser;
    }

    async delete(id: string): Promise<User> {
        const deleteUser = await this.userModel.findByIdAndDelete(id).exec();
        if(!deleteUser) throw new Error("Error user delete");
        return deleteUser;
    }
}
