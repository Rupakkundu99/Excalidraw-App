"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = Auth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function Auth(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        res.json({
            message: "Token required for user Authentication"
        });
    }
    //@ts-ignore 
    const decodedToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (decodedToken) {
        //@ts-ignore
        req.userId = decodedToken.userId;
        next();
    }
    else {
        res.json({
            message: "Token Authentication issue"
        });
    }
}
