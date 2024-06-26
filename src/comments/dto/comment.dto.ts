import { IsNotEmpty, IsString } from "class-validator";
export class CommentDto {
    @IsNotEmpty()
    @IsString()
    comment: string;

    @IsNotEmpty()
    @IsString()
    post: string;

    @IsNotEmpty()
    @IsString()
    user: string;
}