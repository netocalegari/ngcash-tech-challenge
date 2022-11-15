import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingTables1668536201098 implements MigrationInterface {
    name = 'CreatingTables1668536201098'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transacions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" date NOT NULL DEFAULT now(), "value" numeric(12,2) NOT NULL, "debitedAccountId" uuid, "creditedAccountId" uuid, CONSTRAINT "PK_9041d241dfe0918079286e7ae6f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "accounts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "balance" integer NOT NULL, CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "password" character varying NOT NULL, "accountIdId" uuid, CONSTRAINT "REL_bca6b6f3bf5b14fc88d2bae762" UNIQUE ("accountIdId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "transacions" ADD CONSTRAINT "FK_ecc2ca03a1e18e1a3c0f60106ca" FOREIGN KEY ("debitedAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transacions" ADD CONSTRAINT "FK_f0b68e1fb33aeb290b724ce0bb9" FOREIGN KEY ("creditedAccountId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_bca6b6f3bf5b14fc88d2bae762d" FOREIGN KEY ("accountIdId") REFERENCES "accounts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_bca6b6f3bf5b14fc88d2bae762d"`);
        await queryRunner.query(`ALTER TABLE "transacions" DROP CONSTRAINT "FK_f0b68e1fb33aeb290b724ce0bb9"`);
        await queryRunner.query(`ALTER TABLE "transacions" DROP CONSTRAINT "FK_ecc2ca03a1e18e1a3c0f60106ca"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "accounts"`);
        await queryRunner.query(`DROP TABLE "transacions"`);
    }

}
