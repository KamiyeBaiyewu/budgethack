import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBudgetDto } from './create-budget.dto';
import { IsString, IsInt, IsEnum, IsOptional, IsDateString } from 'class-validator';
import { ExpenseCategory, IncomeCategory } from 'src/helpers/enum.helper';

export class UpdateBudgetDto extends PartialType(CreateBudgetDto) {
    @ApiProperty({
        type: String,
        description: 'name',
    })
    @IsOptional()
    @IsString()
    name?: string;

    @ApiProperty({
        type: Number,
        description: 'goalAmount',
    })
    @IsOptional()
    @IsInt()
    goalAmount?: number;

    @ApiProperty({
        type: Number,
        description: 'currentAmount',
    })
    @IsOptional()
    @IsInt()
    currentAmount?: number;

    @ApiProperty({
        type: 'enum',
        enum: IncomeCategory,
        description: 'incomeSource',

    })  
    @IsOptional()
    @IsEnum(IncomeCategory)
    incomeSource?: IncomeCategory;

    @ApiProperty({
        type: 'enum',
        enum: ExpenseCategory,
        description: 'expenseCategory',
    })
    @IsOptional()
    @IsEnum(ExpenseCategory)
    expenseCategory?: ExpenseCategory;

    @ApiProperty({
        type: String,
        description: 'goalCompletionDate',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    goalCompletionDate?: string;
}
