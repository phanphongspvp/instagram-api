import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";
import { Auth } from "src/auth/model/auth.model";

export enum UserRole {
    ADMIN = "admin",
    CUSTOMER = "customer"
}

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    roles: UserRole;

    @Prop({ required: true })
    phone: number

    @Prop({ required: true })
    address: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Auth' })
    auth: Auth

    @Prop()
    createdAt?: Date

    @Prop()
    updatedAt?: Date
}

export const UserModel = SchemaFactory.createForClass(User);