import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, isEnum, IsEnum, IsInt, IsDateString, IsOptional } from "class-validator";
import { Transform } from "class-transformer";
import { ExpenseCategory, IncomeCategory } from "src/helpers/enum.helper";

export class CreateBudgetDto {
    @ApiProperty({
        type: String,
        description: 'name',
    })
    @IsString()
    name: string;

    @ApiProperty({
        type: Number,
        enum: ExpenseCategory,
    })
    @IsInt()
    userId: number;

    @ApiProperty({
        type: Number,
        description: 'goalAmount',
    })
    @IsInt()
    goalAmount: number;

    @ApiProperty({
        type: 'enum',
        enum: IncomeCategory,
        description: 'incomeSource',

    })
    @IsEnum(IncomeCategory)
    incomeSource: IncomeCategory;

    @ApiProperty({
        type: 'enum',
        enum: ExpenseCategory,
        description: 'expenseCategory',
    })
    @IsEnum(ExpenseCategory)
    expenseCategory: ExpenseCategory;

    @ApiProperty({
        type: String,
        description: 'goalCompletionDate',
        required: false,
    })
    @IsOptional()
    @IsDateString()
    goalCompletionDate?: string;

}
