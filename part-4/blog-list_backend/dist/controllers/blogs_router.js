"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blog_model_1 = __importDefault(require("../models/blog_model"));
const blogsRouter = express_1.default.Router();
blogsRouter.get('/', (request, response) => {
    blog_model_1.default.find({}).then((blogs) => {
        response.json(blogs);
    });
});
blogsRouter.post('/', (request, response, next) => {
    const blog = new blog_model_1.default(request.body);
    blog.save()
        .then((result) => {
        response.status(201).json(result);
    })
        .catch((error) => next(error));
});
exports.default = blogsRouter;
