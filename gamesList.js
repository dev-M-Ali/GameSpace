import TicTacToe from "./components/games/tictactoe";
import Whack_A_Mole from "./components/games/whack-a-mole";
import Snake from "./components/games/snake";
import MemoryMatch from "./components/games/memory-match";
import Game1024 from "./components/games/1024";

const games = {
    "whack-a-mole": {
        component: Whack_A_Mole
    },

    "tictactoe": {
        component: TicTacToe
    },

    "snake": {
        component: Snake
    },

    "memory-match": {
        component: MemoryMatch
    },

    "1024": {
        component: Game1024
    }
}

export function getGameComponent(gameName, props) {
    const GameComponentRef = games[gameName].component

    return <GameComponentRef {...props} />
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

