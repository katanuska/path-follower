import { Grid } from '../../grid/grid';
import { createGrid } from '../../grid/gridCreator';
import { followPath } from '../pathFollower';

describe('Path Follower', () => {
  it('should find path for simple path', () => {
    const grid = new Grid(['@-x'.split('')]);
    const path = followPath(grid);

    expect(path.getCurrentNode()).toEqual({ grid: grid, position: { row: 0, col: 2 } });
  });

  it('should find path for map1', () => {
    const grid = createGrid(`
      @---A---+
              |
      x-B-+   C
          |   |
          +---+`);
    const path = followPath(grid);

    expect(path.getCurrentNode()).toEqual({ grid: grid, position: { row: 2, col: 0 } });
  });
});
