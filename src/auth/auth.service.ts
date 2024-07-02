import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserInput } from 'src/users/dto/user.input';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwtStrategy/jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signup(auth: UserInput): Promise<Object> {
        try {
            const authNew = await this.userService.create(auth);
            if(authNew) {
                const payload: JwtPayload = {
                    userId: authNew.id,
                    name: authNew.name,
                    username: authNew.username,
                    roles: authNew.roles,
                    avatar: authNew.avatar,
                    logged: authNew.logged
                };
                const accessToken = await this.jwtService.sign(payload);
                return { accessToken };
            } else {
                throw new UnauthorizedException("Error sign up credentialed");
            }
        } catch (err) {
            throw new Error('Error sign up');
        }
    }

    async login(auth: UserInput): Promise<Object> {
        try {
            const { username, password } = auth;
            const authCheckUser = await this.userService.findOne({ username: username });
            if(authCheckUser) {
                const comparePassword = await bcrypt.compare(password, authCheckUser.password);
                if(comparePassword) {
                    const payload: JwtPayload = {
                        userId: authCheckUser.id,
                        name: authCheckUser.name,
                        username: username,
                        roles: authCheckUser.roles,
                        avatar: authCheckUser.avatar,
                        logged: authCheckUser.logged
                    };
                    const accessToken = this.jwtService.sign(payload);
                    return { accessToken };
                }
                else {
                    throw new UnauthorizedException("Please check your login credentials");
                }
            } else {
                throw new UnauthorizedException("Please check your login credentials");
            };
        } catch (err) {
            console.log("Error login:", err);
            throw new Error('Error sign in');
        }
    }
}
