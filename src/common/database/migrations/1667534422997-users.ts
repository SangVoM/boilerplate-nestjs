import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class users1667534422996 implements MigrationInterface {
  private tableName = 'users';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'firstName',
            type: 'varchar',
            length: '30',
            collation: 'C',
          },
          {
            name: 'lastName',
            type: 'varchar',
            length: '30',
            collation: 'C',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '50',
            collation: 'C',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'phone',
            length: '20',
            type: 'varchar',
          },
          {
            name: 'delete',
            type: 'boolean',
            default: false,
          },
          {
            name: 'refreshToken',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
      true,
    );
    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: 'IDX_EMAIL',
        columnNames: ['email'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('email', 'IDX_EMAIL');
    await queryRunner.dropTable(this.tableName, true);
  }
}
