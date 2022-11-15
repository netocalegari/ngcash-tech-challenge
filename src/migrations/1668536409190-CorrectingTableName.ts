import { MigrationInterface, QueryRunner } from "typeorm";

export class CorrectingTableName1668536409190 implements MigrationInterface {
    name = 'CorrectingTableName1668536409190'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" date NOT NULL DEFAULT now(), "value" numeric(12,2) NOT NULL, "debitedAccountId" uuid, "creditedAccountId" uuid, CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_e48084dca44e4ce200cb6c295d8" FOREIGN KEY ("debitedAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_90970e74d61cc1e18df1564e3be" FOREIGN KEY ("creditedAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_90970e74d61cc1e18df1564e3be"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_e48084dca44e4ce200cb6c295d8"`);
        await queryRunner.query(`DROP TABLE "transactions"`);
    }

}
