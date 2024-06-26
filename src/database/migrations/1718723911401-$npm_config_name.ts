import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1718723911401 implements MigrationInterface {
    name = ' $npmConfigName1718723911401'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL, "createAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "options" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "isCorrect" boolean NOT NULL, "questionId" integer, CONSTRAINT "PK_d232045bdb5c14d932fba18d957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "questions" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "quizId" integer, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id")); COMMENT ON COLUMN "questions"."quizId" IS 'The quiz unique identifier'`);
        await queryRunner.query(`CREATE TABLE "quizes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" text NOT NULL, "isActive" boolean NOT NULL DEFAULT '1', CONSTRAINT "PK_2c6a29e4f537875fdef1f2e5881" PRIMARY KEY ("id")); COMMENT ON COLUMN "quizes"."id" IS 'The quiz unique identifier'`);
        await queryRunner.query(`CREATE TABLE "quizes_users_users" ("quizesId" integer NOT NULL, "usersId" integer NOT NULL, CONSTRAINT "PK_3c5f7be1035b6e27f33735c80fc" PRIMARY KEY ("quizesId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e7a4f0114122fa46b78554fbbe" ON "quizes_users_users" ("quizesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9ab08636eea65e7cc1481da053" ON "quizes_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "options" ADD CONSTRAINT "FK_46b668c49a6c4154d4643d875a5" FOREIGN KEY ("questionId") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "questions" ADD CONSTRAINT "FK_35d54f06d12ea78d4842aed6b6d" FOREIGN KEY ("quizId") REFERENCES "quizes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quizes_users_users" ADD CONSTRAINT "FK_e7a4f0114122fa46b78554fbbec" FOREIGN KEY ("quizesId") REFERENCES "quizes"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "quizes_users_users" ADD CONSTRAINT "FK_9ab08636eea65e7cc1481da053f" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "quizes_users_users" DROP CONSTRAINT "FK_9ab08636eea65e7cc1481da053f"`);
        await queryRunner.query(`ALTER TABLE "quizes_users_users" DROP CONSTRAINT "FK_e7a4f0114122fa46b78554fbbec"`);
        await queryRunner.query(`ALTER TABLE "questions" DROP CONSTRAINT "FK_35d54f06d12ea78d4842aed6b6d"`);
        await queryRunner.query(`ALTER TABLE "options" DROP CONSTRAINT "FK_46b668c49a6c4154d4643d875a5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9ab08636eea65e7cc1481da053"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e7a4f0114122fa46b78554fbbe"`);
        await queryRunner.query(`DROP TABLE "quizes_users_users"`);
        await queryRunner.query(`DROP TABLE "quizes"`);
        await queryRunner.query(`DROP TABLE "questions"`);
        await queryRunner.query(`DROP TABLE "options"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
