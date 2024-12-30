import type { Cell as CellType } from "../../context/minesweeper/types";

interface CellProps {
  cell: CellType;
  onReveal: () => void;
  onFlag: () => void;
}

const Cell: React.FC<CellProps> = ({ cell, onReveal, onFlag }) => {
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onFlag();
  };

  return (
    <div
      className={`w-16 h-16 border border-gray-500 flex items-center justify-center text-sm cursor-pointer ${
        cell.isRevealed ? "bg-gray-300" : "bg-gray-700"
      } ${cell.isBomb && cell.isRevealed ? "bg-red-500" : ""} ${
        cell.isRevealed ? "reveal" : ""
      }`}
      onClick={onReveal}
      onContextMenu={handleRightClick}
    >
      {cell.isRevealed && cell.isBomb && "💣"}
      {cell.isRevealed &&
        !cell.isBomb &&
        cell.adjacentBombs > 0 &&
        cell.adjacentBombs}
      {!cell.isRevealed && cell.isFlagged && "🚩"}
    </div>
  );
};

export default Cell;