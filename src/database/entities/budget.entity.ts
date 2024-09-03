import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { ExpenseCategory, IncomeCategory } from "src/helpers/enum.helper";

@Entity()
export class Budget{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({name:'name'})
    name:string;
    
    @Column({name:'goal_amount',default:0})
    goalAmount:number;
   
    @Column({name:'current_amount',default:0})
    currentAmount:number;

    @Column({name:'completion_rate', default:0})
    completionRate:number;
    
    @Column({
        name: 'income_source',
        type: 'enum',
        enum: IncomeCategory,
        default: IncomeCategory.SALARY,
    })
    incomeSource: IncomeCategory;

    @Column({
        name: 'expense_category',
        type: 'enum',
        enum: ExpenseCategory,
        default: ExpenseCategory.BILLS,
    })
    expenseCategory: ExpenseCategory;

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