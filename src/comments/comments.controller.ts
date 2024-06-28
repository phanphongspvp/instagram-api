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

    @Get("find/user/:userId/post/:postId")
    findOne(
        @Param("userId") userId: string,
        @Param("postId") postId: string
    ) {
        return this.commentService.findOne(userId, postId);
    }

    @Post("create/user/:userId/post/:postId")
    create(
        @Param("postId") postId: string,
        @Param("userId") userId: string,
        @Body() comment: CommentDto
    ) {
        return this.commentService.create(comment, postId, userId);
    }

    @Put("update/:id/user/:userId/post/:postId")
    update(
        @Param("userId") id: string,
        @Param("userId") userId: string,
        @Param("postId") postId: string,
        @Body() comment: CommentDto
    ) {
        return this.commentService.update(id, comment, postId, userId);
    }

    @Delete("delete/:id")
    delete(
        @Param("id") id: string
    ) {
        return this.commentService.delete(id);
    }
}
