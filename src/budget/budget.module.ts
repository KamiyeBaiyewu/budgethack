import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Budget } from 'src/database/entities/budget.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Budget, 
      User,
        ])
    ],
  controllers: [BudgetController],
  providers: [BudgetService],
})
export class BudgetModule {}
