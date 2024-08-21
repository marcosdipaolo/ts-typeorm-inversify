"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserNotFoundError = void 0;
var inversify_express_utils_1 = require("inversify-express-utils");
var logger_1 = require("../../logger");
var UserNotFoundError = /** @class */ (function (_super) {
    __extends(UserNotFoundError, _super);
    function UserNotFoundError() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.message = "User not found.";
        return _this;
    }
    return UserNotFoundError;
}(Error));
exports.UserNotFoundError = UserNotFoundError;
var BaseController = /** @class */ (function (_super) {
    __extends(BaseController, _super);
    function BaseController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.logger = (0, logger_1.createLogger)(_this.constructor.name);
        return _this;
    }
    BaseController.prototype.handleError = function (error) {
        this.logger.error(error);
        var isError = error instanceof Error;
        var statusCode = 500;
        if (error instanceof UserNotFoundError) {
            statusCode = 404;
        }
        return this.json({
            error: isError ? error.message : String(error),
            stack: isError ? error.stack : null,
        }, statusCode);
    };
    return BaseController;
}(inversify_express_utils_1.BaseHttpController));
exports.default = BaseController;
