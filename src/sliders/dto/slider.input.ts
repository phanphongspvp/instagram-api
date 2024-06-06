import { IsNotEmpty, IsString } from "class-validator";

export class SliderInput {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsString()
    image: string;
}