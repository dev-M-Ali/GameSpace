import { useEffect, useState } from 'react';
import styles from './game1024.module.css';

function initializeGrid(size) {
  const grid = Array(size).fill().map(() => Array(size).fill(0));
  return addRandomTile(addRandomTile(grid));
}

function addRandomTile(grid) {
  const emptyCells = [];
  const size = grid.length;
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === 0) {
        emptyCells.push({ i, j });
      }
    }
  }
  
  if (emptyCells.length > 0) {
    const { i, j } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    grid[i][j] = Math.random() < 0.9 ? 2 : 4;
  }
  
  return grid;
}

function moveTiles(grid, direction) {
  const size = grid.length;
  const newGrid = JSON.parse(JSON.stringify(grid));
  let scoreIncrease = 0;
  let moved = false;

  if (direction === 'up' || direction === 'down') {
    for (let i = 0; i < size; i++) {
      for (let j = i + 1; j < size; j++) {
        [newGrid[i][j], newGrid[j][i]] = [newGrid[j][i], newGrid[i][j]];
      }
    }
  }

  for (let i = 0; i < size; i++) {
    let row = newGrid[i].filter(val => val !== 0);
    
    if (direction === 'right' || direction === 'down') {
      row.reverse();
    }

    for (let j = 0; j < row.length - 1; j++) {
      if (row[j] === row[j + 1]) {
        row[j] *= 2;
        scoreIncrease += row[j];
        row[j + 1] = 0;
        moved = true;
      }
    }

    row = row.filter(val => val !== 0);
    
    while (row.length < size) {
      row.push(0);
      moved = moved || (direction === 'right' || direction === 'down' ? 
               newGrid[i][size - row.length] !== 0 : 
               newGrid[i][row.length - 1] !== 0);
    }

    if (direction === 'right' || direction === 'down') {
      row.reverse();
    }

    newGrid[i] = row;
  }

  if (direction === 'up' || direction === 'down') {
    for (let i = 0; i < size; i++) {
      for (let j = i + 1; j < size; j++) {
        [newGrid[i][j], newGrid[j][i]] = [newGrid[j][i], newGrid[i][j]];
      }
    }
  }

  return { grid: newGrid, scoreIncrease, moved };
}

function checkGameOver(grid) {
  const size = grid.length;
  
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (grid[i][j] === 0) {
        return false;
      }
      if (j < size - 1 && grid[i][j] === grid[i][j + 1]) {
        return false;
      }
      if (i < size - 1 && grid[i][j] === grid[i + 1][j]) {
        return false;
      }
    }
  }
  
  return true;
}

export default function Game1024() {
  const gridSize = 4;
  const [grid, setGrid] = useState(initializeGrid(gridSize));
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [keepPlaying, setKeepPlaying] = useState(false);
  const [maxTile, setMaxTile] = useState(2);

  useEffect(() => {
    const currentMax = Math.max(...grid.flat());
    setMaxTile(currentMax);
    
    if (!won && currentMax >= 1024) {
      setWon(true);
    }
  }, [grid]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver && !keepPlaying) return;
      
      let direction;
      switch (e.key) {
        case 'ArrowUp': direction = 'up'; break;
        case 'ArrowRight': direction = 'right'; break;
        case 'ArrowDown': direction = 'down'; break;
        case 'ArrowLeft': direction = 'left'; break;
        default: return;
      }
      
      e.preventDefault();
      move(direction);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [grid, gameOver, keepPlaying]);

  const move = (direction) => {
    const { grid: newGrid, scoreIncrease, moved } = moveTiles(grid, direction);
    
    if (moved) {
      const updatedGrid = addRandomTile(newGrid);
      const newScore = score + scoreIncrease;
      
      setGrid(updatedGrid);
      setScore(newScore);
      setBestScore(prev => Math.max(prev, newScore));
      
      if (checkGameOver(updatedGrid)) {
        setGameOver(true);
      }
    }
  };

  const resetGame = () => {
    setGrid(initializeGrid(gridSize));
    setScore(0);
    setGameOver(false);
    setWon(false);
    setKeepPlaying(false);
    setMaxTile(2);
  };

  const continueGame = () => {
    setKeepPlaying(true);
  };

  let touchStartX = 0;
  let touchStartY = 0;

  const handleTouchStart = (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (gameOver && !keepPlaying) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 0) move('right');
      else move('left');
    } else {
      if (dy > 0) move('down');
      else move('up');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>1024</h1>
        <div className={styles.scores}>
          <div className={styles.scoreBox}>
            <div className={styles.scoreLabel}>SCORE</div>
            <div className={styles.scoreValue}>{score}</div>
          </div>
          <div className={styles.scoreBox}>
            <div className={styles.scoreLabel}>BEST</div>
            <div className={styles.scoreValue}>{bestScore}</div>
          </div>
          <div className={styles.scoreBox}>
            <div className={styles.scoreLabel}>MAX TILE</div>
            <div className={styles.scoreValue}>{maxTile}</div>
          </div>
        </div>
      </div>
      
      <div className={styles.gameControls}>
        <button onClick={resetGame} className={styles.newGameButton}>New Game</button>
        {won && !keepPlaying && (
          <button onClick={continueGame} className={styles.continueButton}>Keep Playing</button>
        )}
      </div>
      
      <div 
        className={styles.gameContainer}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className={styles.gridBackground}>
          {Array(gridSize * gridSize).fill().map((_, index) => (
            <div key={`cell-${index}`} className={styles.gridCell}></div>
          ))}
        </div>
        
        <div className={styles.tilesContainer}>
          {grid.map((row, rowIndex) => (
            row.map((value, colIndex) => (
              value !== 0 && (
                <div 
                  key={`tile-${rowIndex}-${colIndex}`}
                  className={`${styles.tile} ${styles[`tile-${value}`]}`}
                  style={{
                    top: `${rowIndex * (100 / gridSize)}%`,
                    left: `${colIndex * (100 / gridSize)}%`,
                  }}
                >
                  {value}
                </div>
              )
            ))
          ))}
        </div>
        
        {(gameOver || (won && !keepPlaying)) && (
          <div className={styles.gameOverlay}>
            {won && !keepPlaying ? (
              <div className={styles.winMessage}>
                <h2>You Win!</h2>
                <p>Reached {maxTile} tile!</p>
                {maxTile > 1024 && <p>Amazing! You got beyond 1024!</p>}
              </div>
            ) : (
              <div className={styles.gameOverMessage}>
                <h2>Game Over!</h2>
                <p>Max Tile: {maxTile}</p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className={styles.instructions}>
        <p>Join the numbers and get to the <strong>1024 tile!</strong></p>
        <p>Use <strong>arrow keys</strong> or <strong>swipe</strong> to move the tiles.</p>
      </div>
      
    </div>
  );
}