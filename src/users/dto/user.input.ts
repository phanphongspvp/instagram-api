import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserRole } from "../model/user.model";

export class UserInput {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsEnum(UserRole)
    roles: UserRole;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    @IsString()
    address: string;
}