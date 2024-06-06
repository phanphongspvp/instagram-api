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

    async signup(auth: AuthInput): Promise<boolean> {
        const { password, ...otherAuth } = auth;
        const authHashPassword = await bcrypt.hash(password, this.saltRounds);
        const authNew = await this.authModel.create({
            password: authHashPassword,
            ...otherAuth
        });
        if(authNew) return true;
        return false;
    }

    async login(auth: AuthInput): Promise<boolean> {
        const { username, password } = auth;
        const authCheckUser = await this.authModel.findOne({ username });
        if(authCheckUser) {
            const comparePassword = await bcrypt.compare(password, authCheckUser.password);
            if(comparePassword) return true;
            else return false;
        } else return false;
    }
}
