import React, { useContext, useState } from 'react';
import { GameContext } from '../context/GameContext';
import { useGame } from '../context/useGame';
import GameEndModal from './GameEndModal';
import GameTimer from './GameTimer';
import InningTracker from './InningTracker';
import MatchWinnerDisplay from './MatchWinnerDisplay';

const GameUI = () => {
  const { players, currentTurn, setCurrentTurn, breakerIndex, setInnings, setCurrentInning, turnHistory, setTurnHistory } = useGame();
  const { resetMatch } = useContext(GameContext);
  const [showGameOverModal, setShowGameOverModal] = useState(false);
  const [showMatchWinnerModal, setShowMatchWinnerModal] = useState(false);

  const otherPlayer = players[(currentTurn + 1) % 2];

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
    if (turnHistory.length === 0) return; // exit, no turns to undo

    // console.log('breakerIndex at start of undo', breakerIndex);
    // console.log('currentTurn at start of undo', currentTurn);
    // console.log('turnHistory when button is pressed', turnHistory);

    // Calculate the previousTurnIndex before modifying turnHistory
    const previousTurnIndex = turnHistory.length - 1;
    const previousTurn = previousTurnIndex >= 0 ? turnHistory[previousTurnIndex] : breakerIndex; // Default to breaker if no history exists

    // console.log('previousTurnIndex', previousTurnIndex);
    // console.log('previousTurn', previousTurn);

    // Create a new updatedHistory by removing the last turn
    const updatedHistory = turnHistory.slice(0, -1);

    setTurnHistory(updatedHistory); // update turnHistory to updated turnHistory
    setCurrentTurn(previousTurn); // update currentTurn to the previous player

    // Update innings if necessary
    const prevInningCount = Math.floor(turnHistory.length - 1);
    const newInningCount = Math.floor(updatedHistory.length / 2);

    if (newInningCount < prevInningCount) {
      setCurrentInning(newInningCount);
      setInnings((prev) => prev.slice(0, -1)); // Remove the last inning
      // console.log('↩️ Inning decremented');
    } else {
      // console.log('⏸️ No inning change');
    }

    // console.log('breakerIndex at end of undo', breakerIndex == 0 ? 'p1 is breaker' : 'p2 is breaker');
    // console.log('currentTurn at end of undo', previousTurn);
  };

  return (
    <>
      <div className="ui-header">
        <div className={`p-card ${getActualPlayerIndex(currentTurn, breakerIndex) === 0 ? 'current-player' : ''}`}>
          {breakerIndex === 0 && <span className="break"> Break</span>}
          <h3>{players[0]?.name}</h3>
          <p className="race">
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
        <br />
        <button onClick={resetMatch}>Reset Match</button>
      </div>
      {showGameOverModal && <GameEndModal isOpen={showGameOverModal} onClose={() => setShowGameOverModal(false)} onMatchEnd={() => setShowMatchWinnerModal(true)} />}
      {showMatchWinnerModal && <MatchWinnerDisplay isOpen={showMatchWinnerModal} />}
    </>
  );
};

export default GameUI;
