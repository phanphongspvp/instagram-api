import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { User } from './model/user.model';
import { UsersService } from './users.service';
import { UserInput } from './dto/user.input';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    findAll() {
        return this.userService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.userService.findOne(id);
    }

    @Post()
    create(@Body() user: UserInput) {
        return this.userService.create(user);
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
