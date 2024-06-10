import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './model/post.model';
import { PostInput } from './dto/post.input';

@Injectable()
export class PostsService {
    constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

    async findAll(): Promise<Post[]> {
        const posts = await this.postModel.find().exec();
        return posts;
    }

    async findOne(id: string): Promise<Post> {
        const post = await this.postModel.findById(id).exec();
        return post;
    }

    create(post: PostInput): Promise<Post> {
        const postNew = new this.postModel(post);
        return postNew.save();
    }

    async update(id: string, post: PostInput): Promise<Post> {
        const postUpdate = await this.postModel.findByIdAndUpdate(id, post, { new: true });
        return postUpdate;
    }

    async delete(id: string): Promise<Post> {
        const post = await this.postModel.findByIdAndDelete(id);
        return post;
    }
}
