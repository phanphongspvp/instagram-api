import { Module, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserModel } from 'src/users/model/user.model';
import { PostModel } from 'src/posts/model/post.model';
import { Like, LikeModel } from './model/like.model';

@Module({
  imports: [ MongooseModule.forFeature([
    { name: Like.name, schema: LikeModel },
    { name: Post.name, schema: PostModel },
    { name: User.name, schema: UserModel }
  ])],
  providers: [LikeService],
  controllers: [LikeController]
})
export class LikeModule {}
