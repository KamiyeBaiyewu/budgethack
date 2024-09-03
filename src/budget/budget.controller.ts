import { Controller, Get, Post, Body, Patch, Param, Delete, InternalServerErrorException, Res, Query } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { ResponseHelper } from 'src/helpers/response.helper';
import { BudgetFilterDto } from './dto/budgetfilter.dto';
import { ExpenseCategory, IncomeCategory } from 'src/helpers/enum.helper';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post('create')
  async create(@Body() createBudgetDto: CreateBudgetDto) {
    try {
      const{incomeSource,expenseCategory}= createBudgetDto
      if (!Object.values(IncomeCategory).includes(incomeSource)) {
        throw new InternalServerErrorException('Invalid income category provided.');
      }
  
      if (!Object.values(ExpenseCategory).includes(expenseCategory)) {
        throw new InternalServerErrorException('Invalid expense category provided.');
      }
  

      const budget= await this.budgetService.create(createBudgetDto);
      return ResponseHelper.successResponse('Budget Created',budget)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }

  }

  @Get('findall')
  async findAll( @Query() budgetFilterDto: BudgetFilterDto, @Res() res: Response,) {
    try {
      const budget = await this.budgetService.findAll(budgetFilterDto, res);
      return ResponseHelper.successResponse('Budgets returned succesfully', budget)
    } catch (error) {
      throw new InternalServerErrorException(error)

    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const data= await this.budgetService.findOne(+id);
      return ResponseHelper.successResponse("Budget returned succesfully:",data)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }



  @Get('userid/:id')
  async findByUserId(@Param('id') id: string) {
    try {
      const data = await this.budgetService.findByUserId(+id);
      return ResponseHelper.successResponse("Budget returned succesfully:", data)
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBudgetDto: UpdateBudgetDto) {
    const { incomeSource, expenseCategory } = updateBudgetDto;

    if (incomeSource) {
      if (!Object.values(IncomeCategory).includes(incomeSource)) {
        throw new InternalServerErrorException('Invalid income category provided.');
      }
    }

    if (expenseCategory) {
      if (!Object.values(ExpenseCategory).includes(expenseCategory)) {
        throw new InternalServerErrorException('Invalid expense category provided.');
      }
    }

    try {
      const data = await this.budgetService.update(+id, updateBudgetDto);
      return ResponseHelper.successResponse("Budget Updated Successfully", data)
    } catch (error) {
      throw new InternalServerErrorException(error)

    }

  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetService.remove(+id);
  }
}
