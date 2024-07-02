import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
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

    async findById(id: string): Promise<Comment> {
        const comment = await this.commentModel.findById(id).exec();
        if(!comment) throw new NotFoundException("Comment not found");
        return comment;
    }

    async findByPostId(postId: string): Promise<Comment[]> {
        const comments = await this.commentModel.find({ post: postId }).exec();
        return comments;
    }

    async findOneByUserAndPost(userId: string, postId: string): Promise<Comment> {
        const user = await this.usersService.findById(userId);
        const post = await this.postsService.findById(postId);
        const findPost = await this.commentModel.findOne({
            userId: user?._id.toString(),
            postId: post?._id.toString()
        });
        if(!findPost) throw new NotFoundException("Comment not found");
        return findPost;
    }

    async create(comment: CommentDto, userId: string, postId: string) {
        const post = await this.postsService.findById(postId);
        const user = await this.usersService.findById(userId);
        const commentData = {
            comment: comment.comment,
            userId: user?._id.toString(),
            postId: post?._id.toString()
        }
        const newComment = await this.commentModel.create(commentData);
        if(!newComment) throw new Error("Error comment create");
        return newComment;
    }

    async update(id: string, comment: CommentDto, userId: string, postId: string): Promise<Comment> {
        const post = await this.postsService.findById(postId);
        const user = await this.usersService.findById(userId);
        const postData = {
            comment: comment,
            userId: user._id.toString(),
            postId: post._id.toString()
        }
        const newPost = await this.commentModel.findByIdAndUpdate(id, postData, { new: true });
        if(!newPost) throw new Error("Error comment update");
        return newPost;
    }

    async delete(id: string) {
        const commentDelete = await this.commentModel.findByIdAndDelete(id);
        if(!commentDelete) throw new Error("Error comment delete");
        return commentDelete;
    }
}
