import { useState, useEffect, useRef } from 'react';
import styles from './memory-match.module.css';

// Array of emojis for cards - using 12 cards (6 pairs) instead of 16 to reduce vertical space
const EMOJIS = [
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊',
  '🐶', '🐱', '🐭', '🐹', '🐰', '🦊'
];

const MemoryMatch = ({ setScoreObject }) => {
  const [cards, setCards] = useState([]);
  const [flippedIndices, setFlippedIndices] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const containerRef = useRef(null);

  // Initialize/shuffle the cards
  useEffect(() => {
    initializeGame();
  }, []);

  // Check if game is over
  useEffect(() => {
    if (matchedPairs.length === EMOJIS.length / 2) {
      const endGameTime = Date.now();
      setEndTime(endGameTime);
      
      // Calculate score based on moves and time taken
      const timeTaken = Math.floor((endGameTime - startTime) / 1000);
      const baseScore = 1000;
      const movesPenalty = moves * 10;
      const timePenalty = timeTaken * 2;
      
      const finalScore = Math.max(0, baseScore - movesPenalty - timePenalty);
      setScore(finalScore);
      setGameOver(true);
      
      // Send score to parent component
      if (setScoreObject) {
        setScoreObject({ score: finalScore });
      }
      
      // Scroll to show game over screen if needed
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [matchedPairs, moves, startTime, setScoreObject]);

  // Handle flipped cards logic
  useEffect(() => {
    // If we have 2 flipped cards, check if they match
    if (flippedIndices.length === 2) {
      setMoves(prevMoves => prevMoves + 1);
      
      const [firstIndex, secondIndex] = flippedIndices;
      
      if (cards[firstIndex] === cards[secondIndex]) {
        // Match found
        setMatchedPairs(prevMatched => [...prevMatched, cards[firstIndex]]);
      }
      
      // Flip cards back after a delay
      const timer = setTimeout(() => {
        setFlippedIndices([]);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [flippedIndices, cards]);

  const initializeGame = () => {
    // Shuffle the emojis
    const shuffledCards = [...EMOJIS].sort(() => Math.random() - 0.5);
    setCards(shuffledCards);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameOver(false);
    setScore(0);
    setStartTime(Date.now());
    setEndTime(null);
  };

  const handleCardClick = (index) => {
    // Ignore clicks if:
    // 1. Card is already flipped
    // 2. Same card is clicked twice
    // 3. Two cards are already flipped
    // 4. Card is already matched
    if (
      flippedIndices.includes(index) || 
      flippedIndices.length === 2 || 
      matchedPairs.includes(cards[index])
    ) {
      return;
    }
    
    // Add this card to flipped cards
    setFlippedIndices(prevFlipped => [...prevFlipped, index]);
  };

  const formatTime = (timeInMs) => {
    if (!timeInMs) return '00:00';
    const totalSeconds = Math.floor(timeInMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container} ref={containerRef}>
      <h1 className={styles.title}>Memory Match</h1>
      
      {gameOver ? (
        <div className={styles.gameOverContainer}>
          <h2 className={styles.gameOverTitle}>Game Completed!</h2>
          <p className={styles.gameOverText}>Moves: {moves}</p>
          <p className={styles.gameOverText}>
            Time: {formatTime(endTime - startTime)}
          </p>
          <p className={styles.scoreText}>Score: {score}</p>
          <button 
            className={styles.playAgainButton}
            onClick={initializeGame}
          >
            Play Again
          </button>
        </div>
      ) : (
        <div className={styles.gameContent}>
          <div className={styles.stats}>
            <p>Moves: {moves}</p>
            <p>Pairs: {matchedPairs.length} / {EMOJIS.length / 2}</p>
          </div>
          
          <div className={styles.grid}>
            {cards.map((emoji, index) => (
              <div
                key={index}
                className={`${styles.card} ${
                  flippedIndices.includes(index) || matchedPairs.includes(emoji)
                    ? styles.flipped
                    : ''
                } ${matchedPairs.includes(emoji) ? styles.matched : ''}`}
                onClick={() => handleCardClick(index)}
              >
                <div className={styles.cardInner}>
                  <div className={styles.cardFront}></div>
                  <div className={styles.cardBack}>{emoji}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryMatch; 