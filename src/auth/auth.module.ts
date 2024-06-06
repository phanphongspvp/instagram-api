import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthModel } from './model/auth.model';

@Module({
  imports: [ MongooseModule.forFeature([{ name: Auth.name, schema: AuthModel }]) ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
