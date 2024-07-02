import { UsersService } from 'src/users/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './model/post.model';
import { PostInput } from './dto/post.input';
import { LikesService } from 'src/likes/likes.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<Post>,
    private readonly usersService: UsersService
  ) {}

  async findAll(): Promise<Post[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  async findByUserId(userId: string): Promise<Post[]> {
    const posts = await this.postModel.find({ user: userId }).exec();
    return posts;
  }

  async findAllPostsCompleteUserInfo(): Promise<Post[]> {
    const posts = await this.postModel.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 1,
          content: 1,
          imageUrls: 1,
          user: {
            username: '$user.username',
            avatar: '$user.avatar'
          }
        }
      }
    ]).exec();

    return posts;
  }

  async findById(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).exec();
    if(!post) throw new NotFoundException("Post not found");
    return post;
  }

  async create(userId: string, post: PostInput): Promise<Post> {
    const user = await this.usersService.findById(userId);
    post.user = user?._id.toString();
    const postNew = await this.postModel.create(post);
    if(!postNew) throw new Error("Error create post");
    return postNew;
  }

  async update(id: string, post: PostInput): Promise<Post> {
    const postUpdate = await this.postModel.findByIdAndUpdate(id, post, { new: true });
    if (!postUpdate) throw new Error('Post not found');
    return postUpdate;
  }

  async delete(id: string): Promise<Post> {
    const postDelete = await this.postModel.findByIdAndDelete(id);
    if (!postDelete) throw new Error('Post not found');
    return postDelete;
  }
}
