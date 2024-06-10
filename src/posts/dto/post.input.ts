import { IsNotEmpty, IsString } from "class-validator";

export class PostInput {
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    content: string

    @IsNotEmpty()
    @IsString()
    image: string

    @IsNotEmpty()
    @IsString()
    audio: string

    @IsNotEmpty()
    @IsString()
    like: number

    @IsNotEmpty()
    @IsString()
    comment: string
}