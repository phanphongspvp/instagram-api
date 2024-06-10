import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './model/auth.model';
import { Model } from 'mongoose';
import { AuthInput } from './dto/auth.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(Auth.name) private authModel: Model<Auth>) {}

    private readonly saltRounds = 10;

    async signup(auth: AuthInput): Promise<Object> {
        try {
            const { password, ...otherAuth } = auth;
            const authHashPassword = await bcrypt.hash(password, this.saltRounds);
            const authNew = await this.authModel.create({
                password: authHashPassword,
                ...otherAuth
            });
            if(authNew) {
                return {
                    name: authNew.name,
                    username: authNew.username,
                    avatar: authNew?.avatar,
                    logged: true
                }
            } else {
                return { logged: false }
            }
        } catch (error) {
            console.error('Error in signup:', error);
            throw error;
        }
    }

    async login(auth: AuthInput): Promise<Object> {
        try {
            const { username, password } = auth;
            const authCheckUser = await this.authModel.findOne({ username });
            if(authCheckUser) {
                const comparePassword = await bcrypt.compare(password, authCheckUser.password);
                if(comparePassword) {
                    return {
                        name: authCheckUser.name,
                        username: authCheckUser.username,
                        avatar: authCheckUser.avatar,
                        logged: true
                    }
                }
                else return { logged: false };
            } else return { logged: false };
        } catch (error) {
            console.error('Error in signup:', error);
            throw error;
        }
    }
}
