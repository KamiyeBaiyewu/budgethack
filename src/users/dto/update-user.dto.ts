import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty({
        type: String,
        description: 'First Name',
    })
    @IsString()
    @IsOptional()
    firstName: string;

    @ApiProperty({
        type: String,
        description: 'Last Name',
    })
    @IsString()
    @IsOptional()
    lastName: string;

    @ApiProperty({
        type: String,
        description: 'email',
    })
    @IsEmail()
    @IsString()
    @IsOptional()
    @Transform(({ value }) => {
        return value.toLocaleLowerCase();
    })
    email: string;
}
