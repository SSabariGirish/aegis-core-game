import React from 'react';
import './Game.css'; // We'll re-use the same CSS file
import operatorImage from './assets/operator-panel.png';

function LeftPanel() {
  return (
    <div className="side-panel left-panel">
      <h3>SYSTEM STATUS</h3>
      
      <img 
        src={operatorImage} 
        alt="System Status Operator" 
        className="panel-image"
      />

      <ul className="status-feed">
        <li>[PWR] Main Reactor... OK</li>
        <li>[NET] Comms Array... STABLE</li>
        <li>[BIO] Hydroponics... NOMINAL</li>
        <li>[SEC] Perimeter Grid... ACTIVE</li>
        <li>[SYS] Core Temp... 45.2C</li>
        <li>[LOG] Sentry 7... ONLINE</li>
        <li>[PWR] Shield Gen... OK</li>
        <li>[NET] Uplink... 98.7%</li>
        <li>[BIO] Life Support... NOMINAL</li>
        <li>[SEC] Vault Door... SEALED</li>
        <li>[SYS] CPU Load... 14.2%</li>
        <li>[LOG] Anomaly Scan... RUNNING</li>
      </ul>
    </div>
  );
}

export default LeftPanel;