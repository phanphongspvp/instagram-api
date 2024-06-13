import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostModel } from 'src/posts/model/post.model';
import { User, UserModel } from 'src/users/model/user.model';
import { Comment, CommentModel } from './model/comment.model';

@Module({
  imports: [ MongooseModule.forFeature([
    { name: Comment.name, schema: CommentModel },
    { name: Post.name, schema: PostModel },
    { name: User.name, schema: UserModel },
  ]) ],
  providers: [CommentsService],
  controllers: [CommentsController]
})
export class CommentsModule {}
