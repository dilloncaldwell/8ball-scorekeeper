import React, { useEffect } from 'react';
import { useGame } from '../context/useGame';

const GameEndModal = ({ isOpen, onClose, onMatchEnd }) => {
  const {
    players,
    setPlayers,
    currentTurn,
    breakerIndex,
    innings,
    setBreakerIndex,
    gameTimer,
    pauseGameTimer,
    startGameTimer,
    resetGameTimer,
    setTotalMatchTime,
    matchHistory,
    setMatchHistory,
    setGameEnded,
    resetGame,
  } = useGame();

  useEffect(() => {
    // console.log('GameEndModal: isOpen changed to', isOpen);
    if (isOpen) {
      // console.log('GameEndModal: Pausing timer');
      pauseGameTimer(); // Pause the timer when modal opens
    }
  }, [isOpen, pauseGameTimer]);

  // Handle cancel - resume timer from where it was paused
  const handleCancel = () => {
    // console.log('GameEndModal: Resuming timer');
    startGameTimer();
    onClose();
  };

  if (!isOpen) return null;

  const getActualPlayerIndex = (turn, breaker) => (breaker + turn) % 2;
  const actualCurrent = getActualPlayerIndex(currentTurn, breakerIndex);
  const actualOpponent = (actualCurrent + 1) % 2;

  const onDeclareWinner = (isCurrentPlayerWinner) => {
    const winnerIndex = isCurrentPlayerWinner ? actualCurrent : actualOpponent;
    const winner = players[winnerIndex];

    // 1. Save match history
    const currentGameStats = {
      game: matchHistory.length + 1,
      winner: winner.name,
      innings: innings.length,
      time: gameTimer,
    };

    // Update match history
    setMatchHistory((prev) => [...prev, currentGameStats]);
    // Add current game time to total match time
    setTotalMatchTime((prev) => prev + gameTimer);

    // 2. Update winner score
    const updatedPlayers = [...players];
    updatedPlayers[winnerIndex].score += 1;
    setPlayers(updatedPlayers);

    // 3. Check if winner reached their race goal
    const hasWonMatch = updatedPlayers[winnerIndex].score >= updatedPlayers[winnerIndex].race;

    if (hasWonMatch) {
      // Entire match is over
      setGameEnded(true);
      onMatchEnd();
    } else {
      // Start next game with this player as breaker and current turn
      resetGameTimer();
      setBreakerIndex(winnerIndex);
      resetGame();
      startGameTimer();
    }

    // 4. Close modal
    onClose();
  };

  const currentDisplayPlayer = players[getActualPlayerIndex(currentTurn, breakerIndex)];

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Who Won?</h2>
        <div className="modal-buttons">
          <h3>✅ {currentDisplayPlayer?.name} Wins</h3>
          <button onClick={() => onDeclareWinner(true)}>Made 8 Ball</button>
          <button onClick={() => onDeclareWinner(true)}>Break & Run</button>
          <button onClick={() => onDeclareWinner(true)}>8 on Break</button>

          <h3>❌ {currentDisplayPlayer?.name} Loses</h3>
          <button onClick={() => onDeclareWinner(false)}>Scratched on 8 Ball</button>
          <button onClick={() => onDeclareWinner(false)}>Made 8 Early</button>
          <br />
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default GameEndModal;
