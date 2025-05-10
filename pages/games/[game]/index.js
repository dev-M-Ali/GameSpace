import GameRenderer from "@/components/GameRenderer"
import CommentsSection from "@/components/CommentsSection"
import { getAllGames } from "@/gamesList";

export default function GamePage({ gameName }) {
    return (
        <div className="container mx-auto px-4 py-8">
            <GameRenderer game={gameName} />

            <div className="flex items-center justify-center my-10">
                <div className="flex-1 border-t-4 border-[#000000] mx-6"></div>
                <span className="px-6 py-3 text-xl font-semibold text-[#000000] bg-white/95 rounded-full shadow-md hover:bg-[#F67385]/10 hover:text-[#C26DFC] transition-colors">
                    Comments
                </span>
                <div className="flex-1 border-t-4 border-[#000000] mx-6"></div>
            </div>

            <CommentsSection game={gameName} />
        </div>
    );
}

export async function getStaticProps(context) {
    return {
        props: {
            gameName: context.params.game,
            revalidate: 300
        }
    }
}

export async function getStaticPaths() {
    const games = getAllGames()

    const paths = games.map(name => {
        return { params: { game: name } }
    })

    return {
        paths,
        fallback: false
    }
}