import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserInput } from 'src/users/dto/user.input';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    signup(@Body() auth: UserInput) {
        return this.authService.signup(auth);
    }

    @Post("login")
    login(@Body() auth: UserInput) {
        return this.authService.login(auth);
    }
}
