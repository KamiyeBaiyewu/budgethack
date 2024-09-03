import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsEmail, IsString } from "class-validator";

export class CreateUserDto {
      @ApiProperty({
        type: String,
        description: 'First Name',
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        type: String,
        description: 'Last Name',
    })
    @IsString()
    lasttName: string;

    @ApiProperty({
        type: String,
        description: 'email',
    })
    @IsEmail()
    @IsString()
    @Transform(({ value }) => {
        return value.toLocaleLowerCase();
    })
    email: string;
}
