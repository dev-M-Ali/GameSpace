import { useEffect, useState } from 'react'
import styles from './whack-a-mole.module.css'

//Important: In development mode, score will be shown as doubled due to strict mode. Works fine otherwise.

//In our array,
//  0 shall indicate empty space
//  1 shall indicate a mole-emerging space
//  2 shall indicate a mole-going-underground space
// -1 shall indicate that the user has clicked this mole

function initializeArray(rows, cols) {
    const arr = []
    for (let i = 0; i < rows; i++)
    {
        arr.push([])
        for (let j = 0; j < cols; j++)
        {
            arr[i].push(0)
        }
    }

    return arr
}

// function initializeAsLinearArray(rows, cols) {
//     const arr = []
//     for (let i = 1; i <= rows * cols; i++)
//     {
//         arr.push(0)
//     }

//     return arr
// }

export default function Whack_A_Mole(props) {
    const r = props.rows ? Number(props.rows) : 3
    const c = props.cols ? Number(props.cols) : 4

    const arr = initializeArray(r, c)
    // const arr = initializeAsLinearArray(r, c)

    const [arrState, setArr] = useState(arr)
    const [scoreState, setScore] = useState(0)
    const [gameOverState, setGameOverState] = useState(false)

    const gameDurationInSeconds = 30
    const spawnIntervalInSeconds = 1
    const transitionDownDurationInSeconds = 2      //Imp: Make sure that in test.module.css, in the mole CSS class, the transition duration is the same

    function handleUserClick(rowNum, colNum) {
        setArr((prevState) => {
            if (prevState[rowNum][colNum] === 1 || prevState[rowNum][colNum] === 2)
            {
                const tempArr = [...prevState]
                const newArr = tempArr.map((row) => {
                    return [...row]
                })

                newArr[rowNum][colNum] = -1

                //Increasing score
                console.log("Increasing score")
                setScore((prevScore) => prevScore + 1)

                return newArr
            }

            return prevState
        })
    }

    useEffect(() => {
        let gameLoop = setInterval(() => {
            //console.log("HI!")

            const n = Math.floor(Math.random() * ((r * c) + 1) * 0.6)

            //console.log("n is ", n)

            setArr((prevState) => {
                const tempArr = [...prevState]
                const newArr = tempArr.map((row) => {
                    return [...row]
                })

                for (let iter = 0; iter < n; iter++)
                {
                    const i = Math.floor(Math.random() * r)
                    const j = Math.floor(Math.random() * c)

                    //console.log("Index  " + i + " " + j + " has value " + newArr[i][j])
                    if (newArr[i][j] === 0)
                    {
                        //console.log("Modifying index  " + i + " " + j + " value to 1")

                        newArr[i][j] = 1
                    }
                    else if (newArr[i][j] === 1)
                    {
                        //console.log("Modifying index  " + i + " " + j + " value to 2")

                        newArr[i][j] = 2

                        //Make sure that once the mole is underground, we make its corresponding index value = 0
                        setTimeout(() => {
                            setArr((prevState) => {
                                const temp = [...prevState]
                                const copyArr = temp.map((row) => {
                                    return [...row]
                                })

                                //console.log("Modifying index  " + i + " " + j + " value to 0")
                                copyArr[i][j] = 0

                                return copyArr
                            })
                        }, transitionDownDurationInSeconds * 1000)
                    }
                }

                return newArr
            })

        }, spawnIntervalInSeconds * 1000)

        setTimeout(() => {
            setGameOverState(true)
            clearInterval(gameLoop)

            const tempArr = initializeArray(r, c)
            setArr(tempArr)

            console.log("Game over!")
        }, gameDurationInSeconds * 1000)

    }, [])

    return (
        <div style={{ height: "100%", width: "100%" }}>
            {gameOverState ? (
                <h1 className={styles.scoreDisplay}>
                    🎯 Final Score: <span className={styles.scoreNumber}>{scoreState}</span>
                </h1>
            ) : (
                <div
                    style={{
                        display: "grid",
                        gridTemplateRows: `repeat(${r}, 1fr)`,
                        gridTemplateColumns: `repeat(${c}, 1fr)`,
                        gap: "10px",
                        width: "100%",
                        height: "100%",
                        boxSizing: "border-box",
                        padding: "10px",
                        overflow: "hidden", // Prevent grid content from overflowing
                    }}
                >
                    {arrState.map((row, rowNum) => {
                        return row.map((val, colNum) => {
                            return (
                                <div style={{ overflow: "hidden" }} className={styles["mole-container"]}>
                                    <div
                                        className={`${styles["mole"]} ${val === 1 && styles["mole--up"]}`}
                                        onClick={() => handleUserClick(rowNum, colNum)}
                                    >
                                        <img
                                            src={val === -1 ? "/images/Monty_Mole_Sad.png" : "/images/Monty_Mole.png"}
                                            alt="Image of a Mole"
                                        />
                                    </div>
                                </div>
                            );
                        });
                    })}
                </div>
            )}
        </div>
    );
}
