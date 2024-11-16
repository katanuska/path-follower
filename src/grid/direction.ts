import { Position } from 'grid/position';

export enum Direction {
  UP = 'UP',
  RIGHT = 'RIGHT',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
}

export function getDirectionAfterIntersection(direction: Direction): Direction[] {
  switch (direction) {
    case Direction.UP:
    case Direction.DOWN:
      return [Direction.LEFT, Direction.RIGHT];
    case Direction.RIGHT:
    case Direction.LEFT:
      return [Direction.UP, Direction.DOWN];
    default:
      return [];
  }
}

export function getPositionOnDirection(position: Position, direction: Direction): Position {
  switch (direction) {
    case Direction.UP:
      return { row: position.row - 1, col: position.col };
    case Direction.RIGHT:
      return { row: position.row, col: position.col + 1 };
    case Direction.DOWN:
      return { row: position.row + 1, col: position.col };
    case Direction.LEFT:
      return { row: position.row, col: position.col - 1 };
    default:
      throw new Error('Invalid direction');
  }
}
