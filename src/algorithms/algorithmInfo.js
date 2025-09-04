const algorithmInfo = {
  dijkstra: {
    name: "Dijkstra's Algorithm",
    description: "Guarantees shortest path by exploring all possible paths with cumulative distance.",
    steps: [
      "Start from the source node with distance 0.",
      "At each step, choose the unvisited node with the smallest known distance.",
      "Update distances to its unvisited neighbors.",
      "Repeat until all nodes are visited or the destination is found."
    ],
    bestFor: "Weighted grids, when you need the shortest guaranteed path."
  },
  astar: {
    name: "A* Search",
    description: "Efficiently finds shortest path using both distance so far and a heuristic estimate.",
    steps: [
      "Start from the source node with f = g + h (distance so far + heuristic).",
      "At each step, pick the node with the lowest f.",
      "Update distances and heuristic estimates of neighbors.",
      "Continue until the destination is reached."
    ],
    bestFor: "Weighted grids where performance is important, using admissible heuristic."
  },
  bfs: {
    name: "Breadth-First Search (BFS)",
    description: "Explores nodes level by level and guarantees shortest path in unweighted grids.",
    steps: [
      "Start from the source node.",
      "Visit all neighboring nodes.",
      "Continue expanding level by level.",
      "Stop when destination is found."
    ],
    bestFor: "Unweighted grids, shortest path without weights."
  },
  dfs: {
    name: "Depth-First Search (DFS)",
    description: "Explores as far as possible along each branch before backtracking.",
    steps: [
      "Start from the source node.",
      "Explore one branch as deep as possible.",
      "Backtrack when no new nodes to visit.",
      "Continue until destination is found or all nodes visited."
    ],
    bestFor: "Unweighted grids where any path is acceptable, not guaranteed shortest."
  }
};

export default algorithmInfo;
