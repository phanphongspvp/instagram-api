import { Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LikesService } from './likes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('likes')
@UseGuards(AuthGuard('jwt'))
export class LikesController {
    constructor(private readonly likesService: LikesService) {}

    @Get()
    findAll() {
        return this.likesService.findAll();
    }

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.likesService.findById(id);
    }

    @Get("users/:userId/posts/:postId")
    findOneByPost(@Param("userId") userId: string, @Param("postId") postId: string) {
        return this.likesService.findOneByPost(userId, postId);
    }

    @Post("users/:userId/posts/:postId")
    createLikePost(@Param("userId") userId: string, @Param("postId") postId: string) {
        return this.likesService.createLikePost(userId, postId);
    }

    @Post("users/:userId/comments/:commentId")
    findOneByComment(@Param("userId") userId: string, @Param("commentId") commentId: string) {
        return this.likesService.findOneByComment(userId, commentId);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.likesService.delete(id);
    }

    @Post("likePost/users/:userId/posts/:postId")
    likePost(@Param("userId") userId: string, @Param("postId") postId: string) {
        return this.likesService.likePost(userId, postId);
    }

    @Post("unLikePost/users/:userId/posts/:postId")
    unLikePost(@Param("userId") userId: string, @Param("postId") postId: string) {
        return this.likesService.unLikePost(userId, postId);
    }

    @Post("likeComment/users/:userId/comments/:commentId")
    likeComment(@Param("userId") userId: string, @Param("commentId") commentId: string) {
        return this.likesService.likeComment(userId, commentId);
    }

    @Post("unLikeComment/users/:userId/comments/:commentId")
    unLikeComment(@Param("userId") userId: string, @Param("commentId") commentId: string) {
        return this.likesService.unLikeComment(userId, commentId);
    }
}
