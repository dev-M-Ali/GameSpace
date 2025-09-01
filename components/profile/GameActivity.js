import Link from 'next/link';
import { useState } from 'react';

export default function GameActivity({ scores = [] }) {
  const [activeTab, setActiveTab] = useState('recent');

  const gameScores = scores.length > 0 ? scores : [];

  const gameIcons = {
    "Snake": "🐍",
    "Whack-a-Mole": "🐹",
    "Memory Match": "🎴",
    "Tic Tac Toe": "✕⭘",
    "1024": "🔢"
  };

  const getGameColorClass = (game) => {
    const colorMap = {
      "Snake": "from-emerald-500 to-green-600",
      "Whack-a-Mole": "from-green-500 to-teal-600",
      "Memory Match": "from-pink-500 to-rose-600",
      "Tic Tac Toe": "from-blue-500 to-purple-600",
      "1024": "from-amber-500 to-orange-600"
    };

    return colorMap[game] || "from-purple-500 to-pink-600";
  };

  const calculateStats = () => {
    const gamePlayCounts = {};
    let totalTime = 0;

    gameScores.forEach(score => {
      gamePlayCounts[score.game] = (gamePlayCounts[score.game] || 0) + 1;
      totalTime += score.game === "Whack-a-Mole" ? 25 :
        score.game === "Memory Match" ? 2 * score.score / 10 :
          score.game === "Snake" ? score.score / 10 :
            score.game === "1024" ? score.score / 20 : 5;
    });

    const totalGames = gameScores.length;

    return {
      totalTimePlayed: (totalTime / 60).toFixed(1), // hours
      gamesCompleted: totalGames,
      gamePlayCounts,
      totalScore: gameScores.reduce((sum, score) => sum + score.score, 0)
    };
  };

  const stats = calculateStats();

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/15 overflow-hidden mb-8">
      <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Game Activity</h2>

        <div className="flex rounded-lg bg-white/5 p-0.5">
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'recent' ? 'bg-[#C26DFC] text-white' : 'text-white/70 hover:text-white'}`}
            onClick={() => setActiveTab('recent')}
          >
            Recent
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'best' ? 'bg-[#C26DFC] text-white' : 'text-white/70 hover:text-white'}`}
            onClick={() => setActiveTab('best')}
          >
            Best Scores
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'stats' ? 'bg-[#C26DFC] text-white' : 'text-white/70 hover:text-white'}`}
            onClick={() => setActiveTab('stats')}
          >
            Statistics
          </button>
        </div>
      </div>

      {activeTab === 'recent' && (
        <div className="p-4">
          {gameScores.length > 0 ? (
            <div className="space-y-4">
              {gameScores.slice(0, 5).map((score, index) => (
                <div key={index} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getGameColorClass(score.game)} flex items-center justify-center text-2xl`}>
                    {gameIcons[score.game] || "🎮"}
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <div className="text-white font-semibold">{score.game}</div>
                      <div className="text-white/60 text-sm">{score.date}</div>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="text-white/90">Score: <span className="font-bold">{score.score}</span></div>
                    </div>
                  </div>

                  <Link
                    href={`/games/${score.game.toLowerCase().replace(/\s+/g, '-')}`}
                    className="shrink-0 bg-[#F67385]/80 hover:bg-[#F67385] text-white text-sm py-1.5 px-3 rounded-lg transition-colors"
                  >
                    Play Again
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-8 text-white/70">
              <div className="text-5xl mb-4">🎮</div>
              <h3 className="text-xl font-semibold text-white mb-2">No Game Activity Yet</h3>
              <p>Play some games to see your activity here!</p>
              <Link
                href="/"
                className="mt-4 inline-block bg-[#C26DFC]/80 hover:bg-[#C26DFC] text-white px-4 py-2 rounded-lg transition-colors"
              >
                Browse Games
              </Link>
            </div>
          )}

          {gameScores.length > 5 && (
            <div className="mt-6 text-center">
              <button className="text-[#C26DFC] hover:text-[#F67385] font-medium transition-colors">
                View More Activity
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'best' && (
        <div className="p-4">
          {gameScores.length > 0 ? (
            <div className="space-y-4">
              {Object.entries(
                gameScores.reduce((acc, score) => {
                  if (!acc[score.game] || acc[score.game].score < score.score)
                  {
                    acc[score.game] = score;
                  }
                  return acc;
                }, {})
              )
                .sort(([, a], [, b]) => b.score - a.score)
                .map(([game, score], index) => (
                  <div key={index} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
                      #{index + 1}
                    </div>

                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getGameColorClass(game)} flex items-center justify-center text-2xl`}>
                      {gameIcons[game] || "🎮"}
                    </div>

                    <div className="flex-grow">
                      <div className="text-white font-semibold">{game}</div>
                      <div className="text-white/90">Score: <span className="font-bold">{score.score}</span></div>
                    </div>

                    <div className="text-right">
                      <div className="text-white/60 text-sm">{score.date}</div>
                      <Link
                        href={`/games/${game.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-[#C26DFC] hover:text-[#F67385] text-sm transition-colors"
                      >
                        Beat Your Record
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center p-8 text-white/70">
              <div className="text-5xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-white mb-2">No High Scores Yet</h3>
              <p>Play some games to set your high scores!</p>
              <Link
                href="/"
                className="mt-4 inline-block bg-[#C26DFC]/80 hover:bg-[#C26DFC] text-white px-4 py-2 rounded-lg transition-colors"
              >
                Browse Games
              </Link>
            </div>
          )}
        </div>
      )}

      {activeTab === 'stats' && (
        <div className="p-4">
          {gameScores.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-3">Games Played</h3>
                  <div className="h-40 flex items-end gap-2">
                    {Object.entries(stats.gamePlayCounts).map(([game, count], i) => (
                      <StatBar
                        key={i}
                        value={Math.min(100, count * 10)}
                        label={game}
                        color={game === "Snake" ? "bg-green-500" :
                          game === "Whack-a-Mole" ? "bg-teal-500" :
                            game === "Memory Match" ? "bg-pink-500" :
                              game === "Tic Tac Toe" ? "bg-blue-500" :
                                game === "1024" ? "bg-orange-500" : "bg-purple-500"}
                      />
                    ))}
                  </div>
                </div>

                <div className="bg-white/5 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-3">Recent Scores</h3>
                  <div className="h-40 flex items-end gap-0">
                    {gameScores.slice(0, 12).map((score, i) => {
                      const maxScore = Math.max(...gameScores.map(s => s.score));
                      const percentage = (score.score / maxScore) * 100;
                      return (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <div className="flex-1 w-full flex items-end">
                            <div
                              className="w-full bg-gradient-to-t from-[#F67385] to-[#C26DFC] rounded-t"
                              style={{ height: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="text-white/50 text-xs mt-1">{i + 1}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <StatCard value={`${stats.totalTimePlayed}h`} label="Total Time Played" />
                <StatCard value={stats.gamesCompleted} label="Games Completed" />
                <StatCard value={stats.totalScore} label="Total Score" />
                <StatCard value={Object.keys(stats.gamePlayCounts).length} label="Games Played" />
              </div>
            </>
          ) : (
            <div className="text-center p-8 text-white/70">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-2">No Statistics Yet</h3>
              <p>Play some games to see your statistics!</p>
              <Link
                href="/"
                className="mt-4 inline-block bg-[#C26DFC]/80 hover:bg-[#C26DFC] text-white px-4 py-2 rounded-lg transition-colors"
              >
                Browse Games
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function StatBar({ value, label, color }) {
  return (
    <div className="flex-1 flex flex-col items-center">
      <div className="w-full flex-1 flex items-end">
        <div
          className={`w-full ${color} rounded-t`}
          style={{ height: `${value}%` }}
        ></div>
      </div>
      <div className="text-white/50 text-xs mt-1 truncate max-w-full">{label}</div>
    </div>
  );
}

function StatCard({ value, label }) {
  return (
    <div className="bg-white/5 rounded-lg p-3 text-center">
      <div className="text-xl font-bold text-white">{value}</div>
      <div className="text-white/60 text-sm">{label}</div>
    </div>
  );
} 