import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { LikeInput } from "src/like/dto/like.input";
import { UserInput } from "src/users/dto/user.input";

export class PostInput {
    @IsNotEmpty()
    @IsString()
    content: string

    @IsString()
    image: string[]

    @IsString()
    audio: string[]

    @IsArray()
    @ValidateNested()
    @Type(() => LikeInput)
    like: LikeInput

    @IsString()
    comment: string[]

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UserInput)
    user: UserInput
}