import { getGameComponent } from "@/gamesList";

export default function GameRenderer({ game }) {
    if (!game)
    {
        return (
            <div className="text-white text-center text-xl mt-20">
                Could not find the required resource!
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl w-full max-w-[95vw] h-[90vh] sm:h-[85vh] md:h-[80vh] p-4 sm:p-6 md:p-8 border border-[#C26DFC]/20 flex">
                <div className="w-full h-full">{getGameComponent(game)}</div>
            </div>
        </div>
    );
}
