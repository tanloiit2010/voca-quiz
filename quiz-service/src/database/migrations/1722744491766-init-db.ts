import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDb1722744491766 implements MigrationInterface {
  name = 'InitDb1722744491766';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user_answers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`is_correct\` tinyint NULL, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`questionId\` int NULL, \`questionOptionId\` int NULL, \`quizSessionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`question_options\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`is_correct\` tinyint NOT NULL, \`display_order\` int NOT NULL, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`questionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`questions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`content\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`score\` int NOT NULL, \`display_order\` int NOT NULL, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`quizId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`quizzes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`quiz_sessions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`started_at\` datetime NOT NULL, \`status\` varchar(255) NOT NULL, \`score\` int NOT NULL, \`created_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_date\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`quizId\` int NULL, UNIQUE INDEX \`IDX_f91cf8b58e5df5f63c031609a8\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_answers\` ADD CONSTRAINT \`FK_47a3ffddaba37b9707f93e4b140\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_answers\` ADD CONSTRAINT \`FK_26298768908886540c14ace03cf\` FOREIGN KEY (\`questionOptionId\`) REFERENCES \`question_options\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_answers\` ADD CONSTRAINT \`FK_c2b63c78d93564f1682421f1958\` FOREIGN KEY (\`quizSessionId\`) REFERENCES \`quiz_sessions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`question_options\` ADD CONSTRAINT \`FK_c654af7759a681f1b1addbe35bf\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`questions\` ADD CONSTRAINT \`FK_35d54f06d12ea78d4842aed6b6d\` FOREIGN KEY (\`quizId\`) REFERENCES \`quizzes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`quiz_sessions\` ADD CONSTRAINT \`FK_a7e6751fe58d7feabcf0fce588d\` FOREIGN KEY (\`quizId\`) REFERENCES \`quizzes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`quiz_sessions\` DROP FOREIGN KEY \`FK_a7e6751fe58d7feabcf0fce588d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`questions\` DROP FOREIGN KEY \`FK_35d54f06d12ea78d4842aed6b6d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`question_options\` DROP FOREIGN KEY \`FK_c654af7759a681f1b1addbe35bf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_answers\` DROP FOREIGN KEY \`FK_c2b63c78d93564f1682421f1958\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_answers\` DROP FOREIGN KEY \`FK_26298768908886540c14ace03cf\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`user_answers\` DROP FOREIGN KEY \`FK_47a3ffddaba37b9707f93e4b140\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f91cf8b58e5df5f63c031609a8\` ON \`quiz_sessions\``,
    );
    await queryRunner.query(`DROP TABLE \`quiz_sessions\``);
    await queryRunner.query(`DROP TABLE \`quizzes\``);
    await queryRunner.query(`DROP TABLE \`questions\``);
    await queryRunner.query(`DROP TABLE \`question_options\``);
    await queryRunner.query(`DROP TABLE \`user_answers\``);
  }
}
