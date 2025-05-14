import React, { useContext, useState } from 'react';
import { GameContext } from '../context/GameContext';

const GameEndModal = () => {
  const { players, currentTurn, setCurrentTurn, setPlayers, setBreakerIndex, setGameEnded } = useContext(GameContext);
  const [show, setShow] = useState(false);
  const [result, setResult] = useState('win');

  const endGame = () => {
    setShow(true);
  };

  const confirmResult = () => {
    const newPlayers = [...players];
    if (result === 'win') newPlayers[currentTurn].score++;
    setPlayers(newPlayers);
    setBreakerIndex(currentTurn); // Winner breaks next
    setCurrentTurn(currentTurn === 0 ? 1 : 0); // alternate turn
    setShow(false);
    if (newPlayers[currentTurn].score >= newPlayers[currentTurn].race) {
      setGameEnded(true);
    }
  };

  return (
    <div className="mb-4">
      <button onClick={endGame} className="bg-red-600 text-white p-2 rounded">
        End Game
      </button>
      {show && (
        <div className="bg-white border p-4 mt-2">
          <h3>Game Result</h3>
          <select onChange={(e) => setResult(e.target.value)} className="border p-2 w-full">
            <option value="win">Player Wins</option>
            <option value="loss">Player Loses</option>
          </select>
          <button onClick={confirmResult} className="bg-green-600 text-white p-2 rounded mt-2">
            Confirm
          </button>
        </div>
      )}
    </div>
  );
};

export default GameEndModal;
