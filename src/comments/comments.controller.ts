import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
    constructor(private readonly commentService: CommentsService) {}

    @Get()
    getAll() {
        return this.commentService.findAll();
    }

    @Get(":id")
    findById(
        @Param("id") id: string
    ) {
        return this.commentService.findById(id);
    }

    @Get("users/:userId/posts/:postId")
    findOneByUserIdAndPostId(
        @Param("userId") userId: string,
        @Param("postId") postId: string
    ) {
        return this.commentService.findOneByUserAndPost(userId, postId);
    }

    @Post("users/:userId/posts/:postId")
    create(
        @Param("postId") postId: string,
        @Param("userId") userId: string,
        @Body() comment: CommentDto
    ) {
        return this.commentService.create(comment, userId, postId);
    }

    @Put(":id/users/:userId/posts/:postId")
    update(
        @Param("userId") id: string,
        @Param("userId") userId: string,
        @Param("postId") postId: string,
        @Body() comment: CommentDto
    ) {
        return this.commentService.update(id, comment, userId, postId);
    }

    @Delete(":id")
    delete(
        @Param("id") id: string
    ) {
        return this.commentService.delete(id);
    }
}
