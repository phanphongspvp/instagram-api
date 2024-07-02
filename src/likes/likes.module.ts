import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Like, LikeModel } from './model/like.model';
import { User, UserModel } from 'src/users/model/user.model';
import { Post, PostModel } from 'src/posts/model/post.model';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';
import { Comment, CommentModel } from 'src/comments/model/comment.model';
import { CommentsService } from 'src/comments/comments.service';

@Module({
  imports: [ MongooseModule.forFeature([
    { name: Like.name, schema: LikeModel },
    { name: User.name, schema: UserModel },
    { name: Post.name, schema: PostModel },
    { name: Comment.name, schema: CommentModel },
  ])],
  controllers: [LikesController],
  providers: [LikesService, UsersService, PostsService, CommentsService]
})
export class LikesModule {}
