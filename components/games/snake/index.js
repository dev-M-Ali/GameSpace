import { useEffect, useState, useRef } from 'react';
import styles from './snake.module.css';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;
const MAX_SPEED = 50;

const Snake = ({ setScoreObject }) => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [isPaused, setIsPaused] = useState(false);
  const [cellSize, setCellSize] = useState(CELL_SIZE);
  const gameRef = useRef(null);

  // Generate random food position
  const generateFood = () => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    
    // Make sure food doesn't spawn on the snake
    const isOnSnake = snake.some(segment => segment.x === x && segment.y === y);
    if (isOnSnake) {
      return generateFood();
    }
    
    return { x, y };
  };

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameOver) return;
      
      // Prevent default behavior for arrow keys to stop page scrolling
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
        case ' ':
          setIsPaused(prev => !prev);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, gameOver]);

  // Start the game loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };
        let willPassBoundary = false;
        let newX = head.x;
        let newY = head.y;
        
        // Calculate new position based on direction
        switch (direction) {
          case 'UP':
            newY = head.y - 1;
            willPassBoundary = (newY < 0);
            break;
          case 'DOWN':
            newY = head.y + 1;
            willPassBoundary = (newY >= GRID_SIZE);
            break;
          case 'LEFT':
            newX = head.x - 1;
            willPassBoundary = (newX < 0);
            break;
          case 'RIGHT':
            newX = head.x + 1;
            willPassBoundary = (newX >= GRID_SIZE);
            break;
          default:
            break;
        }
        
        // Apply boundary wrap around carefully
        if (willPassBoundary) {
          // If score is high (over 120), ensure precise boundary wrap with no skips
          if (score > 120) {
            switch (direction) {
              case 'UP':
                newY = GRID_SIZE - 1;
                break;
              case 'DOWN':
                newY = 0;
                break;
              case 'LEFT':
                newX = GRID_SIZE - 1;
                break;
              case 'RIGHT':
                newX = 0;
                break;
              default:
                break;
            }
          } else {
            // Normal boundary wrap using modulo for lower scores
            newY = (newY + GRID_SIZE) % GRID_SIZE;
            newX = (newX + GRID_SIZE) % GRID_SIZE;
          }
        }
        
        // Update head position
        head.x = newX;
        head.y = newY;
        
        // Check if snake hits itself
        const hitSelf = prevSnake.some((segment, index) => 
          index > 0 && segment.x === head.x && segment.y === head.y
        );
        
        if (hitSelf) {
          setGameOver(true);
          return prevSnake;
        }
        
        // Create new snake array with new head
        const newSnake = [head, ...prevSnake];
        
        // Check if snake eats food
        if (head.x === food.x && head.y === food.y) {
          // Increase score
          setScore(prev => prev + 10);
          
          // Speed up the game
          setSpeed(prev => Math.max(MAX_SPEED, prev - SPEED_INCREMENT));
          
          // Generate new food
          setFood(generateFood());
        } else {
          // Remove tail if no food was eaten
          newSnake.pop();
        }
        
        return newSnake;
      });
    };

    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [direction, food, gameOver, isPaused, speed, score]);

  // Send score when game is over
  useEffect(() => {
    if (gameOver && setScoreObject) {
      setScoreObject({ score });
    }
  }, [gameOver, score, setScoreObject]);

  // Make sure the game board remains centered and contained
  useEffect(() => {
    // Set initial CSS variable
    document.documentElement.style.setProperty('--cell-size', `${CELL_SIZE}px`);
    
    // Ensure the board fits within the viewport
    const handleResize = () => {
      const container = document.querySelector(`.${styles.container}`);
      if (!container) return;
      
      const availableHeight = container.clientHeight - 150; // Accounting for title, score, controls
      const availableWidth = container.clientWidth - 40; // Accounting for padding
      
      const maxGridSize = Math.min(availableHeight, availableWidth);
      const newCellSize = Math.floor(maxGridSize / GRID_SIZE);
      
      // Update CSS variable
      document.documentElement.style.setProperty('--cell-size', `${newCellSize}px`);
      setCellSize(newCellSize);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Reset game
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setSpeed(INITIAL_SPEED);
    setIsPaused(false);
    if (gameRef.current) {
      gameRef.current.focus();
    }
  };

  return (
    <div className={styles.container} ref={gameRef} tabIndex="0">
      <h1 className={styles.title}>Snake Game</h1>
      
      <div className={styles.scoreBoard}>
        <span>Score: {score}</span>
        {!gameOver && (
          <button 
            className={styles.pauseButton} 
            onClick={() => setIsPaused(prev => !prev)}
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
        )}
      </div>
      
      {gameOver ? (
        <div className={styles.gameOverContainer}>
          <h2 className={styles.gameOverText}>Game Over!</h2>
          <p className={styles.finalScore}>Final Score: {score}</p>
          <button className={styles.resetButton} onClick={resetGame}>
            Play Again
          </button>
        </div>
      ) : (
        <div 
          className={styles.gameBoard}
          style={{ 
            width: `${GRID_SIZE * cellSize}px`, 
            height: `${GRID_SIZE * cellSize}px` 
          }}
        >
          {/* Render food */}
          <div
            className={styles.food}
            style={{
              left: `${food.x * cellSize}px`,
              top: `${food.y * cellSize}px`
            }}
          />
          
          {/* Render snake */}
          {snake.map((segment, index) => (
            <div
              key={index}
              className={`${styles.snakeSegment} ${index === 0 ? styles.snakeHead : ''}`}
              style={{
                left: `${segment.x * cellSize}px`,
                top: `${segment.y * cellSize}px`
              }}
            />
          ))}
        </div>
      )}
      
      <div className={styles.controls}>
        <p>Use arrow keys to move</p>
        <p>Press space to pause/resume</p>
      </div>
    </div>
  );
};

export default Snake; 