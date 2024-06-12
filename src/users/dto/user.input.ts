import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { UserRole } from "../model/user.model";
export class UserInput {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEnum(UserRole)
    roles: UserRole;

    @IsEmail()
    email: string;

    @IsString()
    name: string

    @IsString()
    avatar: string

    @IsString()
    address: string;

    @IsNumber()
    phone: number;

    @IsBoolean()
    logged: boolean;
}