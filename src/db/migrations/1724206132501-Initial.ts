import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1724206132501 implements MigrationInterface {
  name = "Initial1724206132501";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`orders\` (\`id\` varchar(36) NOT NULL, \`totalPrice\` float NOT NULL, \`userId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`products\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`price\` float NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`orderProduct\` (\`ordersId\` varchar(36) NOT NULL, \`productsId\` varchar(36) NOT NULL, INDEX \`IDX_f59d2321fa89a534bcd6629729\` (\`ordersId\`), INDEX \`IDX_1849f50aa2369002d09f4e03ca\` (\`productsId\`), PRIMARY KEY (\`ordersId\`, \`productsId\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_151b79a83ba240b0cb31b2302d1\` FOREIGN KEY (\`userId\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orderProduct\` ADD CONSTRAINT \`FK_f59d2321fa89a534bcd6629729b\` FOREIGN KEY (\`ordersId\`) REFERENCES \`orders\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orderProduct\` ADD CONSTRAINT \`FK_1849f50aa2369002d09f4e03ca6\` FOREIGN KEY (\`productsId\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orderProduct\` DROP FOREIGN KEY \`FK_1849f50aa2369002d09f4e03ca6\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orderProduct\` DROP FOREIGN KEY \`FK_f59d2321fa89a534bcd6629729b\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_151b79a83ba240b0cb31b2302d1\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_1849f50aa2369002d09f4e03ca\` ON \`orderProduct\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_f59d2321fa89a534bcd6629729\` ON \`orderProduct\``,
    );
    await queryRunner.query(`DROP TABLE \`orderProduct\``);
    await queryRunner.query(`DROP TABLE \`products\``);
    await queryRunner.query(`DROP TABLE \`orders\``);
    await queryRunner.query(`DROP TABLE \`users\``);
  }
}
