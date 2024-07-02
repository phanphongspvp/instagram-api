import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema, now } from "mongoose";

@Schema({ timestamps: true })
export class Post extends Document {
    @Prop({ required: true })
    content: string;

    @Prop()
    imageUrls: string[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: "Audio" }], default: [] })
    audio: MongooseSchema.Types.ObjectId;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: "Like" }], default: [] })
    likes: MongooseSchema.Types.ObjectId[];

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: "Comment" }], default: [] })
    comments: MongooseSchema.Types.ObjectId[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    user: MongooseSchema.Types.ObjectId

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const PostModel = SchemaFactory.createForClass(Post);