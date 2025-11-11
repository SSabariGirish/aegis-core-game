import React, { useState, useEffect } from 'react';
import './Game.css'; 
import logo from './assets/aegis-logo.png';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

// --- Helper function to shuffle an array (Fisher-Yates shuffle) ---
function shuffleArray(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}


function Game() {
  // --- Game State ---
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  
  const [logQueue, setLogQueue] = useState([]); 
  const [currentLog, setCurrentLog] = useState(null); 
  
  const [gameStarted, setGameStarted] = useState(false); 
  const [gameOver, setGameOver] = useState(false);
  
  // --- NEW: Feedback State ---
  const [feedback, setFeedback] = useState(null); // e.g., { type: 'correct', message: '...' }
  
  
  // --- Game Setup (Runs once on load) ---
  useEffect(() => {
    fetch('/scenarios.json')
      .then(response => response.json())
      .then(data => {
        const levelLogs = data.levels[0].logs;
        const shuffledLogs = shuffleArray([...levelLogs]);
        
        // Load the first log and set the rest of the queue
        setCurrentLog(shuffledLogs[0]);
        setLogQueue(shuffledLogs.slice(1));
        
        setGameStarted(true); 
      })
      .catch(error => console.error("Failed to load scenarios:", error));
  }, []); 

  
  // --- Game Loop (Timer) ---
  useEffect(() => {
    if (gameStarted && !gameOver) {
      // Start the game timer
      const gameTimer = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(gameTimer); 
            setGameOver(true); // Game over!
            return 0;
          }
          return prevTimer - 1; // Countdown
        });
      }, 1000); 

      return () => clearInterval(gameTimer);
    }
  }, [gameStarted, gameOver]); // This effect only runs the timer

  
  // --- NEW: Function to load the next log ---
  const loadNextLog = () => {
    setFeedback(null); // Clear the feedback message
    
    if (logQueue.length > 0) {
      const nextLog = logQueue[0];
      const remainingLogs = logQueue.slice(1);
      
      setCurrentLog(nextLog); // Set the next log
      setLogQueue(remainingLogs); // Update the queue
    } else {
      // No more logs! End the game.
      setCurrentLog(null);
      setGameOver(true);
    }
  };


  // --- UPDATED: Function to handle button clicks ---
  const handleDecision = (playerChoseAnomaly) => {
    // Don't do anything if game is over, no log, or feedback is already showing
    if (gameOver || !currentLog || feedback) return;

    // Check the answer
    if (currentLog.anomaly === playerChoseAnomaly) {
      // Correct!
      setScore(prevScore => prevScore + 10);
      setFeedback({ type: 'correct', message: 'SUCCESSFUL THREAT ASSESSMENT' });
    } else {
      // Incorrect!
      setTimer(prevTimer => Math.max(0, prevTimer - 5)); // Lose 5 seconds
      setFeedback({ type: 'incorrect', message: 'ITHREAT ASSESSMENT FAILED :: PENALTY -5s' });
    }

    // Wait 1.5 seconds, then load the next log
    setTimeout(() => {
      loadNextLog();
    }, 1500); // 1.5 second pause for feedback
  };


  // --- Render the current log ---
  const renderCurrentLog = () => {
    if (gameOver) {
      return (
        <div className="terminal-log-entry game-over-text"> 
          <span className="log-key">--- GAME OVER ---</span><br/>
          <span className="log-value">FINAL SCORE: {score}</span>
        </div>
      );
    }
    
    if (!currentLog && !gameStarted) {
      return <div className="terminal-log-entry">Booting AEGIS Core...</div>;
    }
    
    if (!currentLog && gameStarted && !gameOver) {
        return <div className="terminal-log-entry">--- NO LOGS REMAINING ---</div>;
    }

    if (!currentLog) {
      return null; // Should be covered by other states
    }
    
    // This turns the log object into a readable string
    return (
      <div className="terminal-log-entry">
        {Object.entries(currentLog.log).map(([key, value]) => (
          <span key={key}>
            <span className="log-key">{key}:</span> 
            <span className="log-value">"{value}"</span>, 
            <br />
          </span>
        ))}
      </div>
    );
  };
  
  
  return (
    <div className="game-container">
      
      <div className="game-hud">
        {/* ... (Your HUD JSX is perfect) ... */}
        <div className="hud-title">
          <img src={logo} alt="Aegis Core Emblem" className="hud-logo" />
          <h1>Aegis Core: Anomaly Detection</h1>
        </div>
        <div className="hud-stats">
          <div>SCORE: <span className="stat-value">{score}</span></div>
          <div>TIMER: <span className="stat-value">{timer}</span></div>
        </div>
      </div>

      <div className="main-content-area">
        <LeftPanel /> 
        
        <div className="game-terminal">
          {renderCurrentLog()}
          
          {/* --- NEW: Feedback Area --- */}
          {feedback && (
            <div className="feedback-message">
              <span className={feedback.type === 'correct' ? 'feedback-correct' : 'feedback-incorrect'}>
                {feedback.message}
              </span>
            </div>
          )}
        </div>
        
        <RightPanel />
      </div>

      <div className="game-controls">
        {/* Buttons are disabled while feedback is showing */}
        <button 
          className="control-button permit" 
          disabled={gameOver || feedback}
          onClick={() => handleDecision(false)}
        >
          // PERMIT (SECURE)
        </button>
        <button 
          className="control-button quarantine" 
          disabled={gameOver || feedback}
          onClick={() => handleDecision(true)}
        >
          // QUARANTINE (ANOMALY)
        </button>
      </div>
      
    </div>
  );
}

export default Game;