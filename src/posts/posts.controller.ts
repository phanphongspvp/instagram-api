import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PostInput } from './dto/post.input';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
@UseGuards(AuthGuard("jwt"))
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    @Get()
    getAll() {
        return this.postService.findAll();
    }

    @Get("users/detail")
    findAllPostsCompleteUserInfo() {
        return this.postService.findAllPostsCompleteUserInfo();
    }

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.postService.findById(id);
    }

    @Get("/users/:userId")
    findByUserId(@Param("userId") userId: string) {
        return this.postService.findByUserId(userId);
    }

    @Post(":id")
    create(@Param("id") id: string, @Body() post: PostInput) {
        return this.postService.create(id, post);
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
