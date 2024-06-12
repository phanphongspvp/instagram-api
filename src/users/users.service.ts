import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user.model';
import { Model } from 'mongoose';
import { UserInput } from './dto/user.input';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find().exec();
        return users;
    }

     async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).exec();
        if(!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async update(id: string, user: UserInput): Promise<User> {
        const updateUser = await this.userModel.findByIdAndUpdate(id, user, { new: true }).exec();
        if(!updateUser) {
            throw new NotFoundException("User not found");
        }
        return updateUser;
    }

    async delete(id: string): Promise<User> {
        const user = await this.userModel.findByIdAndDelete(id).exec();
        if(!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }
}
