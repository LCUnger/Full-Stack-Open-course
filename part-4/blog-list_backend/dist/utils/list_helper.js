"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dummy = (blogs) => {
    return 1;
};
const totalLikes = (blogs) => {
    return blogs.reduce((sum, val) => sum + val.likes, 0);
};
exports.default = { dummy, totalLikes };
