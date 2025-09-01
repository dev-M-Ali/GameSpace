import Link from 'next/link';

export default function GameRecommendations() {
  const recommendations = [
    {
      game: "1024",
      icon: "🔢",
      reason: "Based on your enjoyment of puzzle games",
      background: "from-amber-500 to-orange-600",
      difficulty: "Medium"
    },
    {
      game: "Memory Match",
      icon: "🎴",
      reason: "Trending among players like you",
      background: "from-pink-500 to-rose-600",
      difficulty: "Easy"
    },
    {
      game: "Snake",
      icon: "🐍",
      reason: "You haven't played in a while",
      background: "from-emerald-500 to-green-600",
      difficulty: "Hard"
    }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/15 overflow-hidden mb-8">
      <div className="px-4 py-3 border-b border-white/10">
        <h2 className="text-xl font-bold text-white">Recommended Games</h2>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recommendations.map((rec, index) => (
            <Link
              href={`/games/${rec.game.toLowerCase().replace(/\s+/g, '-')}`}
              key={index}
              className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-colors border border-white/10 hover:border-[#C26DFC]/30 group"
            >
              <div className={`h-24 bg-gradient-to-br ${rec.background} flex items-center justify-center`}>
                <span className="text-6xl">{rec.icon}</span>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white font-semibold group-hover:text-[#F67385] transition-colors">
                    {rec.game}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${rec.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                    rec.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                    {rec.difficulty}
                  </span>
                </div>

                <p className="text-white/70 text-sm">{rec.reason}</p>

                <div className="mt-3 text-right">
                  <span className="text-[#C26DFC] group-hover:text-[#F67385] text-sm font-medium transition-colors inline-flex items-center">
                    Play Now
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 