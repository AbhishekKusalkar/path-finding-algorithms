import React, { useEffect, useState } from 'react';
import Node from './Node/Node';
import Sidebar from './Sidebar';
import { dijkstra, getNodesInShortestPathOrder } from '../algorithms/dijkstra';
import { aStar } from '../algorithms/aStar';
import { bfs } from '../algorithms/bfs';
import { dfs } from '../algorithms/dfs';
import './Pathfindingvisualizer.css';

const DEFAULT_ROWS = 20;
const DEFAULT_COLS = 50;

const START_ROW = 10;
const START_COL = 10;
const FINISH_ROW = 10;
const FINISH_COL = 40;

const SPEEDS = {
  Slow: 20,
  Medium: 10,
  Fast: 2,
};

export default function Pathfindingvisualizer() {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [placing, setPlacing] = useState('wall'); // 'wall' | 'weight'
  const [algo, setAlgo] = useState('Dijkstra');
  const [speed, setSpeed] = useState('Medium');
  const [start, setStart] = useState([START_ROW, START_COL]);
  const [finish, setFinish] = useState([FINISH_ROW, FINISH_COL]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [sidebarAlgo, setSidebarAlgo] = useState(null);
  const [status, setStatus] = useState('Ready');

  useEffect(() => {
    resetGrid();
  }, []);

  function setStatusMessage(msg, autoClear=false) {
    setStatus(msg);
    if (autoClear) {
      setTimeout(()=> setStatus('Ready'), 2500);
    }
  }

  function resetGrid(clearWalls=false) {
    const rows = DEFAULT_ROWS, cols = DEFAULT_COLS;
    const [sr, sc] = start, [fr, fc] = finish;
    const newGrid = Array.from({ length: rows }, (_, r) =>
      Array.from({ length: cols }, (_, c) => createNode(r, c, sr, sc, fr, fc, clearWalls))
    );
    setGrid(newGrid);
    // clear animations
    setTimeout(() => {
      document.querySelectorAll('.node').forEach(n => {
        n.classList.remove('node-visited', 'node-shortest-path');
      });
    }, 0);
  }

  function createNode(row, col, sr, sc, fr, fc, clearWalls) {
    return {
      row,
      col,
      isStart: row === sr && col === sc,
      isFinish: row === fr && col === fc,
      distance: Infinity,
      isVisited: false,
      isWall: clearWalls ? false : false,
      isWeighted: false,
      previousNode: null,
      weight: 1,
    };
  }

  function toggleCell(row, col) {
    if (isAnimating) return;
    const newGrid = grid.slice();
    const node = { ...newGrid[row][col] };

    if (node.isStart || node.isFinish) return;
    if (placing === 'wall') {
      node.isWall = !node.isWall;
      node.isWeighted = false;
      node.weight = 1;
    } else {
      node.isWeighted = !node.isWeighted;
      node.isWall = false;
      node.weight = node.isWeighted ? 5 : 1;
    }
    newGrid[row][col] = node;
    setGrid(newGrid);
  }

  function handleMouseDown(row, col) {
    setMouseIsPressed(true);
    toggleCell(row, col);
  }

  function handleMouseEnter(row, col) {
    if (!mouseIsPressed) return;
    toggleCell(row, col);
  }

  function handleMouseUp() {
    setMouseIsPressed(false);
  }

  function animate(visitedNodesInOrder, nodesInShortestPathOrder) {
    setIsAnimating(true);
    setStatusMessage('Visualizing ' + algo + '...', false);
    const delay = SPEEDS[speed];
    visitedNodesInOrder.forEach((node, i) => {
      setTimeout(() => {
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element && !node.isStart && !node.isFinish) {
          element.classList.add('node-visited');
        }
      }, delay * i);
    });

    const total = delay * visitedNodesInOrder.length;
    nodesInShortestPathOrder.forEach((node, i) => {
      setTimeout(() => {
        const element = document.getElementById(`node-${node.row}-${node.col}`);
        if (element && !node.isStart && !node.isFinish) {
          element.classList.add('node-shortest-path');
        }
        if (i === nodesInShortestPathOrder.length - 1) {
          setIsAnimating(false);
          setStatusMessage(nodesInShortestPathOrder.length ? 'Path Found ✅' : 'No Path ❌', true);
        }
      }, total + 30 * i);
    });
  }

  function clearPathOnly() {
    // reset visited/prev, remove animation classes
    const newGrid = grid.map(row => row.map(n => ({
      ...n,
      distance: Infinity,
      isVisited: false,
      previousNode: null,
      g: undefined,
      f: undefined
    })));
    setGrid(newGrid);
    document.querySelectorAll('.node').forEach(n => {
      n.classList.remove('node-visited', 'node-shortest-path');
    });
  }

  function run() {
    if (isAnimating) return;
    clearPathOnly();
    const [sr, sc] = start, [fr, fc] = finish;
    const startNode = grid[sr][sc];
    const finishNode = grid[fr][fc];
    let visited = [];
    switch (algo) {
      case 'Dijkstra':
        visited = dijkstra(grid, startNode, finishNode);
        break;
      case 'A* (A-star)':
        visited = aStar(grid, startNode, finishNode);
        break;
      case 'BFS':
        visited = bfs(grid, startNode, finishNode);
        break;
      case 'DFS':
        visited = dfs(grid, startNode, finishNode);
        break;
      default:
        visited = dijkstra(grid, startNode, finishNode);
    }
    const path = getNodesInShortestPathOrder(finishNode);
    animate(visited, path);
  }

  function randomMaze() {
    if (isAnimating) return;
    const newGrid = grid.map(row =>
      row.map(n => {
        if (n.isStart || n.isFinish) return n;
        const val = Math.random();
        return {
          ...n,
          isWall: val < 0.22,
          isWeighted: val >= 0.22 && val < 0.3,
          weight: val >= 0.22 && val < 0.3 ? 5 : 1,
        };
      })
    );
    setGrid(newGrid);
  }

  return (
    <div className="wrapper">
      <header className="toolbar glass">
        <div className="brand">Pathfinding Visualizer</div>

        <div className="controls">
          <label className="select-label">
            Algorithm
            <div className="algo-row">
              <select className="algo-select" value={algo} onChange={e => setAlgo(e.target.value)} disabled={isAnimating}>
                <option>Dijkstra</option>
                <option>A* (A-star)</option>
                <option>BFS</option>
                <option>DFS</option>
              </select>
              <button className="info-btn" onClick={()=>setSidebarAlgo(algo)} title="Algorithm Info">i</button>
            </div>
          </label>

          <label>
            Speed
            <select value={speed} onChange={e => setSpeed(e.target.value)} disabled={isAnimating}>
              {Object.keys(SPEEDS).map(s => <option key={s}>{s}</option>)}
            </select>
          </label>

          <div className="toggle-group" role="group" aria-label="placing">
            <button className={placing==='wall'?'active':''} onClick={()=>setPlacing('wall')} disabled={isAnimating}>
              Walls
            </button>
            <button className={placing==='weight'?'active':''} onClick={()=>setPlacing('weight')} disabled={isAnimating}>
              Weights
            </button>
          </div>

          <button className="primary" onClick={run} disabled={isAnimating}>Visualize</button>
          <button onClick={clearPathOnly} disabled={isAnimating}>Clear Path</button>
          <button onClick={()=>resetGrid(true)} disabled={isAnimating}>Clear Board</button>
          <button onClick={randomMaze} disabled={isAnimating}>Random Maze</button>
        </div>
      </header>

      <main className="grid-container"
        onMouseLeave={()=>setMouseIsPressed(false)}
      >
        {grid.map((row, rIdx) => (
          <div key={rIdx} className="grid-row">
            {row.map((node, nIdx) => (
              <Node
                key={nIdx}
                row={node.row}
                col={node.col}
                isStart={node.isStart}
                isFinish={node.isFinish}
                isWall={node.isWall}
                isWeighted={node.isWeighted}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
              />
            ))}
          </div>
        ))}
      </main>

      <footer className="legend-status">
        <div className="legend">
          <span className="legend-item"><span className="box node-start"></span> Start</span>
          <span className="legend-item"><span className="box node-finish"></span> Finish</span>
          <span className="legend-item"><span className="box node-wall"></span> Wall</span>
          <span className="legend-item"><span className="box node-weighted"></span> Weighted</span>
        </div>
        <div className="status-bar" aria-live="polite">{status}</div>
      </footer>

      <Sidebar algoKey={sidebarAlgo} onClose={()=>setSidebarAlgo(null)} />
    </div>
  );
}