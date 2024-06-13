import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { PostInput } from "src/posts/dto/post.input";
import { UserInput } from "src/users/dto/user.input";

export class CommentDto {
    @IsNotEmpty()
    @IsString()
    comment: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PostInput)
    post: PostInput

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UserInput)
    user: UserInput
}