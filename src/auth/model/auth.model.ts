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

    @Prop({ default: "https://i0.wp.com/sbcf.fr/wp-content/uploads/2018/03/sbcf-default-avatar.png?w=300&ssl=1" })
    avatar: string;

    @Prop()
    logged: boolean;

    @Prop()
    createdAt?: Date

    @Prop()
    updatedAt?: Date
}

export const AuthModel = SchemaFactory.createForClass(Auth);