import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connection from "./connection";
import { InversifyExpressServer } from "inversify-express-utils";
import { container } from "./container";

connection
  .initialize()
  .then(() => {
    console.log("DB connected.");
  })
  .catch((err) => console.log(err));

const app = new InversifyExpressServer(container);

app.setConfig((app) => {
  app.use(express.json());
});

app.build().listen(3000);
