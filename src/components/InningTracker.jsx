import React, { useContext, useEffect } from 'react';
import { GameContext } from '../context/GameContext';

const InningTracker = () => {
  const { innings, currentInning, setInnings, gameStarted } = useContext(GameContext);

  useEffect(() => {
    if (gameStarted && (innings.length === 0 || innings[innings.length - 1] !== currentInning)) {
      setInnings([...innings, currentInning]);
    }
  }, [innings, currentInning, setInnings, gameStarted]);

  if (!gameStarted) return null;

  return (
    <div className="innings">
      Innings:
      <br /> {innings.length}
    </div>
  );
};

export default InningTracker;
