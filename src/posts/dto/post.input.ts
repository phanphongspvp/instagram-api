import { IsNotEmpty, IsString } from "class-validator";

export class PostInput {
    @IsNotEmpty()
    @IsString()
    content: string;

    @IsString()
    imageUrls: string[];

    @IsString()
    audio: string;

    @IsString()
    likes: string[];

    @IsString()
    comments: string[];

    @IsNotEmpty()
    @IsString()
    user: null | string;
}