"use strict";
// back/src/controllers/dictionaryController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWord = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const indexData = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../data/index.json'), 'utf8'));
const tagBank = JSON.parse(fs_1.default.readFileSync(path_1.default.join(__dirname, '../data/tag_bank_1.json'), 'utf8'));
const loadTermBanks = () => {
    const termBanks = [];
    for (let i = 1; i <= 34; i++) {
        const filePath = path_1.default.join(__dirname, `../data/new_term_bank_${i}.json`);
        const data = JSON.parse(fs_1.default.readFileSync(filePath, 'utf8'));
        termBanks.push(...data);
    }
    return termBanks;
};
const termBanks = loadTermBanks();
const wordList = termBanks.map((entry) => ({
    kanji: entry[0],
    kana: entry[1],
    tags: entry[2],
    frequency: entry[4],
    meanings: entry[5].map((meaning) => String(meaning)),
    sequence: entry[6],
    additional: entry[7],
    romaji: entry[8] // Load romaji from the preprocessed data
}));
const getWord = async (req, res) => {
    const { word } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;
    const foundWords = [];
    for (const entry of wordList) {
        let score = 0;
        if (entry.kanji.startsWith(word))
            score += 15;
        if (entry.kana.startsWith(word))
            score += 15;
        if (entry.romaji.startsWith(word))
            score += 15;
        if (entry.kanji === word)
            score += 10;
        if (entry.kana === word)
            score += 10;
        if (entry.romaji === word)
            score += 10;
        if (entry.kanji.includes(word))
            score += 5;
        if (entry.kana.includes(word))
            score += 5;
        if (entry.romaji.includes(word))
            score += 5;
        if (entry.meanings.some(meaning => meaning.toLowerCase() === word.toLowerCase()))
            score += 3;
        if (entry.meanings.some(meaning => meaning.toLowerCase().includes(word.toLowerCase())))
            score += 1;
        if (score > 0) {
            foundWords.push(Object.assign(Object.assign({}, entry), { score }));
        }
    }
    if (foundWords.length > 0) {
        foundWords.sort((a, b) => {
            if (b.score !== a.score) {
                return b.score - a.score;
            }
            else {
                return b.frequency - a.frequency;
            }
        });
        const totalPages = Math.ceil(foundWords.length / limit);
        const paginatedResults = foundWords.slice(skip, skip + limit);
        res.json({
            results: paginatedResults,
            currentPage: page,
            totalPages: totalPages
        });
    }
    else {
        res.status(404).json({ message: "Word not found" });
    }
};
exports.getWord = getWord;
