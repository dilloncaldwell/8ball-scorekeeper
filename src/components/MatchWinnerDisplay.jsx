import React, { useContext } from 'react';
import { GameContext } from '../context/GameContext';
import { useGame } from '../context/useGame';

const MatchWinnerDisplay = ({ isOpen }) => {
  const { matchHistory, players, totalMatchTime } = useGame();
  const { resetMatch } = useContext(GameContext);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  if (!isOpen) return null;

  const winner = matchHistory[matchHistory.length - 1]?.winner;

  return (
    <div className="modal-overlay">
      <div className="modal match-end">
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
