import { fllowPathAndCollectLetters } from './runner';

const pathMap = `
  @---A---+
          |
  x-B-+   C
      |   |
      +---+`;

const pathAndLetters = fllowPathAndCollectLetters(pathMap);

console.log('Collected letters: ' + pathAndLetters.collectedLetters.join(''));
console.log('Path characters: ' + pathAndLetters.pathCharacters.join(''));
