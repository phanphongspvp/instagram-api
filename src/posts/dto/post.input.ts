import { Type } from "class-transformer";
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { UserInput } from "src/users/dto/user.input";

export class PostInput {
    @IsString()
    title: string

    @IsNotEmpty()
    @IsString()
    content: string

    @IsNotEmpty()
    @IsString()
    image: string[]

    @IsNotEmpty()
    @IsString()
    audio: string[]

    @IsNotEmpty()
    @IsString()
    like: number

    @IsNotEmpty()
    @IsString()
    comment: string[]

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => UserInput)
    user: UserInput
}