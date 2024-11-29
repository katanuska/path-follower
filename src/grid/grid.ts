import { Position } from './position';

export class Grid {
  constructor(private grid: string[][]) {}

  public get(position: Position): string | undefined {
    return this.grid[position.row]?.[position.col];
  }

  public findCaracter(character: string): Position[] {
    const characterPositions = [];
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < (this.grid[row]?.length || 0); col++) {
        if (this.get({ row, col }) === character) {
          characterPositions.push({ row, col });
        }
      }
    }
    return characterPositions;
  }

  public toString(): string {
    return this.grid.map((row) => row.join('')).join('\n');
  }
}
