import React from 'react';
import { useGame } from '../context/useGame';

const GameEndModal = ({ isOpen, onClose, onMatchEnd }) => {
  const {
    players,
    setPlayers,
    currentTurn,
    breakerIndex,
    innings,
    setInnings,
    setCurrentInning,
    setTurnHistory,
    setBreakerIndex,
    setCurrentTurn,
    matchHistory,
    setMatchHistory,
    setGameEnded,
  } = useGame();

  if (!isOpen) return null;

  const getActualPlayerIndex = (turn, breaker) => (breaker + turn) % 2;
  const actualCurrent = getActualPlayerIndex(currentTurn, breakerIndex);
  const actualOpponent = (actualCurrent + 1) % 2;

  const onDeclareWinner = (isCurrentPlayerWinner) => {
    const winnerIndex = isCurrentPlayerWinner ? actualCurrent : actualOpponent;
    const winner = players[winnerIndex];
    console.log('winner', winner.name);
    console.log('currentTurn', players[currentTurn]);

    // 1. Save match history
    setMatchHistory([
      ...matchHistory,
      {
        game: matchHistory.length + 1,
        winner: winner.name,
        innings: innings.length,
      },
    ]);

    console.log('matchHistory', matchHistory);

    // 2. Update winner score
    const updatedPlayers = [...players];
    updatedPlayers[winnerIndex].score += 1;
    setPlayers(updatedPlayers);

    // 3. Reset innings and turns
    setInnings([]);
    setCurrentInning(0);
    setTurnHistory([]);

    // 4. Check if winner reached their race goal
    const hasWonMatch = updatedPlayers[winnerIndex].score >= updatedPlayers[winnerIndex].race;

    if (hasWonMatch) {
      // Entire match is over
      setGameEnded(true);
      onMatchEnd();
    } else {
      // Start next game with this player as breaker and current turn
      setBreakerIndex(winnerIndex);
      setCurrentTurn(0); // Always let breaker go first
      setGameEnded(false);
    }

    // 5. Close modal
    onClose();
  };

  const currentDisplayPlayer = players[getActualPlayerIndex(currentTurn, breakerIndex)];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Who Won?</h2>
        <p>Current player: {currentDisplayPlayer?.name}</p>

        <div className="modal-buttons">
          <h3>✅ Current Player Wins</h3>
          <button onClick={() => onDeclareWinner(true)}>Made 8 Ball</button>
          <button onClick={() => onDeclareWinner(true)}>Break & Run</button>
          <button onClick={() => onDeclareWinner(true)}>8 on Break</button>

          <h3>❌ Current Player Loses</h3>
          <button onClick={() => onDeclareWinner(false)}>Scratched on 8 Ball</button>
          <button onClick={() => onDeclareWinner(false)}>Made 8 Early</button>
          <br />
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default GameEndModal;
