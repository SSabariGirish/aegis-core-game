import React from 'react';
import './Game.css'; // Re-use the same CSS
import sentryImage from './assets/sentry-panel.png';

function RightPanel() {
  return (
    <div className="side-panel right-panel">
      <h3>ANOMALY ALERTS</h3>
      
      <img 
        src={sentryImage} 
        alt="Aegis Sentry" 
        className="panel-image"
      />

      <div className="alert-feed">
        {/* We'll fill this with alerts later */}
        <p>-- No high-priority alerts --</p>
      </div>
    </div>
  );
}

export default RightPanel;