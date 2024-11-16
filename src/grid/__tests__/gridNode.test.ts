import { createGrid } from '../gridCreator';
import { Direction } from '../direction';
import { GridNode } from '../gridNode';

describe('Grid Node', () => {
  it('should throw error if creating node out of grid boundaries', () => {
    const grid = createGrid('---');
    expect(() => new GridNode(grid, { row: 0, col: 10 })).toThrow('There is no node on position 0:10 in grid.');
  });

  it('should get node character', () => {
    const grid = createGrid('ABC');
    const node = new GridNode(grid, { row: 0, col: 2 });
    expect(node.getCharacter()).toBe('C');
  });

  it('should get node neighbour', () => {
    const grid = createGrid('ABC');
    const node = new GridNode(grid, { row: 0, col: 2 });
    expect(node.getNodeNeighbor(Direction.LEFT)).toMatchObject({ position: { row: 0, col: 1 } });
    expect(node.getNodeNeighbor(Direction.DOWN)).toEqual(null);
  });
});
