import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Post extends Document {
    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    content: string

    @Prop()
    image: string

    @Prop()
    audio: string

    @Prop()
    like: number

    @Prop()
    comment: string

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const PostModel = SchemaFactory.createForClass(Post);