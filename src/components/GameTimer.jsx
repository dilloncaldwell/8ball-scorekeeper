import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useGame } from '../context/useGame';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
};

const GameTimer = () => {
  const { gameTimer } = useGame();

  return (
    <div className="game-timer">
      <FontAwesomeIcon icon={faClock} /> Time:&nbsp;
      {formatTime(gameTimer)}
    </div>
  );
};

export default GameTimer;
