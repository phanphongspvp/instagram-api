import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class Slider extends Document {
    @Prop({ required: true })
    name: string;

    @Prop()
    image: string;

    @Prop()
    createdAt?: Date

    @Prop()
    updatedAt?: Date
}

export const SliderModel = SchemaFactory.createForClass(Slider);