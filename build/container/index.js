"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
var inversify_1 = require("inversify");
require("../http/controllers/UserController");
var constants_1 = require("./constants");
var logger_1 = require("../logger");
var connection_1 = __importDefault(require("../connection"));
var container = new inversify_1.Container();
exports.container = container;
container
    .bind(constants_1.TYPES.FactoryLogger)
    .toFactory(function () {
    return function (loggerID) {
        return (0, logger_1.createLogger)(loggerID);
    };
});
container.bind(constants_1.TYPES.DataSource).toConstantValue(connection_1.default);
