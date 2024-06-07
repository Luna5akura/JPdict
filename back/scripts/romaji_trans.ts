/// <reference types="node" />

import * as fs from 'fs';
import * as path from 'path';

const folderPath = '../src/data';

const replacements: { [key: string]: string } = {
  'ī': 'ii',
  'ā': 'aa',
  'ū': 'uu',
  'ē': 'ee',
  'ō': 'oo'
};

fs.readdir(folderPath, (err: NodeJS.ErrnoException | null, files: string[]) => {
  if (err) {
    console.error('Error in loading', err);
    return;
  }

  // 过滤出匹配模式的文件
  const jsonFiles = files.filter(file => /^new_term_bank_.*\.json$/.test(file));

  // 处理每个文件
  jsonFiles.forEach(file => {
    const filePath = path.join(folderPath, file);

    // 读取文件内容
    fs.readFile(filePath, 'utf-8', (err: NodeJS.ErrnoException | null, data: string) => {
      if (err) {
        console.error(`Error in loading ${file}`, err);
        return;
      }

      // 替换特殊字符
      let updatedData = data;
      for (const [key, value] of Object.entries(replacements)) {
        const regex = new RegExp(key, 'g');
        updatedData = updatedData.replace(regex, value);
      }

      // 写回文件
      fs.writeFile(filePath, updatedData, 'utf-8', (err: NodeJS.ErrnoException | null) => {
        if (err) {
          console.error(`Error in writing ${file}`, err);
        } else {
          console.log(`File ${file} Updated`);
        }
      });
    });
  });
});
