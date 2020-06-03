import { IsString, IsOptional } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class TaskUpdateDto {
    @IsOptional()
    @ApiProperty()
    @IsString()
    title: string;

    @IsOptional()
    @ApiProperty()
    @IsString()
    description: string;
}