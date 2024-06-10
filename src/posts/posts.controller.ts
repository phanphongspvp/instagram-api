import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostInput } from './dto/post.input';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    @Get()
    getAll() {
        return this.postService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string) {
        return this.postService.findOne(id);
    }

    @Post()
    create(@Body() post: PostInput) {
        return this.postService.create(post);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() post: PostInput) {
        return this.postService.update(id, post);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.postService.delete(id);
    }
}
