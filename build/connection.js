"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var connection = new typeorm_1.DataSource({
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
exports.default = connection;
