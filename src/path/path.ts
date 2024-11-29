import { GridNode } from '../grid/gridNode';
import { Direction } from '../grid/direction';

export class Path {
  private nodes: GridNode[] = [];

  constructor(startNode: GridNode) {
    this.nodes.push(startNode);
  }

  public addNode(node: GridNode): void {
    this.nodes.push(node);
  }

  public getCurrentNode(): GridNode {
    return this.nodes[this.nodes.length - 1] as GridNode;
  }

  public getNodes(): GridNode[] {
    return this.nodes;
  }

  public getLatestDirection(): Direction | null {
    const currentPosition = this.getCurrentNode().getPosition();
    const previousNode = this.nodes[this.nodes.length - 2];

    if (!previousNode) return null;

    const previousPostion = previousNode.getPosition();

    if (currentPosition.row == previousPostion.row) {
      if (currentPosition.col === previousPostion.col + 1) return Direction.RIGHT;
      if (currentPosition.col === previousPostion.col - 1) return Direction.LEFT;
    } else {
      if (currentPosition.row === previousPostion.row + 1) return Direction.DOWN;
      if (currentPosition.row === previousPostion.row - 1) return Direction.UP;
    }
    throw new Error('The last two nodes on the path are not neighbors');
  }
}
