import { createGrid } from '../../grid/gridCreator';
import { Direction } from '../../grid/direction';
import { GridNode } from '../../grid/gridNode';
import { Path } from '../path';

describe('Path', () => {
  it('should get', () => {});

  it('should get latest direction for start node', () => {
    const grid = createGrid('@-A-x');
    const path = new Path(new GridNode(grid, { row: 0, col: 0 }));

    expect(path.getLatestDirection()).toBe(null);
  });

  it('should throw error if nodes in the path are not neighbors', () => {
    const grid = createGrid('@-+ x\n  |  \nx-+ ');
    const path = new Path(new GridNode(grid, { row: 0, col: 0 }));
    path.addNode(new GridNode(grid, { row: 2, col: 0 }));

    expect(() => path.getLatestDirection()).toThrow('The last two nodes on the path are not neighbors');
  });

  it('should get latest direction', () => {
    const grid = createGrid('@-A-x');
    const path = new Path(new GridNode(grid, { row: 0, col: 0 }));
    path.addNode(new GridNode(grid, { row: 0, col: 1 }));
    path.addNode(new GridNode(grid, { row: 0, col: 2 }));

    expect(path.getLatestDirection()).toBe(Direction.RIGHT);
  });
});
