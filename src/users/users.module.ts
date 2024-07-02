import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from './model/user.model';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
    imports: [ MongooseModule.forFeature([{ name: User.name, schema: UserModel }]) ],
    controllers: [UsersController],
    providers: [UsersService]
})
export class UsersModule {}
