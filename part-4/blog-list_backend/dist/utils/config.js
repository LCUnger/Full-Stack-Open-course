"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("./logger"));
dotenv_1.default.config();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
    logger_1.default.error('MONGODB_URI is not defined in the configuration');
    process.exit(1);
}
exports.default = { PORT, MONGODB_URI };
