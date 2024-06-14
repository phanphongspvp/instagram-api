import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Post } from "src/posts/model/post.model";

@Schema({ _id: false })
class EmbeddedUser {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    avatar: string;
}

@Schema({ timestamps: true })
export class Comment extends Document {
    @Prop({ required: true })
    comment: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Post', required: true })
    post: Post

    @Prop({ type: EmbeddedUser, ref: 'User', required: true })
    user: EmbeddedUser

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const CommentModel = SchemaFactory.createForClass(Comment);