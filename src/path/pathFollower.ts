import { Grid } from '../grid/grid';
import { Path } from './path';
import { Direction, getDirectionAfterIntersection } from '../grid/direction';
import { GridNode } from '../grid/gridNode';
import { Position } from 'grid/position';

const START_CHARACTER = '@';
const END_CHARACTER = 'x';
const INTERSECTION_CHARACTER = '+';
const LETTERS_REGEX = /[A-Z]/;
const SUPPORTED_GRID_CHARACTERS_REGEX = /^[A-Z@x+\-| \n]+$/;
const SUPPORTED_PATH_CHARACTERS_REGEX = /[A-Z@x+\-|]/;

function isSupportedCharacter(character: string | undefined) {
  return character && character != ' ' && SUPPORTED_PATH_CHARACTERS_REGEX.test(character);
}

function validateGridCharacters(grid: Grid) {
  if (!SUPPORTED_GRID_CHARACTERS_REGEX.test(grid.toString())) throw 'There are unsuported characters on the map.';
}

function findStart(grid: Grid): GridNode {
  const startPositions: Position[] = grid.findCaracter(START_CHARACTER);

  if (!startPositions?.length) throw 'The start of this path was not found.';
  if (startPositions.length > 1) throw 'This path has more than one start.';

  return new GridNode(grid, startPositions[0]);
}

function findPossibleDirections(currentCharacter: string, previousDirection: Direction | null) {
  if (currentCharacter === START_CHARACTER) {
    return Object.values(Direction);
  }

  if (!previousDirection) throw 'I forgot which direction I was going.';

  if (currentCharacter === INTERSECTION_CHARACTER) {
    return getDirectionAfterIntersection(previousDirection);
  }

  if (LETTERS_REGEX.test(currentCharacter)) {
    return [previousDirection, ...getDirectionAfterIntersection(previousDirection)];
  }

  return [previousDirection];
}

function findNextNode(path: Path): GridNode {
  const currentNode = path.getCurrentNode();
  const latestDirection = path.getLatestDirection();
  let possibleDirections = findPossibleDirections(currentNode.getCharacter(), latestDirection);
  const possibleNewNodes = possibleDirections
    .map((direction) => currentNode.getNodeNeighbor(direction))
    .filter((node) => node && isSupportedCharacter(node.getCharacter()));

  if (!possibleNewNodes.length) {
    throw 'The path you followed leads nowhere.';
  }
  if (possibleNewNodes.length > 1 && !LETTERS_REGEX.test(currentNode.getCharacter())) {
    throw "There is a fork on my path. I don't know which way to go.";
  }

  return possibleNewNodes[0]!;
}

export function followPath(grid: Grid): Path {
  validateGridCharacters(grid);

  const startNode = findStart(grid);
  const path: Path = new Path(startNode);

  while (path.getCurrentNode().getCharacter() !== END_CHARACTER) {
    const nextNode: GridNode = findNextNode(path);
    path.addNode(nextNode);
  }

  return path;
}
