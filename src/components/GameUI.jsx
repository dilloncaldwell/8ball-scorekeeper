import React from 'react';
import { useGame } from '../context/useGame';
import InningTracker from './InningTracker';

const GameUI = () => {
  const { players, currentTurn, setCurrentTurn, breakerIndex, innings, setInnings, currentInning, setCurrentInning, gameTimer } = useGame();

  // const switchTurn = () => {
  //   const nextTurn = (currentTurn + 1) % 2;
  //   setCurrentTurn(nextTurn);

  //   // Track inning if turn goes back to breaker
  //   if (nextTurn === breakerIndex) {
  //     setCurrentInning(currentInning + 1);
  //   }
  // };
  const switchTurn = () => {
    const next = currentTurn === 0 ? 1 : 0;
    setCurrentTurn(next);

    if (next === breakerIndex) {
      setCurrentInning((prev) => prev + 1);
      setInnings((prev) => [...prev, currentInning + 1]);
    }
  };

  // const undoTurn = () => {
  //   const prev = currentTurn === 0 ? 1 : 0;
  //   setCurrentTurn(prev);

  //   // Remove inning if it was added inappropriately
  //   if (innings.length > 0 && prev === breakerIndex && innings[innings.length - 1] === currentInning) {
  //     const updated = [...innings];
  //     updated.pop();
  //     setInnings(updated);
  //     setCurrentInning((prev) => Math.max(1, prev - 1));
  //   }
  // };
  const undoTurn = () => {
    const previousTurn = currentTurn === 0 ? 1 : 0;
    setCurrentTurn(previousTurn);

    // If the player we're switching back to is the breaker, and we're past inning 0,
    // and the current inning was added this turn, remove it
    if (previousTurn === breakerIndex && currentInning > 0 && innings.length > 0 && innings[innings.length - 1] === currentInning) {
      setInnings((prev) => prev.slice(0, -1));
      setCurrentInning((prev) => prev - 1);
    }
  };

  const otherPlayer = players[(currentTurn + 1) % 2];

  return (
    <>
      <div className="ui-header">
        <div className={`p-card ${currentTurn === 0 ? 'current-player' : ''} `}>
          {breakerIndex === 0 && <span className="break"> Break</span>}
          <h3>{players[0]?.name}</h3>
          <p>
            {players[0]?.score} / {players[0]?.race}
          </p>
        </div>
        <div className="middle-stats">
          <div className="game-timer">
            Game Timer:
            <br /> {gameTimer}s
          </div>
          <InningTracker />
        </div>
        <div className={`p-card ${currentTurn === 1 ? 'current-player' : ''}`}>
          {breakerIndex === 1 && <span className="break"> Break</span>}
          <h3>{players[1]?.name}</h3>
          <p>
            {players[1]?.score} / {players[1]?.race}
          </p>
        </div>
      </div>

      <div className="btn-wrapper">
        <button onClick={switchTurn}>Switch turn to {otherPlayer?.name}</button>
        <button>Game Over</button>
        <button onClick={undoTurn}>Undo Turn</button>
      </div>
    </>
  );
};

export default GameUI;
