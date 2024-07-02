import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

export enum UserRole {
    ADMIN = "admin",
    CUSTOMER = "customer"
}

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: 'customer' })
    roles: UserRole;

    @Prop()
    email: string;

    @Prop({ required: true })
    name: string;

    @Prop({ default: process.env.AVATAR_DEFAULT_URI })
    avatar: string;

    @Prop()
    address: string;

    @Prop()
    phone: number

    @Prop({ default: true })
    logged: boolean;

    @Prop()
    createdAt?: Date

    @Prop()
    updatedAt?: Date
}

export const UserModel = SchemaFactory.createForClass(User);