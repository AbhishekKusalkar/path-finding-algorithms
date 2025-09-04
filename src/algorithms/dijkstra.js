// Dijkstra's Algorithm (weighted, guarantees shortest path)
export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisited = getAllNodes(grid);
  while (unvisited.length) {
    sortByDistance(unvisited);
    const closest = unvisited.shift();
    if (closest.isWall) continue;
    if (closest.distance === Infinity) return visitedNodesInOrder;
    closest.isVisited = true;
    visitedNodesInOrder.push(closest);
    if (closest === finishNode) return visitedNodesInOrder;
    updateUnvisitedNeighbors(closest, grid);
  }
  return visitedNodesInOrder;
}

function sortByDistance(nodes) {
  nodes.sort((a, b) => a.distance - b.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const neighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + (neighbor.weight || 1);
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {row, col} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(n => !n.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

export function getNodesInShortestPathOrder(finishNode) {
  const nodesInPath = [];
  let current = finishNode;
  while (current) {
    nodesInPath.unshift(current);
    current = current.previousNode || null;
  }
  return nodesInPath;
}