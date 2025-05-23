import React, { useContext, useEffect, useState } from 'react';
import { GameContext } from '../context/GameContext';
import { useGame } from '../context/useGame';
import GameEndModal from './GameEndModal';
import GameTimer from './GameTimer';
import InningTracker from './InningTracker';
import MatchWinnerDisplay from './MatchWinnerDisplay';

const GameUI = () => {
  const { players, currentTurn, setCurrentTurn, breakerIndex, setInnings, setCurrentInning, turnHistory, setTurnHistory, startGameTimer, gameEnded } = useGame();
  const { resetMatch } = useContext(GameContext);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showMatchWinnerModal, setShowMatchWinnerModal] = useState(false);

  useEffect(() => {
    if (players.length === 2 && !gameEnded) {
      startGameTimer();
    }
  }, [players.length, gameEnded, startGameTimer]);

  const switchTurn = () => {
    const next = currentTurn === 0 ? 1 : 0;
    const actualPlayer = getActualPlayerIndex(currentTurn, breakerIndex);
    const updatedHistory = [...turnHistory, actualPlayer];
    setTurnHistory(updatedHistory);
    setCurrentTurn(next);

    const turnIndex = updatedHistory.length;
    const effectiveInning = Math.floor(turnIndex / 2);
    const inningShouldIncrement = turnIndex % 2 === 0;

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
    // console.log('breakerIndex:', breakerIndex);
    // console.log('currentTurn:', currentTurn);
    // console.log('turnHistory:', turnHistory);
  };

  const undoTurn = () => {
    if (turnHistory.length === 0) return;

    const updatedHistory = turnHistory.slice(0, -1);
    const previousTurn = turnHistory[turnHistory.length - 2] === undefined ? 0 : getActualPlayerIndex(turnHistory[turnHistory.length - 2], breakerIndex) === 0 ? 0 : 1;
    setTurnHistory(updatedHistory);
    setCurrentTurn(previousTurn);

    const prevInningCount = Math.floor(turnHistory.length / 2);
    const newInningCount = Math.floor(updatedHistory.length / 2);

    if (newInningCount < prevInningCount) {
      setCurrentInning(newInningCount);
      setInnings((prev) => prev.slice(0, -1));
      // console.log('↩️ Inning decremented');
    } else {
      // console.log('⏸️ No inning change');
    }
  };

  const otherPlayer = players[(currentTurn + 1) % 2];

  const getActualPlayerIndex = (turn, breaker) => {
    // If breakerIndex is 0: turn 0 = player 0
    // If breakerIndex is 1: turn 0 = player 1
    return (breaker + turn) % 2;
  };

  return (
    <>
      <div className="ui-header">
        <div className={`p-card ${getActualPlayerIndex(currentTurn, breakerIndex) === 0 ? 'current-player' : ''}`}>
          {breakerIndex === 0 && <span className="break"> Break</span>}
          <h3>{players[0]?.name}</h3>
          <p>
            {players[0]?.score} / {players[0]?.race}
          </p>
        </div>
        <div className="middle-stats">
          <GameTimer />
          <InningTracker />
        </div>
        <div className={`p-card ${getActualPlayerIndex(currentTurn, breakerIndex) === 1 ? 'current-player' : ''}`}>
          {breakerIndex === 1 && <span className="break"> Break</span>}
          <h3>{players[1]?.name}</h3>
          <p>
            {players[1]?.score} / {players[1]?.race}
          </p>
        </div>
      </div>

      <div className="btn-wrapper">
        <button onClick={switchTurn}>Switch turn to {otherPlayer?.name}</button>
        <button onClick={() => setShowGameOverModal(true)}>Game Over</button>
        <button onClick={undoTurn}>Undo Turn</button>
        <button onClick={resetMatch}>Reset Match</button>
      </div>
      {showGameOverModal && <GameEndModal isOpen={showGameOverModal} onClose={() => setShowGameOverModal(false)} onMatchEnd={() => setShowMatchWinnerModal(true)} />}
      {showMatchWinnerModal && <MatchWinnerDisplay isOpen={showMatchWinnerModal} />}
    </>
  );
};

export default GameUI;
