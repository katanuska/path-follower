import { followPath } from './path/pathFollower';
import { createGrid } from './grid/gridCreator';
import { Path } from './path/path';
import { Position } from 'grid/position';

const LETTERS_REGEX = /[A-Z]/;

function collectLetters(path: Path): string[] {
  const visitedPositions: Position[] = [];
  const collectedLetters: string[] = [];

  path.getNodes().forEach((node) => {
    const isLetter = LETTERS_REGEX.test(node.getCharacter());
    const isCollected = visitedPositions.some(
      (visitedPosition) => node.getPosition().row === visitedPosition.row && node.getPosition().col === visitedPosition.col
    );

    if (isLetter && !isCollected) {
      collectedLetters.push(node.getCharacter());
    }

    visitedPositions.push(node.getPosition());
  });

  return collectedLetters;
}

export function fllowPathAndCollectLetters(pathMap: string): {
  pathCharacters: string[];
  collectedLetters: string[];
} {
  const grid = createGrid(pathMap);
  const path = followPath(grid);
  const characters = path.getNodes().map((node) => node.getCharacter());
  const collectedLetters = collectLetters(path);

  return { pathCharacters: characters, collectedLetters: collectedLetters };
}
