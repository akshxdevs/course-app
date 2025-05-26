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
exports.userAuthenticate = userAuthenticate;
exports.adminAuthenticate = adminAuthenticate;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function userAuthenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers["authorization"];
            if (!token)
                return res.status(403).json({ message: "No Token Provided!" });
            const payload = jsonwebtoken_1.default.verify(token, config_1.USER_JWT);
            req.id = payload.id;
            console.log(payload);
            next();
        }
        catch (error) {
            console.log(error);
            res.status(411).json({ message: "Something Went Wrong!" });
        }
    });
}
function adminAuthenticate(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.headers["authorization"];
            if (!token)
                return res.status(403).json({ message: "No Token Provided!" });
            console.log(token);
            const payload = jsonwebtoken_1.default.verify(token, config_1.ADMIN_JWT);
            req.id = payload.id;
            console.log(payload);
            next();
        }
        catch (error) {
            console.log(error);
            res.status(411).json({ message: "Something Went Wrong!" });
        }
    });
}
