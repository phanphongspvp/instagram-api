import { IsNotEmpty, IsObject, IsString } from "class-validator";

export interface AudioType {
    name: string;
    url: string;
}

export class AudioInput {
    @IsNotEmpty()
    @IsObject()
    audio: AudioType;

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    postId: string;
}