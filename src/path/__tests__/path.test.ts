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

  it('should get latest direction', () => {
    const grid = createGrid('@-A-x');
    const path = new Path(new GridNode(grid, { row: 0, col: 0 }));
    path.addNode(new GridNode(grid, { row: 0, col: 1 }));
    path.addNode(new GridNode(grid, { row: 0, col: 2 }));

    expect(path.getLatestDirection()).toBe(Direction.RIGHT);
  });
});
