import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllGames } from "@/gamesList";

// Game cards data with descriptions and images
const gameInfo = {
  "tictactoe": {
    title: "Tic Tac Toe",
    description: "The classic game of X's and O's. Challenge your strategic thinking in this timeless battle of wits.",
    image: "/images/tictactoe-preview.jpg", 
    color: "from-blue-500 to-purple-600",
    icon: "✕⭘"
  },
  "whack-a-mole": {
    title: "Whack-a-Mole",
    description: "Test your reflexes! Tap the moles as they pop up to score points in this fast-paced arcade game.",
    image: "/images/whack-a-mole-preview.jpg",
    color: "from-green-500 to-teal-600",
    icon: "🐹"
  },
  "snake": {
    title: "Snake",
    description: "Guide your snake to eat food and grow longer, but avoid running into walls or yourself!",
    image: "/images/snake-preview.jpg",
    color: "from-emerald-500 to-green-600",
    icon: "🐍"
  },
  "memory-match": {
    title: "Memory Match",
    description: "Find matching pairs of cards in this classic memory challenge. How quickly can you clear the board?",
    image: "/images/memory-match-preview.jpg",
    color: "from-pink-500 to-rose-600",
    icon: "🎴"
  },
  "1024": {
    title: "1024",
    description: "Combine numbered tiles to reach 1024! A challenging puzzle game that tests your strategic planning.",
    image: "/images/1024-preview.jpg",
    color: "from-amber-500 to-orange-600",
    icon: "🔢"
  }
};

