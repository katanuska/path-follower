import { Position } from 'grid/position';
import { Grid } from './grid';
import { Direction, getPositionOnDirection } from './direction';

export class GridNode {
  constructor(
    private grid: Grid,
    private position: Position
  ) {
    if (this.grid.get(position) === undefined) throw `There is no node on position ${position.row}:${position.col} in grid.`;
  }

  public getPosition(): Position {
    return this.position;
  }

  public getCharacter(): string {
    return this.grid.get(this.position)!;
  }

  public getNodeNeighbor(direction: Direction): GridNode | null {
    const neigborPosition = getPositionOnDirection(this.position, direction);
    try {
      return new GridNode(this.grid, neigborPosition);
    } catch {
      return null;
    }
  }
}
