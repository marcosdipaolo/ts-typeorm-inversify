import { DataSource } from "typeorm";

const connection = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "33060"),
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "tstypeorm",
  database: process.env.DB_NAME || "tstypeorm",
  entities: ["src/entities/*.ts"],
  logging: true,
  migrations: ["src/db/migrations/*.ts"],
  migrationsTableName: "migrations_meta",
});

export default connection;
