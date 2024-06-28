import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './model/comment.model';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<Comment>,
        private readonly usersService: UsersService,
        private readonly postsService: PostsService,
    ) {}

    async findAll(): Promise<Comment[]> {
        const comments = await this.commentModel.find().exec();
        return comments;
    }

    async findById(id: string): Promise<Comment[]> {
        const comments = await this.commentModel.find({ post: id }).exec();
        return comments;
    }

    async findOne(userId: string, postId: string): Promise<Comment> {
        const user = await this.usersService.findById(userId);
        const post = await this.postsService.findById(postId);
        const findPost = await this.commentModel.findOne({
            userId: user._id.toString(),
            postId: post._id.toString()
        });
        return findPost;
    }

    async create(comment: CommentDto, userId: string, postId: string): Promise<Comment> {
        const post = await this.postsService.findById(postId);
        const user = await this.usersService.findById(userId);
        const postData = {
            comment: comment,
            userId: user._id.toString(),
            postId: post._id.toString()
        }
        const newPost = await this.commentModel.create(postData);
        return newPost;
    }

    async update(id: string, comment: CommentDto, userId: string, postId: string): Promise<Comment> {
        const post = await this.postsService.findById(postId);
        const user = await this.usersService.findById(userId);
        const postData = {
            comment: comment,
            userId: user._id.toString(),
            postId: post._id.toString()
        }
        const newPost = await this.commentModel.findByIdAndUpdate(id, postData, {
            new: true
        });
        return newPost;
    }

    async delete(id: string) {
        try {
            const commentDelete = await this.commentModel.deleteOne({ _id: id });
            if(commentDelete) return true
            else return false;
        } catch (error) {
            console.error("Delete like post error:", error);
        }
    }
}
