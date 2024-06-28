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
    private readonly usersService: UsersService,
    // private readonly likesService: LikesService,
  ) {}

  async findAll(): Promise<Post[]> {
    const posts = await this.postModel.find().exec();
    return posts;
  }

  async findByUserId(id: string): Promise<Post[]> {
    const posts = await this.postModel.find({ user: id }).exec();
    return posts;
  }

  async findById(id: string): Promise<Post> {
    const post = await this.postModel.findById(id).exec();
    return post;
  }

  async create(post: PostInput, userId: string): Promise<Post> {
    const user = await this.usersService.findById(userId);
    post.user = user?._id.toString();
    const postNew = await this.postModel.create(post);
    return postNew;
  }

  async update(id: string, post: PostInput): Promise<Post> {
    const postUpdate = await this.postModel.findByIdAndUpdate(id, post, {
      new: true,
    });
    if (!postUpdate) {
      throw new NotFoundException('Post not found');
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

  // async like(userId: string, postId: string) {
  //   const newLike = await this.likesService.create(userId, postId);
  //   const post = new this.postModel;
  //   const likeId: ObjectId = newLike?._id as ObjectId;
  //   if(!post.likes.includes(likeId)) {
  //     post.likes.push(likeId);
  //     await post.save();
  //   }
  // }

  // async unlike(userId: string, postId: string) {
  //   const newLike = await this.likesService.findOne(userId, postId);
  //   const post = new this.postModel;
  //   const likeId: ObjectId = newLike?._id as ObjectId;
  //   if(post.likes.includes(likeId)) {
  //     post.likes = post.likes.filter(id => id != likeId);
  //     await post.save();
  //   }
  // }
}
