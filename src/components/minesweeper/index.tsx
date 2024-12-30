import { MineSweeperContextProvider } from "../../context/minesweeper";
import Board from "../grid";

const MineSweeper = () => {
  return (
    <MineSweeperContextProvider>
      <div className="container mx-auto p-5">
        <h1 className="text-2xl font-bold my-8">Minesweeper</h1>
        <Board />
      </div>
    </MineSweeperContextProvider>
  );
};

export default MineSweeper;
