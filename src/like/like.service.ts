import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/posts/model/post.model';
import { User } from 'src/users/model/user.model';
import { Like } from './model/like.model';
import { LikeInput } from './dto/like.input';

@Injectable()
export class LikeService {
    constructor(
        @InjectModel(Like.name) private likeModel: Model<Like>,
        @InjectModel(Post.name) private postModel: Model<Post>,
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async findAll(): Promise<Like[]> {
        const posts = await this.likeModel.find().exec();
        return posts;
    }

    async create(userId: string, postId: string, like: LikeInput): Promise<Like> {
        const user = await this.userModel.findById(userId).exec();
        if(!user) {
            throw new NotFoundException("User not found");
        }
        const post = await this.postModel.findById(postId).exec();
        if(!post) {
            throw new NotFoundException("Post not found");
        }
        like.user = user;
        like.post = post;
        const postNew = new this.likeModel(like);
        return postNew.save();
    }

    async delete(id: string): Promise<Like> {
        const like = await this.likeModel.findByIdAndDelete(id);
        return like;
    }
}
