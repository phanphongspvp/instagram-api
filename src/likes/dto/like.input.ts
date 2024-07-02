import { IsNotEmpty, IsString } from "class-validator";

export class LikeInput {
    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    postId: string;

    @IsNotEmpty()
    @IsString()
    commentId: string;
}