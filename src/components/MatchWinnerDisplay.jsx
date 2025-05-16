import React from 'react';
import { useGame } from '../context/useGame';

const MatchWinnerDisplay = ({ isOpen, onClose }) => {
  const { matchHistory } = useGame();

  if (!isOpen) return null;

  const winner = matchHistory[matchHistory.length - 1]?.winner;

  return (
    <div className="modal-overlay">
      <div className="modal match-end">
        <h2>🏆 Match Winner</h2>
        <h3>{winner} has won the match!</h3>
        <div className="match-summary">
          <div className="title">Match Summary</div>
          {matchHistory.map((game) => (
            <div key={game.game} className="game-summary">
              <div className="game-winner">
                Game {game.game}: {game.winner}
              </div>
              <div className="game-stats">
                <div className="innings">Innings: {game.innings}</div>
                <div className="game-time">time: 0s</div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default MatchWinnerDisplay;
