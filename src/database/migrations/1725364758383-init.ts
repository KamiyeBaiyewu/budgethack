import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1725364758383 implements MigrationInterface {
    name = 'Init1725364758383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`budget\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`goal_amount\` int NOT NULL DEFAULT '0', \`completion_rate\` int NOT NULL, \`income_source\` enum ('salary', 'investment', 'business', 'miscellaneous') NOT NULL DEFAULT 'salary', \`expense_category\` enum ('rent', 'food', 'entertainment', 'bills', 'subscriptions', 'clothing', 'transportation', 'miscellaneous') NOT NULL DEFAULT 'bills', \`user_id\` int NOT NULL, \`goal_completion_date\` datetime NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`budget\` ADD CONSTRAINT \`FK_68df09bd8001a1fb0667a9b42f7\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`budget\` DROP FOREIGN KEY \`FK_68df09bd8001a1fb0667a9b42f7\``);
        await queryRunner.query(`DROP TABLE \`budget\``);
    }

}
