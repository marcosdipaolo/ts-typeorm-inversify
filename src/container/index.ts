import { Container, interfaces } from "inversify";
import "../http/controllers/UserController";
import { Logger } from "winston";
import { TYPES } from "./constants";
import { createLogger } from "../logger";
import { DataSource } from "typeorm";
import connection from "../connection";

const container = new Container();

container
  .bind<interfaces.Factory<Logger>>(TYPES.FactoryLogger)
  .toFactory<Logger, ["global"]>(() => {
    return (loggerID: string) => {
      return createLogger(loggerID);
    };
  });

container.bind<DataSource>(TYPES.DataSource).toConstantValue(connection);

export { container };
