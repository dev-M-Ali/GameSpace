import TicTacToe from "./components/games/tictactoe";
import Whack_A_Mole from "./components/games/whack-a-mole";

const games = {
    "whack-a-mole": {
        component: <Whack_A_Mole />
    },

    "tictactoe": {
        component: <TicTacToe />
    }
}

export function getGameComponent(gameName) {
    return games[gameName].component
}

export function getAllGames() {
    const names = []
    for (let i in games)
    {
        names.push(i)
    }

    //console.log(names)

    return names
}

