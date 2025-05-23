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
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [totalMatchTime, setTotalMatchTime] = useState(0);
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
      gameTimer,
      matchHistory,
      turnHistory,
    };
    localStorage.setItem('8ball-game-state', JSON.stringify(state));
  }, [players, breakerIndex, currentTurn, gameStarted, gameEnded, innings, currentInning, gameTimer, matchHistory, turnHistory]);

  const startGameTimer = () => setIsTimerRunning(true);

  const resetGameTimer = () => {
    setGameTimer(0);
    setIsTimerRunning(false);
  };

  const resetGame = () => {
    resetGameTimer();
    setCurrentTurn(0); // Always let breaker go first
    setInnings([]);
    setCurrentInning(0);
    setTurnHistory([]);
    startGameTimer();
    // setGameTimer(0);
  };

  const pauseGameTimer = () => {
    setIsTimerRunning(false); // Ensure the timer stops
  };

  const resetMatch = () => {
    setPlayers([]);
    setBreakerIndex(0);
    setCurrentTurn(0);
    setGameStarted(false);
    setGameEnded(false);
    setInnings([]);
    setCurrentInning(0);
    setTurnHistory([]);
    setTotalMatchTime(0);
    setIsTimerRunning(false);
    setGameTimer(0);
    resetGameTimer();
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
        isTimerRunning,
        startGameTimer,
        pauseGameTimer,
        resetGameTimer,
        totalMatchTime,
        setTotalMatchTime,
        matchHistory,
        setMatchHistory,
        turnHistory,
        setTurnHistory,
        resetMatch,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
