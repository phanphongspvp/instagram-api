import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PostInput } from './dto/post.input';
import { PostsService } from './posts.service';
import { ObjectId } from 'mongoose';
import { AuthGuard } from '@nestjs/passport';

@Controller('posts')
// @UseGuards(AuthGuard("jwt"))
export class PostsController {
    constructor(private readonly postService: PostsService) {}

    @Get()
    getAll() {
        return this.postService.findAll();
    }

    @Get("/user/:id")
    findByUserId(@Param("id") id: string) {
        return this.postService.findByUserId(id);
    }

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.postService.findById(id);
    }

    @Post(":id")
    create(@Param("id") id: string, @Body() post: PostInput) {
        return this.postService.create(post, id);
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() post: PostInput) {
        return this.postService.update(id, post);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.postService.delete(id);
    }

    // @Post("likes/user/:userId/post/:postId")
    // like(@Param("userId") userId: string, @Param("postId") postId: string) {
    //     return this.postService.like(userId, postId);
    // }

    // @Post("unlikes/user/:userId/post/:postId")
    // unlike(@Param("userId") userId: string, @Param("postId") postId: string) {
    //     return this.postService.unlike(userId, postId);
    // }
}
