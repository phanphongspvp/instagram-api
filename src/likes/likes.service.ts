import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from './model/like.model';
import { Model } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LikesService {
    constructor(
        @InjectModel(Like.name) private likeModel: Model<Like>,
        private readonly postsService: PostsService,
        private readonly usersService: UsersService
    ) {}

    async findAll(): Promise<Like[]> {
        const likes = await this.likeModel.find().exec();
        return likes;
    }

    async findOne(userId: string, postId: string): Promise<Like> {
        const post = await this.postsService.findById(postId);
        const user = await this.usersService.findById(userId);
        const like = await this.likeModel.findOne({
            userId: user?._id,
            postId: post?._id
        });
        return like;
    }

    async create(userId: string, postId: string): Promise<Like> {
        const post = await this.postsService.findById(postId);
        const user = await this.usersService.findById(userId);
        const like = await this.likeModel.create({
            userId: user?._id,
            postId: post?._id
        });
        return like;
    }

    async delete(id: string) {
        try {
            const likeDelete = await this.likeModel.deleteOne({ _id: id });
            if(likeDelete) return true
            else return false
        } catch (error) {
            console.error("Delete like post error:", error);
        }
    }
}
