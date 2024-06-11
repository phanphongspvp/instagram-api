import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostModel } from './model/post.model';
import { User, UserModel } from 'src/users/model/user.model';

@Module({
  imports:[ MongooseModule.forFeature([
    { name: Post.name, schema: PostModel },
    { name: User.name, schema: UserModel }
  ])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
