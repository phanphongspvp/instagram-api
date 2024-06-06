import { IsNotEmpty, IsString } from "class-validator";

export class AuthInput {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    password: string;
}