import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user.model';
import { Model } from 'mongoose';
import { UserInput } from './dto/user.input';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

     async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        return user;
    }

    async create(user: UserInput): Promise<User> {
        const { password, ...userDetail } = user;
        const hashedPassword = await this.hashPassword(password);
        const newUserHashedPassword = { ...userDetail, password: hashedPassword };
        const newUser = new this.userModel(newUserHashedPassword);
        return newUser.save();
    }

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    }

    async update(id: string, user: UserInput): Promise<User> {
        const updateUser = await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
        return updateUser;
    }

    async delete(id: string): Promise<User> {
        const user = await this.userModel.findByIdAndDelete(id).exec();
        return user;
    }
}
