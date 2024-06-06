import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthInput } from './dto/auth.input';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("signup")
    signup(@Body() auth: AuthInput) {
        return this.authService.signup(auth);
    }

    @Post("login")
    login(@Body() auth: AuthInput) {
        return this.authService.login(auth);
    }
}
