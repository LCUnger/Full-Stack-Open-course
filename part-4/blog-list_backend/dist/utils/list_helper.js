"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
exports.default = { dummy, totalLikes, favoriteBlog };
