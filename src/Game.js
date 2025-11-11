import React, { useState, useEffect } from 'react';
import './Game.css'; 
import logo from './assets/aegis-logo.png';
import LeftPanel from './LeftPanel';
import RightPanel from './RightPanel';

function Game() {
  // We'll add game logic here later
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  
  return (
    <div className="game-container">
      
      <div className="game-hud">
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
          <div className="terminal-log-entry">
            <span className="log-key">node:</span> <span className="log-value">"Medbay-Alpha"</span>, 
            <span className="log-key"> transmission:</span> <span className="log-value">"Biometric Sync"</span>, 
            <span className="log-key"> user:</span> <span className="log-value">"Dr. Eva"</span>
          </div>
          {/* We'll add a log feed here */}
        </div>
        
        <RightPanel />
      </div>

      <div className="game-controls">
        <button className="control-button permit">
          // PERMIT (SECURE)
        </button>
        <button className="control-button quarantine">
          // QUARANTINE (ANOMALY)
        </button>
      </div>
      
    </div>
  );
}

export default Game;