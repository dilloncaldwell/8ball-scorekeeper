import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const ScoreBoard = () => {
  const { players, breakerIndex } = useContext(GameContext);

  return (
    <div className="flex justify-between items-center border p-4 mb-4">
      {players.map((player, idx) => (
        <div key={idx} className="text-center">
          <h2 className="font-bold">{player.name}</h2>
          <p>
            Score: {player.score}/{player.race}
          </p>
          {idx === breakerIndex && <p className="text-green-600">Breaking</p>}
        </div>
      ))}
    </div>
  );
};

export default ScoreBoard;
