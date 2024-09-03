import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { BaseQueryDto } from "src/helpers/filter.dto";

export class UserFilterDto extends BaseQueryDto {
    @ApiProperty({
        type: 'string',
        description: 'userId',
        required: false,
    })
    @IsOptional()
    userId?: Number;

    @ApiProperty({
        type: 'string',
        description: 'firstName',
        required: false,
    })
    @IsOptional()
    firstName?: string;

    @ApiProperty({
        type: 'string',
        description: 'lastName',
        required: false,
    })
    @IsOptional()
    lastName?: string;
  
    @ApiProperty({
        type: 'string',
        description: 'email',
        required: false,
    })
    @IsOptional()
    email?: string;

    @ApiProperty({
        type: 'string',
        description: 'createdAt',
        required: false,
    })
    @IsOptional()
    createdAt?: Date;

}