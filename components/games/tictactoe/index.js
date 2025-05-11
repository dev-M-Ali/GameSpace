import Game from "./game_logic/Game";

const TicTacToe = ({ setScoreObject }) => {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6 drop-shadow-md">
        Tic-Tac-Toe
      </h1>
      <Game setScoreObject={setScoreObject} />
    </div>
  );
};

export default TicTacToe;