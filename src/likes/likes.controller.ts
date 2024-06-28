import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
    constructor(private readonly likesService: LikesService) {}

    @Get()
    findAll() {
        return this.likesService.findAll();
    }

    @Get("find/user/:userId/post/:postId")
    findOne(@Param("userId") userId: string, @Param("postId") postId: string) {
        return this.likesService.findOne(userId, postId);
    }

    @Post("create/user/:userId/post/:postId")
    create(@Param("userId") userId: string, @Param("postId") postId: string) {
        return this.likesService.create(userId, postId);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.likesService.delete(id);
    }
}
