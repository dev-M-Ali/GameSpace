import Game from "./game_logic/Game";


const TicTacToe =()=>{
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
          <h1 className="text-4xl font-bold mb-6">Tic-Tac-Toe</h1>
          <Game />
        </div>
      );
}

export default TicTacToe