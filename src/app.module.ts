import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { BusinessModule } from './business/business.module';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://ig:ig1234@ig.oocfbzh.mongodb.net/?retryWrites=true&w=majority&appName=ig"),
    UsersModule,
    CategoriesModule,
    BusinessModule,
    AuthModule,
    PostsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
