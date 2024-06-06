import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Auth extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    createdAt?: Date

    @Prop()
    updatedAt?: Date
}

export const AuthModel = SchemaFactory.createForClass(Auth);