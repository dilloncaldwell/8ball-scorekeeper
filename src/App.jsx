import React from 'react';
import './App.css';
import GameUI from './components/GameUI';
import MatchSetupForm from './components/MatchSetupForm';
import { useGame } from './context/useGame';

const App = () => {
  const { gameStarted } = useGame();

  return (
    <>
      <div className="title-bar">8 Ball Scorekeeper</div>
      <div className="app-container">{!gameStarted ? <MatchSetupForm /> : <GameUI />}</div>
    </>
  );
};

export default App;
