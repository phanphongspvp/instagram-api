import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Audio } from './model/audio.model';
import { Model } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { AudioInput } from './dto/audio.input';

@Injectable()
export class AudiosService {
    constructor(
        @InjectModel(Audio.name) private audioModel: Model<Audio>,
        private readonly postsService: PostsService,
        private readonly usersService: UsersService
    ) {}

    async findAll(): Promise<Audio[]> {
        const audios = await this.audioModel.find().exec();
        return audios;
    }

    async findById(id: string): Promise<Audio> {
        const audio = await this.audioModel.findById(id);
        if(!audio) throw new NotFoundException("Audio not found");
        return audio;
    }

    async findOneByUserAndPost(userId: string, postId: string): Promise<Audio> {
        const post = await this.postsService.findById(postId);
        const user = await this.usersService.findById(userId);
        const audio = await this.audioModel.findOne({
            userId: user?._id,
            postId: post?._id
        });
        if(!audio) throw new NotFoundException("Audio not found");
        return audio;
    }

    async create(audio: AudioInput, userId: string, postId: string): Promise<Audio> {
        const post = await this.postsService.findById(postId);
        const user = await this.usersService.findById(userId);
        const audioNew = await this.audioModel.create({
            audio: audio,
            userId: user?._id,
            postId: post?._id
        });
        if(!audioNew) throw new Error("Error audio create");
        return audioNew;
    }

    async update(id: string, audio: AudioInput, userId: string, postId: string): Promise<Audio> {
        const post = await this.postsService.findById(postId);
        const user = await this.usersService.findById(userId);
        const audioData = {
            audio: audio,
            userId: user?._id,
            postId: post?._id
        }
        const audioUpdate = await this.audioModel.findByIdAndUpdate(id, audioData, { new: true });
        if(!audioUpdate) throw new Error("Error audio update");
        return audioUpdate;
    }

    async delete(id: string) {
        const audioDelete = await this.audioModel.findByIdAndDelete(id);
        if(!audioDelete) throw new Error("Error audio delete");
        return audioDelete;
    }
}
