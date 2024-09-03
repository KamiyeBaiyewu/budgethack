import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { ExpenseCategory, IncomeCategory } from "src/helpers/enum.helper";

@Entity()
export class Budget{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({name:'name'})
    name:string;
    
    @Column({name:'goal_amount'})
    goalAmount:number;

    @Column({name:'completion_rate'})
    completionRate:number;
    
    @Column({name:'income_source'})
    incomeSource:IncomeCategory.SALARY;

    @Column({name:'expense_category'})
    expenseCategory:ExpenseCategory.BILLS;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({name:'goal_completion_date'})
    goalCompletionDate:Date;

    @ManyToOne(() => User, {
        eager: true,
    })
    @JoinColumn({ name: 'user_id' })
    user: User;
    
    @CreateDateColumn({
        type: 'timestamp',
        name: 'created_at',
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: 'timestamp',
        name: 'updated_at',
    })
    updatedAt: Date;
}