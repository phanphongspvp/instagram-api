import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from 'src/users/model/user.model';

@Module({
  imports: [ MongooseModule.forFeature([{ name: User.name, schema: UserModel }]) ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
