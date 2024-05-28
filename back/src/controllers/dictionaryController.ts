// back/src/controllers/dictionaryController.ts

import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const indexData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/index.json'), 'utf8'));
const tagBank = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/tag_bank_1.json'), 'utf8'));

const loadTermBanks = () => {
  const termBanks = [];
  for (let i = 1; i <= 34; i++) {
    const filePath = path.join(__dirname, `../data/new_term_bank_${i}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    termBanks.push(...data);
  }
  return termBanks;
};

const termBanks = loadTermBanks();

interface WordEntry {
  kanji: string;
  kana: string;
  tags: string;
  frequency: number;
  meanings: string[];
  sequence: number;
  additional: string;
  romaji: string;
}

const wordList: WordEntry[] = termBanks.map((entry: any[]) => ({
  kanji: entry[0],
  kana: entry[1],
  tags: entry[2],
  frequency: entry[4],
  meanings: entry[5].map((meaning: any) => String(meaning)),
  sequence: entry[6],
  additional: entry[7],
  romaji: entry[8]  // Load romaji from the preprocessed data
}));

const getWord = async (req: Request, res: Response) => {
  const { word } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const foundWords = [];

  for (const entry of wordList) {
    let score = 0;
    if (entry.kanji.startsWith(word)) score += 15;
    if (entry.kana.startsWith(word)) score += 15;
    if (entry.romaji.startsWith(word)) score += 15;
    if (entry.kanji === word) score += 10;
    if (entry.kana === word) score += 10;
    if (entry.romaji === word) score += 10;
    if (entry.kanji.includes(word)) score += 5;
    if (entry.kana.includes(word)) score += 5;
    if (entry.romaji.includes(word)) score += 5;
    if (entry.meanings.some(meaning => meaning.toLowerCase() === word.toLowerCase())) score += 3;
    if (entry.meanings.some(meaning => meaning.toLowerCase().includes(word.toLowerCase()))) score += 1;

    if (score > 0) {
      foundWords.push({...entry, score});
    }
  }

  if (foundWords.length > 0) {
    foundWords.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      } else {
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
  } else {
    res.status(404).json({ message: "Word not found" });
  }
};

export { getWord };
