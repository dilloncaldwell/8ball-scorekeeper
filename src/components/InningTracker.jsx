import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';

const InningTracker = () => {
  const { innings, gameStarted } = useContext(GameContext);

  if (!gameStarted) return null;

  return (
    <div className="innings">
      <FontAwesomeIcon icon={faHourglassHalf} />
      {innings.length}
    </div>
  );
};

export default InningTracker;