export default function Home() {
  const [games, setGames] = useState([]);
  
  useEffect(() => {
    // Get all available games
    const availableGames = getAllGames();
    setGames(availableGames);
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-10">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#C26DFC]/40 to-[#F67385]/40 blur-3xl transform -translate-y-1/4"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Welcome to <span className="relative px-2 py-1 rounded">
                <span className="absolute inset-0 bg-gradient-to-r from-[#F67385] to-[#C26DFC] opacity-90 rounded blur-sm"></span>
                <span className="relative text-white font-extrabold">GameSpace</span>
              </span>
            </h1>
            <p className="text-xl text-white/90 mb-8 drop-shadow-md">
              Your ultimate collection of fun browser games! Challenge yourself, beat your high scores, and have a blast!
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/games/tictactoe" 
                className="bg-[#F67385] hover:bg-[#C26DFC] text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Play Now
              </Link>
              <Link 
                href="#games" 
                className="bg-white/15 backdrop-blur-sm hover:bg-white/25 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 shadow-lg border border-white/40"
              >
                Explore Games
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Games Showcase */}
      <section id="games" className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Choose Your <span className="text-[#F67385]">Game</span>
          </h2>
          
          {/* Improved grid layout for better balance with 5 games */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
            {games.map((game) => (
              <Link 
                href={`/games/${game}`} 
                key={game}
                className="group bg-white/8 backdrop-blur-md rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-white/15 hover:border-[#C26DFC]/50"
              >
                <div className={`h-40 flex items-center justify-center bg-gradient-to-br ${gameInfo[game]?.color || "from-purple-500 to-pink-600"}`}>
                  <span className="text-6xl drop-shadow-md">{gameInfo[game]?.icon || "🎮"}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#F67385] transition-colors">
                    {gameInfo[game]?.title || game}
                  </h3>
                  <p className="text-white/80 mb-4 text-sm md:text-base">
                    {gameInfo[game]?.description || "Challenge yourself with this exciting game!"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/50">
                      {/* You could add categories or tags here */}
                    </span>
                    <button className="bg-[#F67385] hover:bg-[#C26DFC] text-white py-2 px-6 rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center">
                      <span>Play</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Game - Highlight Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-[#2D1A50]/70 to-[#1A0E2D]/70 backdrop-blur-lg rounded-2xl overflow-hidden border border-[#C26DFC]/30">
            <div className="grid md:grid-cols-2 items-center">
              <div className="p-8 md:p-12">
                <h2 className="text-3xl font-bold text-white mb-4">Featured Game: <span className="text-[#F67385]">Whack-a-Mole</span></h2>
                <p className="text-white/80 mb-6 text-lg">
                  Test your reflexes in our popular Whack-a-Mole game! Tap those moles as quickly as you can to rack up points. Can you beat the high score?
                </p>
                <Link 
                  href="/games/whack-a-mole" 
                  className="inline-flex items-center bg-[#F67385] hover:bg-[#C26DFC] text-white font-bold py-3 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-1"
                >
                  <span>Play Whack-a-Mole</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
              <div className="h-80 flex items-center justify-center bg-gradient-to-br from-green-500/70 to-teal-600/70 p-6">
                <div className="text-center relative">
                  <div className="absolute -top-12 left-0 right-0 flex justify-center">
                    <span className="text-8xl animate-bounce">🐹</span>
                  </div>
                  <div className="mt-16 grid grid-cols-3 gap-4">
                    <div className="bg-brown-500 h-12 w-12 rounded-full flex items-center justify-center relative overflow-hidden border-2 border-brown-700">
                      <div className="absolute bottom-0 w-full h-1/2 bg-green-800"></div>
                    </div>
                    <div className="bg-brown-500 h-12 w-12 rounded-full flex items-center justify-center relative overflow-hidden border-2 border-brown-700">
                      <div className="absolute bottom-0 w-full h-1/2 bg-green-800"></div>
                    </div>
                    <div className="bg-brown-500 h-12 w-12 rounded-full flex items-center justify-center relative overflow-hidden border-2 border-brown-700">
                      <div className="absolute bottom-0 w-full h-1/2 bg-green-800"></div>
                    </div>
                    <div className="bg-brown-500 h-12 w-12 rounded-full flex items-center justify-center relative overflow-hidden border-2 border-brown-700">
                      <div className="absolute bottom-0 w-full h-1/2 bg-green-800"></div>
                    </div>
                    <div className="bg-brown-500 h-12 w-12 rounded-full flex items-center justify-center relative overflow-hidden border-2 border-brown-700">
                      <div className="absolute bottom-0 w-full h-1/2 bg-green-800"></div>
                      <span className="absolute -top-5 text-3xl animate-bounce">🐹</span>
                    </div>
                    <div className="bg-brown-500 h-12 w-12 rounded-full flex items-center justify-center relative overflow-hidden border-2 border-brown-700">
                      <div className="absolute bottom-0 w-full h-1/2 bg-green-800"></div>
                    </div>
                    <div className="bg-brown-500 h-12 w-12 rounded-full flex items-center justify-center relative overflow-hidden border-2 border-brown-700">
                      <div className="absolute bottom-0 w-full h-1/2 bg-green-800"></div>
                    </div>
                    <div className="bg-brown-500 h-12 w-12 rounded-full flex items-center justify-center relative overflow-hidden border-2 border-brown-700">
                      <div className="absolute bottom-0 w-full h-1/2 bg-green-800"></div>
                    </div>
                    <div className="bg-brown-500 h-12 w-12 rounded-full flex items-center justify-center relative overflow-hidden border-2 border-brown-700">
                      <div className="absolute bottom-0 w-full h-1/2 bg-green-800"></div>
                    </div>
                  </div>
                  <div className="mt-4 text-white font-bold text-xl">Score: 42</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-black/0 to-black/30">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
            Why Play on <span className="relative px-2 py-1 rounded">
              <span className="absolute inset-0 bg-[#C26DFC] opacity-80 rounded blur-sm"></span>
              <span className="relative text-white font-extrabold">GameSpace</span>
            </span>?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/8 backdrop-blur-md p-8 rounded-xl border border-white/15 hover:border-[#F67385]/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 rounded-full bg-[#F67385]/20 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#F67385]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Fast & Smooth</h3>
              <p className="text-white/80">
                Enjoy seamless gameplay with our optimized game engine. No lag, just pure fun!
              </p>
            </div>
            
            <div className="bg-white/8 backdrop-blur-md p-8 rounded-xl border border-white/15 hover:border-[#C26DFC]/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 rounded-full bg-[#C26DFC]/20 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#C26DFC]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Save Your Progress</h3>
              <p className="text-white/80">
                Create an account to save your high scores and track your improvement over time.
              </p>
            </div>
            
            <div className="bg-white/8 backdrop-blur-md p-8 rounded-xl border border-white/15 hover:border-[#8F8DFB]/30 transition-all duration-300 hover:transform hover:scale-105">
              <div className="w-14 h-14 rounded-full bg-[#8F8DFB]/20 flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-[#8F8DFB]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Community</h3>
              <p className="text-white/80">
                Share your experiences and strategies with other players through our comments section.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-[#F67385] to-[#C26DFC] rounded-2xl p-10 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-10"></div>
            <div className="relative z-10 text-center">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-md">
                Ready to Play?
              </h2>
              <p className="text-white mb-8 text-lg max-w-2xl mx-auto">
                Jump into the fun right now and challenge yourself with our collection of games!
              </p>
              <Link 
                href="/games/tictactoe" 
                className="bg-white text-[#C26DFC] font-bold py-3 px-8 rounded-full transition-all duration-300 hover:bg-white/90 hover:shadow-xl transform hover:-translate-y-1 inline-block"
              >
                Start Playing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
