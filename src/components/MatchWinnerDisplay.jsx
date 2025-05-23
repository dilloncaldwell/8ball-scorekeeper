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
        <h2>🏆 Match Winner</h2>
        <h3>{winner} has won the match!</h3>
        <div className="match-summary">
          <div className="title">Match Summary</div>
          <div className="final-scores">
            <div className="scores">
              {players.map((player, index) => (
                <div key={index}>
                  {player.name}: <br />
                  {player.score} / {player.race}
                </div>
              ))}
            </div>
          </div>
          <div className="total-match-time">Total Match Time: {formatTime(totalMatchTime)}</div>
          {matchHistory.map((game) => (
            <div key={game.game} className="game-summary">
              <div className="game-winner">
                Game {game.game}: {game.winner}
              </div>
              <div className="game-stats">
                <div className="innings">Innings: {game.innings}</div>
                <div className="game-time">time: {formatTime(game.time)}</div>
              </div>
            </div>
          ))}
        </div>
        <br />
        <button onClick={resetMatch}>Play Again</button>
      </div>
    </div>
  );
};

export default MatchWinnerDisplay;
