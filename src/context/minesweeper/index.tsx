//prettier-ignore
"use client"

import React, { createContext, useContext, useState } from "react";
import type { ReactNode, FC } from "react";
import { Cell, MineSweeperContextType } from "./types";

const MineSweeperContext = createContext<MineSweeperContextType | undefined>(
  undefined
);

const generateGrid = (size: number, bombs: number): Cell[][] => {
  const grid: Cell[][] = Array.from({ length: size }, () =>
    Array.from({ length: size }, () => ({
      isRevealed: false,
      isBomb: false,
      isFlagged: false,
      adjacentBombs: 0,
    }))
  );

  let placedBombs = 0;

  while (placedBombs < bombs) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);

    if (!grid[x][y].isBomb) {
      grid[x][y].isBomb = true;
      placedBombs++;
    }

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          continue;
        }

        const x2 = x + i;
        const y2 = y + j;

        if (x2 >= 0 && x2 < size && y2 >= 0 && y2 < size) {
          grid[x2][y2].adjacentBombs++;
        }
      }
    }
  }

  return grid;
};

const MineSweeperContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [grid, setGrid] = useState<Cell[][]>(generateGrid(10, 15));

  const revealCell = (row: number, column: number, delay: number = 0) => {
    if (grid[row][column].isRevealed || grid[row][column].isFlagged) {
      return;
    }

    const newGrid = [...grid];
    newGrid[row][column].isRevealed = true;

    setTimeout(() => {
      setGrid(newGrid);
      if (
        newGrid[row][column].adjacentBombs === 0 &&
        !newGrid[row][column].isBomb
      ) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            const x = row + i;
            const y = column + j;

            if (x >= 0 && x < newGrid.length && y >= 0 && y < newGrid.length) {
              revealCell(x, y, delay + 10);
            }
          }
        }
      }
    }, delay);
  };

  const flagCell = (row: number, column: number) => {
    const newGrid = [...grid];
    newGrid[row][column].isFlagged = !newGrid[row][column].isFlagged;
    setGrid(newGrid);
  };

  const resetGame = () => setGrid(generateGrid(10, 15));

  return (
    <MineSweeperContext.Provider
      value={{
        grid,
        revealCell,
        flagCell,
        resetGame,
      }}
    >
      {children}
    </MineSweeperContext.Provider>
  );
};

const useMineSweeperContext = () => {
  const context = useContext(MineSweeperContext);
  if (!context) {
    throw new Error(
      "useMineSweeperContext must be used within a MineSweeperContextProvider"
    );
  }
  return context;
};

export { MineSweeperContextProvider, useMineSweeperContext };
