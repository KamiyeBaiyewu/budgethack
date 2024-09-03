import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCompleteionRate1725366173805 implements MigrationInterface {
    name = 'UpdateCompleteionRate1725366173805'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`budget\` CHANGE \`completion_rate\` \`completion_rate\` int NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`budget\` CHANGE \`completion_rate\` \`completion_rate\` int NOT NULL`);
    }

}
