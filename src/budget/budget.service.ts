import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Between, ILike, Repository } from 'typeorm';
import { Budget } from 'src/database/entities/budget.entity';
import { BudgetFilterDto } from './dto/budgetfilter.dto';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }



  async create(createBudgetDto: CreateBudgetDto) {
    const { userId, name } = createBudgetDto
    const user = await this.userRepository.findOne({
      where: {
        id: userId
      }
    })
    if (!user) {
      throw new InternalServerErrorException("User does not exist")
    }
    const checkBudget = await this.budgetRepository.findOne({
      where: {
        userId: userId,
        name: name,
      }
    })
    if (checkBudget) {
      throw new InternalServerErrorException("A budget with this exact name exists")
    }
    const budget = await this.budgetRepository.create(createBudgetDto)
    await this.budgetRepository.save(budget)
    return budget
  }




  async findAll(budgetFilterDto: BudgetFilterDto, res: any) {
    let { id, userId, name, incomeSource, expenseCategory, goalCompletionDate, limit, page, startDate,
      endDate } = budgetFilterDto
    let { searchBy } = budgetFilterDto;
    limit = limit ? limit : 10;
    page = page && page > 0 ? page : 1;
    const skip = (page - 1) * limit;
    const baseCondition: any = {};
    if (id) {
      baseCondition.id = id;
    }
    if (userId) {
      baseCondition.userId = userId;
    }
    if (name) {
      baseCondition.name = name;
    }
    if (incomeSource) {
      baseCondition.incomeSource = incomeSource;
    }
    if (expenseCategory) {
      baseCondition.expenseCategory = expenseCategory;
    }
    if (goalCompletionDate) {
      baseCondition.goalCompletionDate = goalCompletionDate;
    }
    if (goalCompletionDate) {
      baseCondition.expenseCategory = expenseCategory;
    }
    if (startDate && endDate) {
      const adjustedstartDate = new Date(startDate);
      const adjustedEndDate = new Date(endDate);
      adjustedEndDate.setHours(23, 59, 59, 999);
      baseCondition.createdAt = Between(
        adjustedstartDate.toISOString(),
        adjustedEndDate.toISOString(),
      );
    }

    const budgetSearchConditions: any[] = [];
    if (searchBy) {
      const searchTerms = searchBy
        .split(' ')
        .filter((term) => term.trim());

      if (searchTerms.length === 1) {
        // Single term search
        const searchTerm = searchTerms[0];
        budgetSearchConditions.push(
          {
            name: ILike(`%${searchTerm}%`),
            id: ILike(`%${searchTerm}%`)
          },
        );
      }
    }



    const whereConditions =
      budgetSearchConditions.length > 0
        ? [
          ...budgetSearchConditions.map((condition) => ({
            ...baseCondition,
            ...condition,
          })),
        ]
        : baseCondition;

    const [result, totalCount] = await this.budgetRepository.findAndCount({
      where: whereConditions,
    })
    const hasNextPage = skip + limit < totalCount;
    const hasPreviousPage = skip > 0;
    return res.json({
      result,
      total: totalCount,
      currentPage: page,
      hasNextPage,
      hasPreviousPage,
    });

  }

  async findOne(id: number) {
    const budget = await this.budgetRepository.findOne({
      where: {
        id: id
      }
    })

    if (!budget) {
      throw new InternalServerErrorException(`a budget with this ID:${id} does not exist`)
    }

    return budget

  }



  async findByUserId(userId: number) {
    const budget = await this.budgetRepository.find({
      where: {
        userId: userId
      }
    })

    if (!budget) {
      throw new InternalServerErrorException(`a budget with this UserId:${userId} does not exist`)
    }

    return budget

  }



  async update(id: number, updateBudgetDto: UpdateBudgetDto) {
    const { name, currentAmount, goalAmount, incomeSource, expenseCategory } = updateBudgetDto

    let budget = await this.budgetRepository.findOne({
      where: {
        id: id
      }
    })
    if (!budget) {
      throw new InternalServerErrorException("Budget does not exist")
    }
    const updateBudget = {
      name: name,
      goalAmount: goalAmount,
      incomeSource: incomeSource,
      expenseCategory: expenseCategory
    }

    if(goalAmount){
      const completionRate = (budget.currentAmount / budget.goalAmount) * 100;
      budget.completionRate = completionRate;
      await this.budgetRepository.save(budget)
    }

    if (currentAmount && currentAmount > 0) {

      budget.currentAmount = (budget.currentAmount || 0) + currentAmount;
      await this.budgetRepository.save(budget)


      if (budget.goalAmount > 0) {
        const completionRate = (budget.currentAmount / budget.goalAmount) * 100;
        budget.completionRate = completionRate;
        await this.budgetRepository.save(budget)

      }
    }
   
    budget = Object.assign(budget, updateBudget)
    await this.budgetRepository.save(budget)

 

    return budget;
  }



  async remove(id: number) {
    const budget = await this.budgetRepository.findOne({
      where: {
        id: id
      }
    })
    if (!budget) {
      throw new InternalServerErrorException("User does not exist")
    }
    await this.budgetRepository.delete(budget.id)
    return 'Budget Deleted Successfully';
  }
}
