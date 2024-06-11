import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { User } from "src/users/model/user.model";

@Schema({ timestamps: true })
export class Post extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string;

    @Prop()
    image: string[];

    @Prop()
    audio: string[];

    @Prop()
    like: number;

    @Prop()
    comment: string[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    user: User

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const PostModel = SchemaFactory.createForClass(Post);