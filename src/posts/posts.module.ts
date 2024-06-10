import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostModel } from './model/post.model';

@Module({
  imports:[ MongooseModule.forFeature([{ name: Post.name, schema: PostModel }])],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
