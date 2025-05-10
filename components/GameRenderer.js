import { getGameComponent } from "@/gamesList";
import axios from "axios";
import { useEffect, useState } from "react";

export default function GameRenderer({ game }) {
    const [scoreObject, setScoreObject] = useState({})

    if (!game)
    {
        return (
            <div className="text-white text-center text-xl mt-20">
                Could not find the required resource!
            </div>
        );
    }

    useEffect(() => {

        //console.log("GameRenderer -> scoreObject is ")
        //console.log(scoreObject)

        if (!(Object.keys(scoreObject).length === 0))
        {
            //MISSING: Currently using dummy email
            const userEmail = "user@gmail.com"

            axios.post("/api/" + game + "/scores", { _id: userEmail, ...scoreObject })
                .then((response) => console.log("Scores sent to API! Response: " + response))
                .catch((error) => console.log(error))
        }

    }, [scoreObject])

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-[95vw] h-[90vh] sm:h-[85vh] md:h-[80vh] p-4 sm:p-6 md:p-8 border border-[#C26DFC]/20 flex">

                <div className="w-full h-full">{getGameComponent(game, { setScoreObject })}</div>

            </div>
        </div>
    );
}
