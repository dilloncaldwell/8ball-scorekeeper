import React, { useEffect } from 'react';
import { useGame } from '../context/useGame';
import { useTimer } from '../hooks/useTimer';

const PlayerTimer = () => {
  const { gameStarted } = useGame();
  const [seconds, reset] = useTimer(gameStarted);

  useEffect(() => {
    if (!gameStarted) reset();
  }, [gameStarted, reset]);

  return (
    <div>
      <h4>
        Player Time: {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}
      </h4>
    </div>
  );
};

export default PlayerTimer;
