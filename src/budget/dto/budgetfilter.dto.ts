import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { ExpenseCategory, IncomeCategory } from "src/helpers/enum.helper";
import { BaseQueryDto } from "src/helpers/filter.dto";

export class BudgetFilterDto extends BaseQueryDto {

    @ApiProperty({
        type: 'number',
        description: 'Id',
        required: false,
    })
    @IsOptional()
    id?: Number;

    @ApiProperty({
        type: 'number',
        description: 'userId',
        required: false,
    })
    @IsOptional()
    userId?: Number;

    @ApiProperty({
        type: 'string',
        description: 'name',
        required: false,
    })
    @IsOptional()
    name?: string;

    @ApiProperty({
        type: 'enum',
        enum:IncomeCategory,
        description: 'incomeSource',
        required: false,
    })
    @IsOptional()
    incomeSource?: IncomeCategory;

    @ApiProperty({
        type: 'enum',
        enum:ExpenseCategory,
        description: 'expenseCategory',
        required: false,
    })
    @IsOptional()
    expenseCategory?: ExpenseCategory;
  
    @ApiProperty({
        type: 'string',
        description: 'goalCompletionDate',
        required: false,
    })
    @IsOptional()
    goalCompletionDate?: Date;

    @ApiProperty({
        type: 'string',
        description: 'created_at',
        required: false,
    })
    @IsOptional()
    createdAt?: Date;

}