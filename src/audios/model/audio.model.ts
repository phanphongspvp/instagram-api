import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { AudioType } from "../dto/audio.input";

@Schema({ timestamps: true })
export class Audio extends Document {
    @Prop({ type: Object, required: true })
    audio: AudioType;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId }], ref: "User" })
    userId: MongooseSchema.Types.ObjectId;

    @Prop({ type: [{ type: MongooseSchema.Types.ObjectId }], ref: "Post" })
    postId: MongooseSchema.Types.ObjectId;

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const AudioModel = SchemaFactory.createForClass(Audio);