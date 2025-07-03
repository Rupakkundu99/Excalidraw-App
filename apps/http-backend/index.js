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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const userMiddleware_1 = require("./userMiddleware");
const common_1 = require("@repo/common");
const db_1 = require("@repo/db");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
//@ts-ignore
app.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const data = common_1.CreateUserSchema.safeParse(body);
    if (!data.success) {
        res.json({
            message: "Incorrect signup Credentials"
        });
    }
    if (!data.success || !data.data.email || !data.data.password || !data.data.name) {
        return res.status(400).json({
            message: "Missing required user fields"
        });
    }
    yield db_1.prismaClient.user.create({
        data: {
            email: data.data.email,
            password: data.data.password,
            name: data.data.name,
            photo: "" // Provide a default value or get it from the request
        }
    });
    res.json({
        message: "User signup Successfull"
    });
}));
//@ts-ignore
app.post('/signin', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = common_1.SigninSchema.safeParse(req.body);
    if (!data.success) {
        res.json({
            message: "Incorrect signin Credentials"
        });
    }
    const userId = 1;
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        return res.status(500).json({
            message: "JWT secret is not defined in environment variables."
        });
    }
    const token = jsonwebtoken_1.default.sign({ userId }, jwtSecret);
    res.status(200).json({
        token: token,
        message: "Sign in successful",
        jwtToken: token
    });
}));
app.post('/room', userMiddleware_1.Auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const parsedData = common_1.CreateRoomSchema.safeParse(req.body);
    if (!parsedData.success) {
        res.json({
            message: "Incorrect room details"
        });
    }
    const userId = req.userId;
    const room = yield db_1.prismaClient.room.create({
        data: {
            slug: ((_a = parsedData.data) === null || _a === void 0 ? void 0 : _a.name) || "",
            //@ts-ignore
            adminId: userId
        }
    });
    res.json({
        message: "Room created successfully",
        roomId: room.id
    });
}));
app.listen(3001);
