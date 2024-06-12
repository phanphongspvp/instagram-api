import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeInput } from './dto/like.input';

@Controller('like')
export class LikeController {
    constructor(private readonly likeService: LikeService) {}

    @Get()
    getAll() {
        return this.likeService.findAll();
    }

    @Post(":id1/:id2")
    create(@Param("id1") id1: string, @Param("id2") id2: string, @Body() like: LikeInput) {
        return this.likeService.create(id1, id2, like);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.likeService.delete(id);
    }
}
