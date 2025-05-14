import React, { useContext, useState } from 'react';
import { GameContext } from '../context/GameContext';

const GameSetupForm = () => {
  const { setPlayers, setBreakerIndex, setGameStarted } = useContext(GameContext);
  const [formState, setFormState] = useState({
    player1: '',
    race1: 5,
    player2: '',
    race2: 5,
    breaker: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const startGame = () => {
    setPlayers([
      { name: formState.player1, race: Number(formState.race1), score: 0 },
      { name: formState.player2, race: Number(formState.race2), score: 0 },
    ]);
    setBreakerIndex(Number(formState.breaker));
    setGameStarted(true);
  };

  return (
    <div className="mb-4 space-y-2">
      <input name="player1" placeholder="Player 1 Name" onChange={handleChange} className="border p-2 w-full" />
      <input name="race1" placeholder="Race to (P1)" type="number" onChange={handleChange} className="border p-2 w-full" />
      <input name="player2" placeholder="Player 2 Name" onChange={handleChange} className="border p-2 w-full" />
      <input name="race2" placeholder="Race to (P2)" type="number" onChange={handleChange} className="border p-2 w-full" />
      <select name="breaker" onChange={handleChange} className="border p-2 w-full">
        <option value={0}>Player 1 Breaks First</option>
        <option value={1}>Player 2 Breaks First</option>
      </select>
      <button onClick={startGame} className="bg-blue-500 text-white p-2 rounded">
        Start Game
      </button>
    </div>
  );
};

export default GameSetupForm;
