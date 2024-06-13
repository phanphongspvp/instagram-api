import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentService: CommentsService) {}

    @Get()
    getAll() {
        return this.commentService.findAll();
    }

    @Get(":id")
    findAllById(@Param("id") id: string) {
        return this.commentService.findByPostId(id);
    }

    @Post(":postId/:userId")
    create(@Param("postId") postId: string, @Param("userId") userId: string, @Body() comment: CommentDto) {
        return this.commentService.create(comment, postId, userId);
    }
}
