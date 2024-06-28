import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { AudiosModule } from './audios/audios.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://ig:ig1234@ig.oocfbzh.mongodb.net/?retryWrites=true&w=majority&appName=ig"),
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    AudiosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
