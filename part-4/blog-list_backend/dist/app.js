"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./utils/config"));
const logger_1 = __importDefault(require("./utils/logger"));
const blogs_router_1 = __importDefault(require("./controllers/blogs_router"));
const app = (0, express_1.default)();
mongoose_1.default
    .connect(config_1.default.MONGODB_URI)
    .then(() => {
    logger_1.default.info('connected to mongoDB');
})
    .catch((error) => {
    logger_1.default.error('error connecting to MongoDB:', error.message);
});
app.use(express_1.default.json());
app.use('/api/blogs', blogs_router_1.default);
exports.default = app;
