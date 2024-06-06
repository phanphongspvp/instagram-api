import { IsArray, IsNotEmpty, IsString } from "class-validator";

export class Business {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    contactPerson: string;

    @IsString()
    address: string;

    @IsString()
    about: string;

    @IsArray()
    images: string[];

    @IsString()
    category: string;

    @IsString()
    email: string;

    @IsArray()
    bookings: string[];
}