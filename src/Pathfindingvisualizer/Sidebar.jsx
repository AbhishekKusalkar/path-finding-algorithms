import React from 'react';
import './Sidebar.css';

export default function Sidebar({algoKey, onClose}) {
  if (!algoKey) return null;
  const info = {
    "Dijkstra": {
      title: "Dijkstra's Algorithm",
      desc: "Weighted shortest-path algorithm. Guarantees the shortest path in graphs with non-negative weights.",
      steps: [
        "Initialize distances (start=0, others=∞).",
        "Pick the unvisited node with smallest distance.",
        "Update neighbor distances through that node.",
        "Repeat until target is reached or all nodes visited."
      ],
      use: "Best for graphs where edge weights vary and you need the exact shortest path."
    },
    "A* (A-star)": {
      title: "A* (A-star)",
      desc: "Heuristic-guided search using g (cost so far) + h (estimated cost to goal). Fast and optimal with admissible heuristics.",
      steps: [
        "Start with the start node in open set (g=0, f=g+h).",
        "Pick node with lowest f, expand neighbors.",
        "Update neighbor g and f if a better path is found.",
        "Stop when the goal is expanded."
      ],
      use: "Great for weighted grids when you have a good heuristic (like Manhattan distance)."
    },
    "BFS": {
      title: "Breadth-First Search (BFS)",
      desc: "Unweighted shortest-path search. Explores equally distant nodes level-by-level.",
      steps: [
        "Enqueue the start node.",
        "Dequeue a node, visit neighbors and enqueue them.",
        "Repeat until the goal is found."
      ],
      use: "Use for unweighted grids to guarantee shortest path by steps."
    },
    "DFS": {
      title: "Depth-First Search (DFS)",
      desc: "Explores as deep as possible before backtracking. Not guaranteed to find shortest path.",
      steps: [
        "Use a stack to follow neighbors as deep as possible.",
        "Backtrack when stuck and continue with next neighbor.",
        "Stops when goal is found or all nodes exhausted."
      ],
      use: "Good for exploration tasks, mazes; not for shortest paths."
    }
  };

  const d = info[algoKey] || {};
  return (
    <aside className="pf-sidebar">
      <div className="sidebar-header">
        <h3>{d.title}</h3>
        <button aria-label="Close sidebar" className="close-btn" onClick={onClose}>✕</button>
      </div>
      <p className="sidebar-desc">{d.desc}</p>

      <div className="sidebar-section">
        <h4>How it works</h4>
        <ol>
          {d.steps && d.steps.map((s,i)=>(<li key={i}>{s}</li>))}
        </ol>
      </div>

      <div className="sidebar-section">
        <h4>Best use</h4>
        <p>{d.use}</p>
      </div>

      <div className="sidebar-illustration" aria-hidden>
        {/* Simple mini-grid illustration */}
        <div className="mini-grid">
          {Array.from({length:5}).map((_,r)=>(
            <div key={r} className="mini-row">
              {Array.from({length:7}).map((__,c)=>(
                <div key={c} className={`mini-cell ${r===2 && c===1 ? 'start':''} ${r===2 && c===5 ? 'finish':''} ${(r===2 && c>1 && c<5) ? 'path':''}`}></div>
              ))}
            </div>
          ))}
        </div>
        <p className="mini-caption">Example expansion visualization</p>
      </div>
    </aside>
  );
}