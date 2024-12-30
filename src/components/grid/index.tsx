"use client";

import { useMineSweeperContext } from "../../context/minesweeper";
import Cell from "../cell";

const Board = () => {
  const { grid, revealCell, flagCell } = useMineSweeperContext();

  return (
    <div className="grid grid-cols-[repeat(10,64px)] gap-1">
      {grid.map((row, rowIndex) =>
        row.map((cell, columnIndex) => (
          <Cell
            key={`${rowIndex}-${columnIndex}`}
            cell={cell}
            onReveal={() => revealCell(rowIndex, columnIndex)}
            onFlag={() => flagCell(rowIndex, columnIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Board;
