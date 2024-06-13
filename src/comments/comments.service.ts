import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from 'src/posts/model/post.model';
import { User } from 'src/users/model/user.model';
import { Comment } from './model/comment.model';
import { CommentDto } from './dto/comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<Comment>,
        @InjectModel(Post.name) private postModel: Model<Post>,
        @InjectModel(User.name) private userModel: Model<User>
    ) {}

    async findAll(): Promise<Comment[]> {
        const comments = await this.commentModel.find().exec();
        return comments;
    }

    async findByPostId(id: string): Promise<Comment[]> {
        const comments = await this.commentModel.find({ post: id }).exec();
        return comments;
    }

    async create(comment: CommentDto, postId: string, userId: string): Promise<Comment> {
        const post = await this.postModel.findById(postId).exec();
        if(!post) {
            throw new NotFoundException("Post not found");
        }
        const user = await this.userModel.findById(userId).exec();
        if(!user) {
            throw new NotFoundException("User not found");
        }
        comment.post = post;
        comment.user = user;
        const commentNew = new this.commentModel(comment);
        return commentNew.save();
    }
}
