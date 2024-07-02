import { Module } from '@nestjs/common';
import { AudiosService } from './audios.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsService } from 'src/posts/posts.service';
import { UsersService } from 'src/users/users.service';
import { Audio, AudioModel } from './model/audio.model';
import { AudiosController } from './audios.controller';
import { User, UserModel } from 'src/users/model/user.model';
import { Post, PostModel } from 'src/posts/model/post.model';

@Module({
  imports: [ MongooseModule.forFeature([
    { name: Audio.name, schema: AudioModel },
    { name: User.name, schema: UserModel },
    { name: Post.name, schema: PostModel }
  ])],
  controllers: [AudiosController],
  providers: [AudiosService, UsersService, PostsService]
})
export class AudiosModule {}
