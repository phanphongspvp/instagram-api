import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

@Schema({ timestamps: true })
export class Like extends Document {
    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId }], ref: "User" })
    userId: MongooseSchema.Types.ObjectId;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId }], ref: "Post" })
    postId: MongooseSchema.Types.ObjectId;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId }], ref: "Comment" })
    commentId: MongooseSchema.Types.ObjectId;

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const LikeModel = SchemaFactory.createForClass(Like);