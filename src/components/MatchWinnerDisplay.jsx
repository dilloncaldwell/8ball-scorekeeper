import React, { useContext, useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { GameContext } from '../context/GameContext';
import { useGame } from '../context/useGame';

const MatchWinnerDisplay = ({ isOpen }) => {
  const { matchHistory, players, totalMatchTime } = useGame();
  const { resetMatch } = useContext(GameContext);
  const [isActive, setIsActive] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  // Handle window resize for confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsActive(true);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const winner = matchHistory[matchHistory.length - 1]?.winner;

  return (
    <div className={`modal-overlay ${isActive ? 'active' : ''}`}>
      <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={250} recycle={false} colors={['#646cff', '#535bf2', '#24286a', '#353987']} />
      <div className={`modal match-end ${isActive ? 'active' : ''}`}>
        <h2>Match Summary</h2>
        <div className="match-summary">
          <h3>{winner} wins! 🎉</h3>
          <div className="final-scores">
            <div className="scores">
              {players.map((player, index) => (
                <div key={index}>
                  <div className="name">
                    {player.score >= player.race && '🏆 '}
                    {player.name}
                  </div>
                  {player.score} / {player.race}
                </div>
              ))}
            </div>
            <div className="total-match-time">Total Match Time: {formatTime(totalMatchTime)}</div>
          </div>
          <div className="game-summary-list">
            {matchHistory.map((game) => (
              <div key={game.game} className="game-summary">
                <div className="game-winner">
                  Game {game.game}: {game.winner}
                </div>
                <div className="game-stats">
                  <div className="innings">Innings: {game.innings}</div>
                  <div className="game-time">Time: {formatTime(game.time)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <br />
        <button onClick={resetMatch}>Play Again</button>
      </div>
    </div>
  );
};

export default MatchWinnerDisplay;
