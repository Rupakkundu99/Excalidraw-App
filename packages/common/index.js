"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRoomSchema = exports.SigninSchema = exports.CreateUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.CreateUserSchema = zod_1.default.object({
    email: zod_1.default.string().max(25).min(6),
    password: zod_1.default.string().max(25).min(6).regex(/[A-Z]/, "Password must have an uppercase letter")
        .regex(/[a-z]/, "It must have a small letter")
        .regex(/[^A-Za-z0-9]/, "Must have a special character"),
    name: zod_1.default.string()
});
exports.SigninSchema = zod_1.default.object({
    email: zod_1.default.string().max(25).min(6),
    password: zod_1.default.string().max(25).min(6).regex(/[A-Z]/, "Password must have an uppercase letter")
        .regex(/[a-z]/, "It must have a small letter")
        .regex(/[^A-Za-z0-9]/, "Must have a special character")
});
exports.CreateRoomSchema = zod_1.default.object({
    name: zod_1.default.string().max(25).min(6)
});
