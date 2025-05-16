import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const InningTracker = () => {
  const { innings, gameStarted } = useContext(GameContext);

  if (!gameStarted) return null;

  return (
    <div className="innings">
      Innings:
      <br /> {innings.length}
    </div>
  );
};

export default InningTracker;
