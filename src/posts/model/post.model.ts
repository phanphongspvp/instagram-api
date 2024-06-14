import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, now } from "mongoose";
import { User } from "src/users/model/user.model";

@Schema({ timestamps: true })
export class Post extends Document {
    @Prop({ required: true })
    content: string;

    @Prop()
    imageUrls: string[];

    @Prop()
    audio: string[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: "User" }], default: [] })
    likes: MongooseSchema.Types.ObjectId[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const PostModel = SchemaFactory.createForClass(Post);