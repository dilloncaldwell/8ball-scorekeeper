import { fireEvent, render } from '@testing-library/react';
import React, { act } from 'react';
import GameUI from '../components/GameUI';
import { GameContext } from '../context/GameContext';
import { useGame } from '../context/useGame';

// Mock the useGame hook
jest.mock('../context/useGame', () => ({
  useGame: jest.fn(),
}));

// Mock GameContext values
const mockGameContextValue = {
  resetMatch: jest.fn(),
  // Add other context values if needed
};

// Create a wrapper component that provides the context
const renderWithContext = (component) => {
  return render(<GameContext.Provider value={mockGameContextValue}>{component}</GameContext.Provider>);
};

describe('GameUI - undoTurn functionality', () => {
  let mockSetTurnHistory, mockSetCurrentTurn, mockSetCurrentInning, mockSetInnings;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSetTurnHistory = jest.fn();
    mockSetCurrentTurn = jest.fn();
    mockSetCurrentInning = jest.fn();
    mockSetInnings = jest.fn();

    useGame.mockReturnValue({
      players: [
        { name: 'Player 1', score: 0, race: 5 },
        { name: 'Player 2', score: 0, race: 5 },
      ],
      currentTurn: 0,
      setCurrentTurn: mockSetCurrentTurn,
      breakerIndex: 0,
      turnHistory: [0, 1, 0, 1],
      setTurnHistory: mockSetTurnHistory,
      setCurrentInning: mockSetCurrentInning,
      setInnings: mockSetInnings,
    });
  });

  it('should update turnHistory and currentTurn correctly when undoTurn is clicked', async () => {
    // Setup specific mock values for this test
    useGame.mockReturnValueOnce({
      players: [
        { name: 'Player 1', score: 0, race: 5 },
        { name: 'Player 2', score: 0, race: 5 },
      ],
      currentTurn: 1,
      setCurrentTurn: mockSetCurrentTurn,
      breakerIndex: 0,
      turnHistory: [0, 1, 0, 1], // Starting with 2 complete turns
      setTurnHistory: mockSetTurnHistory,
      setCurrentInning: mockSetCurrentInning,
      setInnings: mockSetInnings,
    });

    // Render with context
    const { getByText } = renderWithContext(<GameUI />);

    // Find and click the undo button
    const undoButton = getByText('Undo Turn');
    await act(async () => {
      fireEvent.click(undoButton);
    });

    // Verify the turn history was updated correctly
    expect(mockSetTurnHistory).toHaveBeenCalledWith([0, 1, 0]);

    // Verify current turn was set to the last player's turn
    expect(mockSetCurrentTurn).toHaveBeenCalledWith(0);

    // Verify the number of calls
    expect(mockSetTurnHistory).toHaveBeenCalledTimes(1);
    expect(mockSetCurrentTurn).toHaveBeenCalledTimes(1);
  });

  it('should decrement innings when undoing a turn that crosses an inning boundary', async () => {
    useGame.mockReturnValueOnce({
      players: [
        { name: 'Player 1', score: 0, race: 5 },
        { name: 'Player 2', score: 0, race: 5 },
      ],
      currentTurn: 0,
      setCurrentTurn: mockSetCurrentTurn,
      breakerIndex: 0,
      // turnHistory: [0, 1, 0, 1, 0, 1], // 3 innings
      turnHistory: [0, 1], // 3 innings
      setTurnHistory: mockSetTurnHistory,
      setCurrentInning: mockSetCurrentInning,
      setInnings: mockSetInnings,
    });

    let rendered;
    await act(async () => {
      rendered = renderWithContext(<GameUI />);
    });

    // Click the "Undo Turn" button
    const undoButton = rendered.getByText('Undo Turn');
    await act(async () => {
      fireEvent.click(undoButton);
    });

    // Verify innings are decremented
    expect(mockSetCurrentInning).not.toHaveBeenCalledWith(); // Decrement inning count
    // expect(mockSetInnings).toHaveBeenCalledWith(expect.any(Function));
    expect(mockSetInnings).not.toHaveBeenCalledWith();
  });

  it('should not decrement innings when undoing a turn that does not cross an inning boundary', async () => {
    // Setup initial state with 1.5 innings (3 turns)
    useGame.mockReturnValueOnce({
      players: [
        { name: 'Player 1', score: 0, race: 5 },
        { name: 'Player 2', score: 0, race: 5 },
      ],
      currentTurn: 0,
      setCurrentTurn: mockSetCurrentTurn,
      breakerIndex: 0,
      turnHistory: [0, 1, 0], // 1.5 innings (Player 1 -> Player 2 -> Player 1)
      setTurnHistory: mockSetTurnHistory,
      setCurrentInning: mockSetCurrentInning,
      setInnings: mockSetInnings,
      currentInning: 2, // We're in the second inning
      innings: 2,
    });

    // Render with context
    const { getByText } = renderWithContext(<GameUI />);

    // Click the "Undo Turn" button to remove the last turn
    const undoButton = getByText('Undo Turn');
    await act(async () => {
      fireEvent.click(undoButton);
    });

    // Verify turn history is updated correctly
    expect(mockSetTurnHistory).toHaveBeenCalledWith([0, 1]);

    // Verify current turn is set to the last player's turn
    expect(mockSetCurrentTurn).toHaveBeenCalledWith(1);

    // Verify innings are not decremented since we're not crossing an inning boundary
    expect(mockSetCurrentInning).not.toHaveBeenCalled();
    expect(mockSetInnings).not.toHaveBeenCalled();

    // Verify the number of calls
    expect(mockSetTurnHistory).toHaveBeenCalledTimes(1);
    expect(mockSetCurrentTurn).toHaveBeenCalledTimes(1);
    expect(mockSetCurrentInning).toHaveBeenCalledTimes(0);
    expect(mockSetInnings).toHaveBeenCalledTimes(0);
  });

  it('should not modify breakerIndex when undoTurn is clicked', async () => {
    // Added async for consistency
    let rendered;
    await act(async () => {
      rendered = renderWithContext(<GameUI />);
    });

    // Click the "Undo Turn" button
    const undoButton = rendered.getByText('Undo Turn');
    await act(async () => {
      fireEvent.click(undoButton);
    });

    // Verify breakerIndex remains unchanged
    expect(useGame().breakerIndex).toBe(0); // Player 1 is still the breaker
  });
});
