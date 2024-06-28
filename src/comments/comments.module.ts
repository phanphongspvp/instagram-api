import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostModel } from 'src/posts/model/post.model';
import { User, UserModel } from 'src/users/model/user.model';
import { Comment, CommentModel } from './model/comment.model';
import { UsersService } from 'src/users/users.service';
import { PostsService } from 'src/posts/posts.service';
@Module({
  imports: [ MongooseModule.forFeature([
    { name: Comment.name, schema: CommentModel },
    { name: User.name, schema: UserModel },
    { name: Post.name, schema: PostModel }
  ])],
  controllers: [CommentsController],
  providers: [CommentsService, UsersService, PostsService]
})
export class CommentsModule {}
