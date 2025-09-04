// Depth-First Search (does not guarantee shortest path; good for exploration)
export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const stack = [startNode];
  const seen = new Set();

  while (stack.length) {
    const node = stack.pop();
    if (seen.has(node) || node.isWall) continue;
    seen.add(node);
    node.isVisited = true;
    visitedNodesInOrder.push(node);
    if (node === finishNode) return visitedNodesInOrder;

    const neighbors = getNeighbors(grid, node);
    for (let i = neighbors.length - 1; i >= 0; i--) {
      const n = neighbors[i];
      if (!seen.has(n) && !n.isWall) {
        n.previousNode = n.previousNode ?? node;
        stack.push(n);
      }
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