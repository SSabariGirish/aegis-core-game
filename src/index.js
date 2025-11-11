import React from 'react';
import ReactDOM from 'react-dom/client';
import Game from './Game'; // Import our new Game component
import './index.css'; // We'll keep this for a global reset

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Game /> {/* Render the Game component */}
  </React.StrictMode>
);