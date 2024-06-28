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

    async findOne(userId: string, postId: string): Promise<Audio> {
        const post = await this.postsService.findById(postId);
        const user = await this.usersService.findById(userId);
        if(!post) {
            throw new NotFoundException("Post not found");
        }
        if(!user) {
            throw new NotFoundException("User not found");
        }
        const like = await this.audioModel.findOne({
            userId: user?._id,
            postId: post?._id
        });
        return like;
    }

    async create(audio: AudioInput, userId: string, postId: string): Promise<Audio> {
        const post = await this.postsService.findById(postId);
        const user = await this.usersService.findById(userId);
        if(!post) {
            throw new NotFoundException("Post not found");
        }
        if(!user) {
            throw new NotFoundException("User not found");
        }
        const like = await this.audioModel.create({
            audio: audio,
            userId: user?._id,
            postId: post?._id
        });
        return like;
    }

    async update(id: string, audio: AudioInput, userId: string, postId: string): Promise<Audio> {
        const post = await this.postsService.findById(postId);
        const user = await this.usersService.findById(userId);
        const audioData = {
            audio: audio,
            userId: user?._id,
            postId: post?._id
        }

        const like = await this.audioModel.findByIdAndUpdate(id, audioData, {
            new: true,
        });
        return like;
    }

    async delete(id: string) {
        try {
            const audion = await this.audioModel.findByIdAndDelete(id);
            if(audion) return true
            else return false;
        } catch (error) {
            console.error("Delete like post error:", error);
        }
    }
}
