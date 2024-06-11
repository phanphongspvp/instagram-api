import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './model/user.model';
import { Model } from 'mongoose';
import { UserInput } from './dto/user.input';
import * as bcrypt from "bcrypt";
import { Auth } from 'src/auth/model/auth.model';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        @InjectModel(Auth.name) private authModel: Model<Auth>
    ) {}

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find().populate("auth").exec();
        return users;
    }

     async findOne(id: string): Promise<User> {
        const user = await this.userModel.findById(id).populate("auth").exec();
        if(!user) {
            throw new NotFoundException("User not found");
        }
        return user;
    }

    async create(user: UserInput, authId: string): Promise<User> {
        const auth = await this.authModel.findById(authId).exec();
        if(!auth) {
            throw new NotFoundException("User not found");
        }
        user.auth = auth;
        const newUser = new this.userModel(user);
        return newUser.save();
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
