import { IsNotEmpty, IsString } from "class-validator";

export class CategoryInput {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    icon: string
}