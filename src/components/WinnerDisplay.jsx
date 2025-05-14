import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const WinnerDisplay = () => {
  const { gameEnded, players } = useContext(GameContext);

  if (!gameEnded) return null;

  const winner = players.find((p) => p.score >= p.race);

  return (
    <div className="bg-green-100 text-green-800 p-4 text-center rounded">
      <h2 className="text-xl font-bold">{winner.name} Wins!</h2>
    </div>
  );
};

export default WinnerDisplay;
