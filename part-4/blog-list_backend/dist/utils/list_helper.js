"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = __importDefault(require("lodash"));
const dummy = (blogs) => {
    return 1;
};
const totalLikes = (blogs) => {
    return blogs.reduce((sum, val) => sum + val.likes, 0);
};
const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        throw new Error("No blogs available");
    }
    return blogs.reduce((favorite, blog) => blog.likes > favorite.likes ? blog : favorite);
};
const mostBlogs = (blogs) => {
    const blogsPerAuthor = lodash_1.default.countBy(blogs, 'author');
    console.log(Object.entries(blogsPerAuthor));
    const authorWithMostBlogs = lodash_1.default.maxBy(Object.entries(blogsPerAuthor), ([author, count]) => count);
    console.log(authorWithMostBlogs);
    if (!authorWithMostBlogs) {
        return { author: '', blogs: 0 };
    }
    return { author: authorWithMostBlogs[0], blogs: authorWithMostBlogs[1] };
    return { author: '', blogs: 0 };
};
exports.default = { dummy, totalLikes, favoriteBlog, mostBlogs };
