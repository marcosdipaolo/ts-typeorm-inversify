import { BaseHttpController } from "inversify-express-utils";
import { Logger } from "winston";
import { createLogger } from "../../logger";
import { JsonResult } from "inversify-express-utils/lib/results";
import { Repository } from "typeorm";

export class UserNotFoundError extends Error {
  message = "User not found.";
}

abstract class BaseController<T> extends BaseHttpController {
  protected logger: Logger = createLogger(this.constructor.name);
  protected repository: Repository<T>;

  protected handleError(error: Error | unknown): JsonResult {
    this.logger.error(error);
    const isError = error instanceof Error;
    let statusCode = 500;
    if (error instanceof UserNotFoundError) {
      statusCode = 404;
    }
    return this.json(
      {
        error: isError ? error.message : String(error),
        stack: isError ? error.stack : null,
      },
      statusCode,
    );
  }
}

export default BaseController;
