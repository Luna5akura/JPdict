// back/scripts/preprocess.ts

import fs from 'fs';
import path from 'path';
import Kuroshiro from 'kuroshiro';
import KuromojiAnalyzer from 'kuroshiro-analyzer-kuromoji';

const preprocessTermBanks = async () => {
  const kuroshiro = new Kuroshiro();
  await kuroshiro.init(new KuromojiAnalyzer());

  for (let i = 1; i <= 34; i++) {
    const filePath = path.join(__dirname, `../src/data/term_bank_${i}.json`);
    const newFilePath = path.join(__dirname, `../src/data/new_term_bank_${i}.json`);
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    for (const entry of data) {
      entry.push(await kuroshiro.convert(entry[1], { to: 'romaji' }));  // Add romaji as the last element
    }

    fs.writeFileSync(newFilePath, JSON.stringify(data, null, 2), 'utf8');
  }

  console.log('Preprocessing completed');
};

preprocessTermBanks().catch(console.error);
