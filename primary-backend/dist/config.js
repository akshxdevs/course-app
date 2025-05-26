"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_JWT = exports.ADMIN_JWT = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 3000;
exports.ADMIN_JWT = process.env.ADMIN_JWT || "aefaldfjkadsk";
exports.USER_JWT = process.env.USER_JWT || "aefaldfjkadsk";
