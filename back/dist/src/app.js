"use strict";
// back/src/app.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.TS_NODE_CACHE = "true";
const express_1 = __importDefault(require("express"));
const dictionary_1 = __importDefault(require("./routes/dictionary"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/dictionary', dictionary_1.default);
exports.default = app;
