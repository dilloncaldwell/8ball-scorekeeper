import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const TurnSwitcher = () => {
  const { currentTurn, setCurrentTurn } = useContext(GameContext);

  return (
    <div className="mb-4">
      <button onClick={() => setCurrentTurn((prev) => (prev === 0 ? 1 : 0))}>Switch Turn</button>
      <p>Current Turn: Player {currentTurn + 1}</p>
    </div>
  );
};

export default TurnSwitcher;
