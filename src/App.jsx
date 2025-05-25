import React from 'react';
import './App.css';
import GameUI from './components/GameUI';
import MatchSetupForm from './components/MatchSetupForm';
import { useGame } from './context/useGame';

const logo = `${import.meta.env.BASE_URL}8ball-32.png`;

const App = () => {
  const { gameStarted } = useGame();

  return (
    <>
      <div className="title-bar">
        <img id="app-logo" src={logo} alt="8 ball app logo" width="32" height="32" /> Ball Scorekeeper
      </div>
      <div className="app-container">{!gameStarted ? <MatchSetupForm /> : <GameUI />}</div>
    </>
  );
};

export default App;
