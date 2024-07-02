import { IsArray, IsNotEmpty, IsString } from "class-validator";
import { ObjectId } from "mongoose";
export class CommentDto {
    @IsNotEmpty()
    @IsString()
    comment: string;

    @IsNotEmpty()
    @IsString()
    postId: ObjectId;

    @IsNotEmpty()
    @IsString()
    userId: ObjectId;

    @IsArray()
    likes: ObjectId[];
}