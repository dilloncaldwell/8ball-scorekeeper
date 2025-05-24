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
  const [gameTimer, setGameTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [totalMatchTime, setTotalMatchTime] = useState(0);
  const [matchHistory, setMatchHistory] = useState(saved?.matchHistory || []);
  const [turnHistory, setTurnHistory] = useState(saved?.turnHistory || []);

  const startGameTimer = useCallback(() => {
    if (!isTimerRunning) {
      // console.log('startGameTimer called');
      setIsTimerRunning(true);
      // Clear any existing interval before starting a new one
      if (intervalId) {
        clearInterval(intervalId);
      }
      const id = setInterval(() => {
        setGameTimer((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    }
  }, [isTimerRunning, intervalId]);

  const pauseGameTimer = () => {
    if (isTimerRunning) {
      // console.log('pauseGameTimer called');
      setIsTimerRunning(false);
      if (intervalId) {
        clearInterval(intervalId);
        setIntervalId(null);
      }
    }
  };

  const resetGameTimer = () => {
    pauseGameTimer();
    setGameTimer(0);
  };

  useEffect(() => {
    return () => {
      // Cleanup interval on unmount
      if (intervalId) {
        // console.log('Cleaning up interval on unmount');
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

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

  const resetGame = () => {
    setCurrentTurn(0);
    setInnings([]);
    setCurrentInning(0);
    setTurnHistory([]);
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
