import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AudiosService } from './audios.service';
import { AudioInput } from './dto/audio.input';
import { AuthGuard } from '@nestjs/passport';

@Controller('audios')
@UseGuards(AuthGuard('jwt'))
export class AudiosController {
    constructor(private readonly audiosService: AudiosService) {}

    @Get()
    findAll() {
        return this.audiosService.findAll();
    }

    @Get(":id")
    findById(@Param("id") id: string) {
        return this.audiosService.findById(id);
    }

    @Get("users/:userId/posts/:postId")
    findOne(
        @Param("userId") userId: string,
        @Param("postId") postId: string
    ) {
        return this.audiosService.findOneByUserAndPost(userId, postId);
    }

    @Post("users/:userId/posts/:postId")
    create(
        @Param("userId") userId: string,
        @Param("postId") postId: string,
        @Body() audio: AudioInput
    ) {
        return this.audiosService.create(audio, userId, postId);
    }

    @Put(":id/users/:userId/posts/:postId")
    update(
        @Param("id") id: string,
        @Param("userId") userId: string,
        @Param("postId") postId: string,
        @Body() audio: AudioInput
    ) {
        return this.audiosService.update(id, audio, userId, postId);
    }

    @Delete(":id")
    delete(@Param("id") id: string) {
        return this.audiosService.delete(id);
    }
}
