import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState } from 'react';
import { GameContext } from '../context/GameContext';
import { useGame } from '../context/useGame';
import GameEndModal from './GameEndModal';
import GameTimer from './GameTimer';
import InningTracker from './InningTracker';
import MatchWinnerDisplay from './MatchWinnerDisplay';

const GameUI = () => {
  const { players, currentTurn, setCurrentTurn, breakerIndex, setInnings, setCurrentInning, turnHistory, setTurnHistory, showMatchWinnerModal, setShowMatchWinnerModal } =
    useGame();
  const { resetMatch } = useContext(GameContext);
  const [showGameOverModal, setShowGameOverModal] = useState(false);

  const otherPlayer = players[(currentTurn + 1) % 2];

  const handleCloseGameOverModal = () => {
    setShowGameOverModal(false);
    // Wait for animation to complete
    setTimeout(() => {
      if (showMatchWinnerModal) {
        setShowMatchWinnerModal(false);
      }
    }, 300);
  };

  const getActualPlayerIndex = (turn, breaker) => {
    // If breakerIndex is 0: turn 0 = player 0
    // If breakerIndex is 1: turn 0 = player 1
    return (breaker + turn) % 2;
  };

  const switchTurn = () => {
    const next = currentTurn === 0 ? 1 : 0;
    const actualPlayer = getActualPlayerIndex(currentTurn, breakerIndex);
    const updatedHistory = [...turnHistory, actualPlayer];
    setTurnHistory(updatedHistory);
    setCurrentTurn(next);

    const turnIndex = updatedHistory.length;
    const effectiveInning = Math.floor(turnIndex / 2);
    const inningShouldIncrement = turnIndex % 2 === 0;

    // console.log('Switch turn:', {
    //   previousHistory: turnHistory,
    //   updatedHistory,
    //   actualPlayer,
    //   turnIndex,
    //   effectiveInning,
    // });

    if (inningShouldIncrement && effectiveInning >= 0) {
      setCurrentInning(effectiveInning);
      setInnings((prev) => {
        if (!prev.includes(effectiveInning)) {
          return [...prev, effectiveInning];
        }
        return prev;
      });
      // console.log('✅ Inning incremented');
    } else {
      // console.log('⏸️ Not a full inning yet');
    }
  };

  const undoTurn = () => {
    // Exit if no turns to undo
    if (turnHistory.length === 0) return;

    // Reverse the turn switching logic
    const updatedHistory = turnHistory.slice(0, -1);
    const prev = currentTurn === 0 ? 1 : 0;

    // Only decrease inning if:
    // 1. We're moving from an even number of turns to an odd number
    // 2. The updated history length is at least 2 (one complete inning)
    const isCompletingInning = turnHistory.length % 2 === 0;
    const hasCompleteInning = updatedHistory.length >= 2;
    const shouldDecrementInning = isCompletingInning && hasCompleteInning;

    // Calculate new inning state
    const turnIndex = updatedHistory.length;
    const effectiveInning = Math.floor(turnIndex / 2);

    // console.log('Undo Turn:', {
    //   previousHistory: turnHistory,
    //   updatedHistory,
    //   previousTurn: prev,
    //   turnIndex,
    //   effectiveInning,
    //   isCompletingInning,
    //   hasCompleteInning,
    //   shouldDecrementInning,
    // });

    // Update state
    setTurnHistory(updatedHistory);
    setCurrentTurn(prev);

    // Only update innings if we're completing an inning
    if (shouldDecrementInning) {
      setCurrentInning(effectiveInning);
      setInnings((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div className="gameui-container">
      <div className="middle-stats">
        <GameTimer />
        <InningTracker />
      </div>
      <div className="ui-header">
        <div className={`p-card ${getActualPlayerIndex(currentTurn, breakerIndex) === 0 ? 'current-player' : ''}`}>
          {breakerIndex === 0 && <span className="break"> Break</span>}
          <FontAwesomeIcon icon={faUser} />
          <h3>{players[0]?.name}</h3>
          <p className="race">
            {players[0]?.score} / {players[0]?.race}
          </p>
        </div>
        <div className={`p-card ${getActualPlayerIndex(currentTurn, breakerIndex) === 1 ? 'current-player' : ''}`}>
          {breakerIndex === 1 && <span className="break"> Break</span>}
          <FontAwesomeIcon icon={faUser} />
          <h3>{players[1]?.name}</h3>
          <p className="race">
            {players[1]?.score} / {players[1]?.race}
          </p>
        </div>
      </div>

      <div className="btn-wrapper">
        <button onClick={switchTurn}>Switch turn to {otherPlayer?.name}</button>
        <button className="gameover" onClick={() => setShowGameOverModal(true)}>
          Game Over
        </button>
        <button onClick={undoTurn}>Undo Turn</button>
        <button className="reset" onClick={resetMatch}>
          Reset Match
        </button>
      </div>
      {showGameOverModal && <GameEndModal isOpen={showGameOverModal} onClose={handleCloseGameOverModal} onMatchEnd={() => setShowMatchWinnerModal(true)} />}
      {showMatchWinnerModal && <MatchWinnerDisplay isOpen={showMatchWinnerModal} />}
    </div>
  );
};

export default GameUI;
