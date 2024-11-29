import { fllowPathAndCollectLetters } from './runner';
const fs = require('fs');

const FILE_NAME = './map.txt';

try {
  const data = fs.readFileSync(FILE_NAME, 'utf8');
  const pathMap = data as string;

  const pathAndLetters = fllowPathAndCollectLetters(pathMap);

  console.log('Collected letters: ' + pathAndLetters.collectedLetters.join(''));
  console.log('Path characters: ' + pathAndLetters.pathCharacters.join(''));
} catch (err) {
  console.error('Error reading the file:', err);
}

// const pathMap = `
//   @---A---+
//           |
//   x-B-+   C
//       |   |
//       +---+`;
