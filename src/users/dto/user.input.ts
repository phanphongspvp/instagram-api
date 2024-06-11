import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from "class-validator";
import { UserRole } from "../model/user.model";
import { Type } from "class-transformer";
import { AuthInput } from "src/auth/dto/auth.input";

export class UserInput {
    @IsEmail()
    email: string;

    @IsEnum(UserRole)
    roles: UserRole;

    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @ValidateNested()
    @Type(() => AuthInput)
    auth: AuthInput
}