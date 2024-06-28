import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AudiosService } from './audios.service';
import { AudioInput } from './dto/audio.input';

@Controller('audios')
export class AudiosController {
    constructor(private readonly audiosService: AudiosService) {}

    @Get()
    findAll() {
        return this.audiosService.findAll();
    }

    @Get("find/user/:userId/post/:postId")
    findOne(
        @Param("userId") userId: string,
        @Param("postId") postId: string
    ) {
        return this.audiosService.findOne(userId, postId);
    }

    @Post("create/user/:userId/post/:postId")
    create(
        @Param("userId") userId: string,
        @Param("postId") postId: string,
        @Body() audio: AudioInput
    ) {
        return this.audiosService.create(audio, userId, postId);
    }

    @Put("update/:id/user/:userId/post/:postId")
    update(
        @Param("id") id: string,
        @Param("userId") userId: string,
        @Param("postId") postId: string,
        @Body() audio: AudioInput
    ) {
        return this.audiosService.update(id, audio, userId, postId);
    }

    @Delete("delete/:id")
    delete(@Param("id") id: string) {
        return this.audiosService.delete(id);
    }
}
