import React from 'react';
import './Node.css';

export default function Node({
  row,
  col,
  isStart,
  isFinish,
  isWall,
  isWeighted,
  onMouseDown,
  onMouseEnter,
  onMouseUp,
}) {
  const extraClassName = isFinish
    ? 'node-finish'
    : isStart
    ? 'node-start'
    : isWall
    ? 'node-wall'
    : isWeighted
    ? 'node-weighted'
    : '';

  return (
    <div
      id={`node-${row}-${col}`}
      className={`node ${extraClassName}`}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={() => onMouseUp()}
      role="button"
      aria-label={`grid node r${row} c${col}`}
      tabIndex={0}
    ></div>
  );
}