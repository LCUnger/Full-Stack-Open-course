"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const list_helper_1 = __importDefault(require("../src/utils/list_helper"));
(0, node_test_1.test)('dummy returns one', () => {
    const blogs = [];
    const result = list_helper_1.default.dummy(blogs);
    node_assert_1.default.strictEqual(result, 1);
});
