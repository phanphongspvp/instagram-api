import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Post } from './model/post.model';
import { PostInput } from './dto/post.input';
import { User } from 'src/users/model/user.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async findAll(): Promise<Post[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  async findByUserId(id: string): Promise<Post[]> {
    const posts = await this.postModel.find({ user: id }).exec();
    return posts;
  }

  async create(post: PostInput, userId: string): Promise<Post> {
    const user = await this.userModel.findById(userId).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    post.user = user;
    const postNew = new this.postModel(post);
    return postNew.save();
  }

  async update(id: string, post: PostInput): Promise<Post> {
    const postUpdate = await this.postModel.findByIdAndUpdate(id, post, {
      new: true,
    });
    if (!postUpdate) {
      throw new NotFoundException('User not found');
    }
    return postUpdate;
  }

  async delete(id: string): Promise<Post> {
    const post = await this.postModel.findByIdAndDelete(id);
    if (!post) {
      throw new NotFoundException('User not found');
    }
    return post;
  }

  async like(postId: string, userId: ObjectId): Promise<Post | null> {
    const post = await this.postModel.findById(postId).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (!post.likes.includes(userId)) {
      post.likes.push(userId);
      post.save();
    }
    return post;
  }

  async unlike(postId: string, userId: ObjectId): Promise<Post | null> {
    const post = await this.postModel.findById(postId).exec();
    if (!post) {
      throw new NotFoundException('Post not found');
    }
    post.likes = post.likes.filter((id) => id != userId);
    await post.save();

    return post;
  }
}
