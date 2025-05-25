import React, { useCallback, useEffect, useState } from 'react';
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
  const [gameTimer, setGameTimer] = useState(saved?.gameTimer || 0);
  const [isTimerRunning, setIsTimerRunning] = useState(saved?.isTimerRunning || false);
  const [totalMatchTime, setTotalMatchTime] = useState(0);
  const [matchHistory, setMatchHistory] = useState(saved?.matchHistory || []);
  const [turnHistory, setTurnHistory] = useState(saved?.turnHistory || []);

  const startGameTimer = useCallback(() => {
    setIsTimerRunning(true);
  }, []);

  const pauseGameTimer = useCallback(() => {
    setIsTimerRunning(false);
  }, []);

  const resetGameTimer = useCallback(() => {
    setIsTimerRunning(false);
    setGameTimer(0);
  }, []);

  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setGameTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerRunning]);

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
      gameTimer,
      isTimerRunning,
    };
    localStorage.setItem('8ball-game-state', JSON.stringify(state));
  }, [players, breakerIndex, currentTurn, gameStarted, gameEnded, innings, currentInning, matchHistory, turnHistory, gameTimer, isTimerRunning]);

  const resetGame = () => {
    setCurrentTurn(0);
    setInnings([]);
    setCurrentInning(0);
    setTurnHistory([]);
    setGameTimer(0);
    setIsTimerRunning(false);
    localStorage.removeItem('8ball-game-state');
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
