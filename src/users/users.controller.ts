import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserInput } from './dto/user.input';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/jwtStrategy/jwt.protected.roles';

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    @UseGuards(RolesGuard)
    findAll() {
        return this.userService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.userService.findById(id);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() user: UserInput) {
        return this.userService.update(id, user);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.userService.delete(id);
    }
}
