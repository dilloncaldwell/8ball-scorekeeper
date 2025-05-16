import React, { useEffect, useState } from 'react';
import { GameContext } from './GameContext';

const initialState = () => {
  try {
    const stored = localStorage.getItem('8ball-game-state');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const GameProvider = ({ children }) => {
  const saved = initialState();

  const [players, setPlayers] = useState(saved?.players || []);
  const [breakerIndex, setBreakerIndex] = useState(saved?.breakerIndex || 0);
  const [currentTurn, setCurrentTurn] = useState(saved?.currentTurn || 0);
  const [gameStarted, setGameStarted] = useState(saved?.gameStarted || false);
  const [gameEnded, setGameEnded] = useState(saved?.gameEnded || false);
  const [innings, setInnings] = useState(saved?.innings || []);
  const [currentInning, setCurrentInning] = useState(saved?.currentInning || 0);
  const [gameTimer, setGameTimer] = useState(0);
  const [matchHistory, setMatchHistory] = useState(saved?.matchHistory || []);
  const [turnHistory, setTurnHistory] = useState(saved?.turnHistory || []);

  useEffect(() => {
    const state = {
      players,
      breakerIndex,
      currentTurn,
      gameStarted,
      gameEnded,
      innings,
      currentInning,
      matchHistory,
      turnHistory,
    };
    localStorage.setItem('8ball-game-state', JSON.stringify(state));
  }, [players, breakerIndex, currentTurn, gameStarted, gameEnded, innings, currentInning, matchHistory, turnHistory]);

  const resetGameTimer = () => setGameTimer(0);

  const resetMatch = () => {
    setPlayers([]);
    setBreakerIndex(0);
    setCurrentTurn(0);
    setGameStarted(false);
    setGameEnded(false);
    setInnings([]);
    setCurrentInning(0);
    setTurnHistory([]);
    setGameTimer(0);
    setMatchHistory([]);
    localStorage.removeItem('8ball-game-state');
  };

  return (
    <GameContext.Provider
      value={{
        players,
        setPlayers,
        breakerIndex,
        setBreakerIndex,
        currentTurn,
        setCurrentTurn,
        gameStarted,
        setGameStarted,
        gameEnded,
        setGameEnded,
        innings,
        setInnings,
        currentInning,
        setCurrentInning,
        gameTimer,
        setGameTimer,
        resetGameTimer,
        matchHistory,
        setMatchHistory,
        turnHistory,
        setTurnHistory,
        resetMatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
