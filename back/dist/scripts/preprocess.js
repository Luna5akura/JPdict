"use strict";
// back/scripts/preprocess.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const kuroshiro_1 = __importDefault(require("kuroshiro"));
const kuroshiro_analyzer_kuromoji_1 = __importDefault(require("kuroshiro-analyzer-kuromoji"));
const preprocessTermBanks = async () => {
    const kuroshiro = new kuroshiro_1.default();
    await kuroshiro.init(new kuroshiro_analyzer_kuromoji_1.default());
    for (let i = 1; i <= 34; i++) {
        const filePath = path_1.default.join(__dirname, `../src/data/term_bank_${i}.json`);
        const newFilePath = path_1.default.join(__dirname, `../src/data/new_term_bank_${i}.json`);
        const data = JSON.parse(fs_1.default.readFileSync(filePath, 'utf8'));
        for (const entry of data) {
            entry.push(await kuroshiro.convert(entry[1], { to: 'romaji' })); // Add romaji as the last element
        }
        fs_1.default.writeFileSync(newFilePath, JSON.stringify(data, null, 2), 'utf8');
    }
    console.log('Preprocessing completed');
};
preprocessTermBanks().catch(console.error);
