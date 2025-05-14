import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const TurnSwitcher = () => {
  const { currentTurn, setCurrentTurn } = useContext(GameContext);

  return (
    <div className="mb-4">
      <button onClick={() => setCurrentTurn((prev) => (prev === 0 ? 1 : 0))} className="bg-yellow-500 text-white p-2 rounded">
        Switch Turn
      </button>
      <p className="mt-2">Current Turn: Player {currentTurn + 1}</p>
    </div>
  );
};

export default TurnSwitcher;
