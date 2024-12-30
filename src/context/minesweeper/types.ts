export interface Cell {
  isRevealed: boolean;
  isBomb: boolean;
  isFlagged: boolean;
  adjacentBombs: number;
}

export interface MineSweeperContextType {
  grid: Cell[][];
  revealCell: (row: number, column: number) => void;
  flagCell: (row: number, column: number) => void;
  resetGame: () => void;
}

export enum GameStatus {
  PLAYING,
  WON,
  LOST,
}
