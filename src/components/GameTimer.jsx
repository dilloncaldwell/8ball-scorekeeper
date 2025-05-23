import React, { useCallback } from 'react';
import { useGame } from '../context/useGame';
import { useTimer } from '../hooks/useTimer';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
};

const GameTimer = () => {
  // const { gameEnded, isTimerRunning, gameTimer, setGameTimer } = useGame();
  const { isTimerRunning, gameTimer, setGameTimer } = useGame();

  const handleTick = useCallback(
    (newTime) => {
      setGameTimer(newTime);
    },
    [setGameTimer]
  );

  // const [, reset] = useTimer(isTimerRunning, handleTick);

  // useEffect(() => {
  //   if (gameEnded) {
  //     reset();
  //   }
  // }, [gameEnded, reset]);

  useTimer(isTimerRunning, handleTick);

  return <div className="game-timer">Game Timer: {formatTime(gameTimer)}</div>;
};

export default GameTimer;
