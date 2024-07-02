import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Like } from './model/like.model';
import { Model, ObjectId } from 'mongoose';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { CommentsService } from 'src/comments/comments.service';

@Injectable()
export class LikesService {
    constructor(
        @InjectModel(Like.name) private likeModel: Model<Like>,
        private readonly postsService: PostsService,
        private readonly usersService: UsersService,
        private readonly commentsService: CommentsService
    ) {}

    async findAll(): Promise<Like[]> {
        const likes = await this.likeModel.find().exec();
        return likes;
    }

    async findById(id: string): Promise<Like> {
        const like = await this.likeModel.findById(id).exec();
        if(!like) throw new NotFoundException("Like not found");
        return like;
    }

    async findOneByPost(userId: string, postId: string): Promise<Like> {
        const post = await this.postsService.findById(postId);
        const user = await this.usersService.findById(userId);
        const like = await this.likeModel.findOne({
            userId: user?._id,
            postId: post?._id
        });
        if(!like) throw new NotFoundException("Like not found");
        return like;
    }

    async findOneByComment(userId: string, commentId: string): Promise<Like> {
        const comment = await this.commentsService.findById(commentId);
        const user = await this.usersService.findById(userId);
        const like = await this.likeModel.findOne({
            userId: user?._id,
            commentId: comment?._id
        });
        if(!like) throw new NotFoundException("Like not found");
        return like;
    }

    async createLikePost(userId: string, postId: string): Promise<Like> {
        const post = await this.postsService.findById(postId);
        const user = await this.usersService.findById(userId);
        const like = await this.likeModel.create({
            userId: user?._id,
            postId: post?._id
        });
        if(!like) throw new Error("Error like post create");
        return like;
    }

    async createLikeComment(userId: string, commentId: string): Promise<Like> {
        const comment = await this.commentsService.findById(commentId);
        const user = await this.usersService.findById(userId);
        const like = await this.likeModel.create({
            userId: user?._id,
            commentId: comment?._id
        });
        if(!like) throw new Error("Error like comment create");
        return like;
    }

    async delete(id: string): Promise<Like> {
        const likeDelete = await this.likeModel.findByIdAndDelete(id);
        if(!likeDelete) throw new Error("Error like delete");
        return likeDelete;
    }

    async likePost(userId: string, postId: string) {
        const newLike = await this.createLikePost(userId, postId);
        const post = await this.postsService.findById(postId);
        const likeId: ObjectId = newLike?._id as ObjectId;
        if(!post.likes.includes(likeId)) {
            post.likes.push(likeId);
            await post.save();
        }
    }

    async unLikePost(userId: string, postId: string) {
        const newLike = await this.findOneByPost(userId, postId);
        const post = await this.postsService.findById(postId);
        const likeId: ObjectId = newLike?._id as ObjectId;
        if(post.likes.includes(likeId)) {
            post.likes = post.likes.filter(id => id.toString() !== likeId.toString());
            await post.save();
            await this.delete(likeId.toString());
        }
    }

    async likeComment(userId: string, commentId: string) {
        const newLike = await this.createLikeComment(userId, commentId);
        const comment = await this.commentsService.findById(commentId);
        const likeId: ObjectId = newLike?._id as ObjectId;
        if(!comment.likes?.includes(likeId)) {
            comment.likes.push(likeId);
            await comment.save();
        }
    }

    async unLikeComment(userId: string, commentId: string) {
        const newLike = await this.findOneByComment(userId, commentId);
        const comment = await this.commentsService.findById(commentId);
        const likeId: ObjectId = newLike?._id as ObjectId;
        if(comment.likes.includes(likeId)) {
            comment.likes = comment.likes.filter(id => id.toString() !== likeId.toString());
            await comment.save();
            await this.delete(likeId.toString());
        }
    }
}
