import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/entities/*.ts"],
  logging: true,
  migrations: ["src/db/migrations/*.ts"],
  migrationsTableName: "migrations_meta",
};

const connection = new DataSource(dataSourceOptions);

export default connection;
