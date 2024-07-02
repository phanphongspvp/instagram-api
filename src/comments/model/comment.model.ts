import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema({ timestamps: true })
export class Comment extends Document {
    @Prop({ required: true })
    comment: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Post', required: true })
    postId: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
    userId: MongooseSchema.Types.ObjectId;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId }], ref: "Like" })
    likes: MongooseSchema.Types.ObjectId[];

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const CommentModel = SchemaFactory.createForClass(Comment);