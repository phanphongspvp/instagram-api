import { Type } from "class-transformer";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { PostInput } from "src/posts/dto/post.input";
import { UserInput } from "src/users/dto/user.input";

export class LikeInput {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UserInput)
    user: UserInput

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => PostInput)
    post: PostInput
}