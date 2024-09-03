import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './database/entities/user.entity';
import { dataSourceOptions } from './data-source';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { BudgetModule } from './budget/budget.module';

@Module({
  imports: [
     ConfigModule.forRoot({
    isGlobal: true,
}),
TypeOrmModule.forFeature([
    User,
]),
TypeOrmModule.forRoot(dataSourceOptions),
UsersModule,
BudgetModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
