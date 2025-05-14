// import React from 'react';
// import GameEndModal from './components/GameEndModal';
// import GameSetupForm from './components/GameSetupForm';
// import InningTracker from './components/InningTracker';
// import PlayerTimer from './components/PlayerTimer';
// import ScoreBoard from './components/ScoreBoard';
// import TurnSwitcher from './components/TurnSwitcher';
// import WinnerDisplay from './components/WinnerDisplay';
// import { GameProvider } from './context/GameContext';

// const App = () => {
//   return (
//     <GameProvider>
//       <div className="app p-4 max-w-3xl mx-auto">
//         <GameSetupForm />
//         <ScoreBoard />
//         <TurnSwitcher />
//         <PlayerTimer />
//         <InningTracker />
//         <GameEndModal />
//         <WinnerDisplay />
//       </div>
//     </GameProvider>
//   );
// };

// export default App;

import React from 'react';
import './App.css';
import GameUI from './components/GameUI';
import MatchSetupForm from './components/MatchSetupForm';
import { useGame } from './context/useGame';

const App = () => {
  const { gameStarted } = useGame();

  return <div className="app-container">{!gameStarted ? <MatchSetupForm /> : <GameUI />}</div>;
};

export default App;
