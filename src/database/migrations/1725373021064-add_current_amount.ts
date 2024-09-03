import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCurrentAmount1725373021064 implements MigrationInterface {
    name = 'AddCurrentAmount1725373021064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`budget\` ADD \`current_amount\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`budget\` DROP COLUMN \`current_amount\``);
    }

}
