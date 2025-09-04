// A* Search (weighted, heuristic-guided, usually faster)
export function aStar(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const openSet = [startNode];
  const closedSet = new Set();

  // g: cost from start; f: total cost (g + h)
  startNode.g = 0;
  startNode.f = heuristic(startNode, finishNode);

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift();
    if (current.isWall) continue;

    current.isVisited = true;
    visitedNodesInOrder.push(current);
    if (current === finishNode) return visitedNodesInOrder;

    closedSet.add(current);

    for (const neighbor of getNeighbors(grid, current)) {
      if (closedSet.has(neighbor) || neighbor.isWall) continue;
      const tentativeG = (current.g ?? Infinity) + (neighbor.weight || 1);
      if (tentativeG < (neighbor.g ?? Infinity)) {
        neighbor.previousNode = current;
        neighbor.g = tentativeG;
        neighbor.f = tentativeG + heuristic(neighbor, finishNode);
        if (!openSet.includes(neighbor)) openSet.push(neighbor);
      }
    }
  }
  return visitedNodesInOrder;
}

function heuristic(a, b) {
  // Manhattan distance (4-direction movement)
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
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