import React, { useState } from 'react';
import { useGame } from '../context/useGame';

const MatchSetupForm = () => {
  const { setPlayers, setBreakerIndex, setGameStarted } = useGame();
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [race1, setRace1] = useState(5);
  const [race2, setRace2] = useState(5);
  const [breaker, setBreaker] = useState(0);

  const startMatch = () => {
    setPlayers([
      { name: player1.trim(), race: parseInt(race1, 10), score: 0 },
      { name: player2.trim(), race: parseInt(race2, 10), score: 0 },
    ]);
    setBreakerIndex(breaker);
    setGameStarted(true);
  };

  const isFormValid = player1.trim() && player2.trim();

  return (
    <div>
      <h2>8 Ball Score Keeper</h2>
      <div className="players-form">
        <div className="p1-form">
          <div>
            <label>Player 1 Name:</label>
            <input placeholder="Player 1 Name" value={player1} onChange={(e) => setPlayer1(e.target.value)} />
          </div>
          <div>
            <label>Race:</label>
            <input type="number" placeholder="Race" value={race1} onChange={(e) => setRace1(e.target.value)} />
          </div>
        </div>
        <div className="p2-form">
          <div>
            <label>Player 2 Name:</label>
            <input placeholder="Player 2 Name" value={player2} onChange={(e) => setPlayer2(e.target.value)} />
          </div>
          <div>
            <label>Race:</label>
            <input type="number" placeholder="Race" value={race2} onChange={(e) => setRace2(e.target.value)} />
          </div>
        </div>
      </div>
      <div className="who-breaks">
        <label>Who breaks first?</label>
        <select value={breaker} onChange={(e) => setBreaker(parseInt(e.target.value, 10))}>
          <option value={0}>{player1.trim() || 'Player 1'}</option>
          <option value={1}>{player2.trim() || 'Player 2'}</option>
        </select>
      </div>
      <div className="btn-wrapper">
        <button onClick={startMatch} disabled={!isFormValid}>
          Start Match
        </button>
      </div>
    </div>
  );
};

export default MatchSetupForm;
