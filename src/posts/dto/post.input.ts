import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { UserInput } from "src/users/dto/user.input";

export class PostInput {
    @IsNotEmpty()
    @IsString()
    content: string

    @IsString()
    imageUrls: string[]

    @IsString()
    audio: string[]

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UserInput)
    user: UserInput
}