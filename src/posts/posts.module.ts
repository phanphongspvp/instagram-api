import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from './posts.service';
import { UsersService } from 'src/users/users.service';
import { Post, PostModel } from './model/post.model';
import { User, UserModel } from 'src/users/model/user.model';
import { Like, LikeModel } from 'src/likes/model/like.model';
import { LikesService } from 'src/likes/likes.service';

@Module({
  imports:[ MongooseModule.forFeature([
    { name: Post.name, schema: PostModel },
    { name: User.name, schema: UserModel },
    { name: Like.name, schema: LikeModel },
  ])],
  controllers: [PostsController],
  providers: [PostsService, UsersService]
})
export class PostsModule {}
