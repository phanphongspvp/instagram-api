import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Category extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    icon: string;

    @Prop()
    createdAt?: Date;

    @Prop()
    updatedAt?: Date;
}

export const CategoryModel = SchemaFactory.createForClass(Category);