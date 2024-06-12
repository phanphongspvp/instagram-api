import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Post } from "src/posts/model/post.model";
import { User } from "src/users/model/user.model";

@Schema({ timestamps: true })
export class Like extends Document {
    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Post' })
    post: Post

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const LikeModel = SchemaFactory.createForClass(Like);