// Breadth-First Search (unweighted shortest path on unweighted graphs)
export function bfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const queue = [startNode];
  startNode.isVisited = true;

  while (queue.length > 0) {
    const node = queue.shift();
    visitedNodesInOrder.push(node);
    if (node === finishNode) return visitedNodesInOrder;

    for (const neighbor of getNeighbors(grid, node)) {
      if (neighbor.isVisited || neighbor.isWall) continue;
      neighbor.isVisited = true;
      neighbor.previousNode = node;
      queue.push(neighbor);
    }
  }
  return visitedNodesInOrder;
}

function getNeighbors(grid, node) {
  const neighbors = [];
  const {row, col} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors;
}