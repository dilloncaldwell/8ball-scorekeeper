import { useCallback, useEffect, useRef, useState } from 'react';

export const useTimer = (isActive, onTick) => {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    clearTimer();
    setSeconds(0);
    startTimeRef.current = null;
    if (onTick) {
      onTick(0);
    }
  }, [clearTimer, onTick]);

  useEffect(() => {
    if (!isActive) {
      clearTimer();
      return;
    }

    if (!intervalRef.current) {
      // If no start time set, initialize it
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
      }

      intervalRef.current = setInterval(() => {
        const elapsedSeconds = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setSeconds(elapsedSeconds);
        if (onTick) {
          onTick(elapsedSeconds);
        }
      }, 1000);
    }

    return clearTimer;
  }, [isActive, onTick, clearTimer]);

  return [seconds, reset];
};
