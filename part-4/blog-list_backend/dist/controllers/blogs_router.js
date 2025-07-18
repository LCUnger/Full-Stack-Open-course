"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_model_1 = __importDefault(require("../models/blog_model"));
const blogsRouter = express_1.default.Router();
blogsRouter.get('/', (request, response) => __awaiter(void 0, void 0, void 0, function* () {
    const blogs = yield blog_model_1.default.find({});
    response.json(blogs);
}));
blogsRouter.post('/', (request, response, next) => {
    const blog = new blog_model_1.default(request.body);
    blog.save()
        .then((result) => {
        response.status(201).json(result);
    })
        .catch((error) => next(error));
});
exports.default = blogsRouter;
