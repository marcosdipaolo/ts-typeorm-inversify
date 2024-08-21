"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var connection_1 = __importDefault(require("./connection"));
var inversify_express_utils_1 = require("inversify-express-utils");
var container_1 = require("./container");
connection_1.default
    .initialize()
    .then(function () {
    console.log("DB connected.");
})
    .catch(function (err) { return console.log(err); });
var app = new inversify_express_utils_1.InversifyExpressServer(container_1.container);
app.build().listen(3000);
