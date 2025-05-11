import React, { useState, useEffect } from 'react';
import Board from './Board';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Game = ({ setScoreObject }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [moveCount, setMoveCount] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    setMoveCount(moveCount + 1);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setMoveCount(0);
    setGameFinished(false);
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    const isDraw = squares.every(square => square !== null);
    
    if (winner || isDraw) {
      setGameFinished(true);
      
      if (setScoreObject) {
        // Calculate score:
        // - Win as X: 100 points
        // - Win as O: 80 points
        // - Draw: 50 points
        // - Less moves = higher score (bonus)
        let score = 0;
        
        if (winner === 'X') {
          score = 100;
        } else if (winner === 'O') {
          score = 80;
        } else if (isDraw) {
          score = 50;
        }
        
        // Add bonus for quick games
        const moveBonus = Math.max(0, 20 - (moveCount * 2));
        score += moveBonus;
        
        setScoreObject({ score });
      }
    }
  }, [squares, moveCount, setScoreObject]);

  const winner = calculateWinner(squares);
  const isDraw = squares.every(square => square !== null);
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? 'Draw!'
    : `Next: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-4 text-lg font-medium">{status}</div>
      <Board squares={squares} onClick={handleClick} />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetGame}
      >
        Reset Game
      </button>
      {gameFinished && (
        <div className="mt-4 text-sm text-gray-700">
          {winner ? `You won as ${winner}!` : 'Draw!'}
          <br />
          {setScoreObject && "Score has been recorded"}
        </div>
      )}
    </div>
  );
};

export default Game;


// import React, { useState } from 'react';
// import Board from './Board';

// function calculateWinner(squares) {
//   const lines = [
//     [0,1,2],[3,4,5],[6,7,8],
//     [0,3,6],[1,4,7],[2,5,8],
//     [0,4,8],[2,4,6]
//   ];
//   for (let [a, b, c] of lines) {
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }

// const Game = () => {
//   const [squares, setSquares] = useState(Array(9).fill(null));
//   const [xIsNext, setXIsNext] = useState(true);

//   const handleClick = (i) => {
//     if (squares[i] || calculateWinner(squares)) return;
//     const newSquares = squares.slice();
//     newSquares[i] = xIsNext ? 'X' : 'O';
//     setSquares(newSquares);
//     setXIsNext(!xIsNext);
//   };

//   const resetGame = () => {
//     setSquares(Array(9).fill(null));
//     setXIsNext(true);
//   };

//   const winner = calculateWinner(squares);
//   const status = winner
//     ? `Winner: ${winner}`
//     : `Next: ${xIsNext ? 'X' : 'O'}`;

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-lg">
//       <div className="mb-4 text-lg font-medium">{status}</div>
//       <Board squares={squares} onClick={handleClick} />
//       <button
//         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//         onClick={resetGame}
//       >
//         Reset Game
//       </button>
//     </div>
//   );
// };

// export default Game;