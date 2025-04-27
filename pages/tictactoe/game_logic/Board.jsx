import React from 'react';
import Square from './Square';

const Board = ({ squares, onClick }) => {
  const renderSquare = (i) => (
    <Square value={squares[i]} onClick={() => onClick(i)} />
  );

  return (
    <div className="grid grid-cols-3 gap-2">
      {Array(9)
        .fill(null)
        .map((_, i) => (
          <div key={i}>{renderSquare(i)}</div>
        ))}
    </div>
  );
};

export default Board;