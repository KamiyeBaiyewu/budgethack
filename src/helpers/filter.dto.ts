import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsDateString} from "class-validator";
import { maxDate, minDate } from '../helpers/date.helper';

export class BaseQueryDto {
    @ApiProperty({
        type: Number,
        description: 'Number of items per page',
        required: false,
    })
    @IsOptional()
    limit?: number;

    @ApiProperty({
        type: Number,
        description: 'Page',
        required: false,
    })
    @IsOptional()
    page?: number;

    @ApiProperty({
        type: String,
        description: 'Search query',
        required: false,
    })
    @IsOptional()
    searchBy?: string;

    @ApiProperty({
        type: String,
        description: 'Start date',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    startDate?: string = minDate();

    @ApiProperty({
        type: String,
        description: 'End date',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    endDate?: string = maxDate();

    @ApiProperty({
        type: String,
        description: 'Entity type',
        required: false,
    })
    @IsOptional()
    entityType?: string;
    @ApiProperty({
        type: String,
        description: 'Search type',
        required: false,
    })
    @IsOptional()
    type?: string;
}
