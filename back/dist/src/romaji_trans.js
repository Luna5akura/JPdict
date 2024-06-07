"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// 定义文件夹路径
const folderPath = './data';
// 定义需要替换的字符映射
const replacements = {
    'ī': 'ii',
    'ā': 'aa',
    'ū': 'uu',
    'ē': 'ee',
    'ō': 'oo'
};
// 读取文件夹中的文件列表
fs.readdir(folderPath, (err, files) => {
    if (err) {
        console.error('无法读取文件夹', err);
        return;
    }
    // 过滤出匹配模式的文件
    const jsonFiles = files.filter(file => /^new_term_bank_.*\.json$/.test(file));
    // 处理每个文件
    jsonFiles.forEach(file => {
        const filePath = path.join(folderPath, file);
        // 读取文件内容
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                console.error(`无法读取文件 ${file}`, err);
                return;
            }
            // 替换特殊字符
            let updatedData = data;
            for (const [key, value] of Object.entries(replacements)) {
                const regex = new RegExp(key, 'g');
                updatedData = updatedData.replace(regex, value);
            }
            // 写回文件
            fs.writeFile(filePath, updatedData, 'utf-8', (err) => {
                if (err) {
                    console.error(`无法写入文件 ${file}`, err);
                }
                else {
                    console.log(`文件 ${file} 已更新`);
                }
            });
        });
    });
});
