import { useState } from 'react';

export default function Achievements() {
  const [showUnlocked, setShowUnlocked] = useState(true);

  const achievements = [
    {
      id: 1,
      title: "Snake Master",
      description: "Score 200+ points in Snake",
      icon: "🐍",
      progress: 75,
      unlocked: false,
      game: "Snake"
    },
    {
      id: 2,
      title: "Memory Expert",
      description: "Complete Memory Match in under 30 seconds",
      icon: "🎴",
      progress: 100,
      unlocked: true,
      game: "Memory Match",
      unlockedDate: "2023-05-10"
    },
    {
      id: 3,
      title: "Whack Champion",
      description: "Score 50+ in Whack-a-Mole",
      icon: "🐹",
      progress: 100,
      unlocked: true,
      game: "Whack-a-Mole",
      unlockedDate: "2023-04-15"
    },
    {
      id: 4,
      title: "Puzzle Solver",
      description: "Reach 1024 tile",
      icon: "🔢",
      progress: 30,
      unlocked: false,
      game: "1024"
    },
    {
      id: 5,
      title: "Undefeated",
      description: "Win 10 consecutive Tic Tac Toe games",
      icon: "✕⭘",
      progress: 100,
      unlocked: true,
      game: "Tic Tac Toe",
      unlockedDate: "2023-05-01"
    },
  ];

  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  const displayedAchievements = showUnlocked ? unlockedAchievements : lockedAchievements;

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/15 overflow-hidden mb-8">
      <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Achievements</h2>

        <div className="flex rounded-lg bg-white/5 p-0.5">
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${showUnlocked ? 'bg-[#C26DFC] text-white' : 'text-white/70 hover:text-white'}`}
            onClick={() => setShowUnlocked(true)}
          >
            Unlocked ({unlockedAchievements.length})
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${!showUnlocked ? 'bg-[#C26DFC] text-white' : 'text-white/70 hover:text-white'}`}
            onClick={() => setShowUnlocked(false)}
          >
            In Progress ({lockedAchievements.length})
          </button>
        </div>
      </div>

      <div className="p-4">
        {displayedAchievements.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedAchievements.map(achievement => (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${achievement.unlocked
                  ? 'bg-white/10 border-[#C26DFC]/30'
                  : 'bg-white/5 border-white/10'
                  } flex items-center gap-4`}
              >
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center text-3xl ${achievement.unlocked
                  ? 'bg-gradient-to-br from-[#C26DFC] to-[#F67385]'
                  : 'bg-white/10'
                  }`}>
                  {achievement.icon}
                </div>

                <div className="flex-grow">
                  <div className="flex items-center">
                    <h3 className="text-white font-semibold">{achievement.title}</h3>
                    {achievement.unlocked && (
                      <div className="ml-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#F67385]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}
                  </div>

                  <p className="text-white/70 text-sm mt-1">{achievement.description}</p>

                  {!achievement.unlocked && (
                    <div className="mt-2">
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#C26DFC] to-[#F67385] rounded-full"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-right text-white/50 text-xs mt-1">
                        {achievement.progress}%
                      </div>
                    </div>
                  )}

                  {achievement.unlocked && achievement.unlockedDate && (
                    <div className="text-white/50 text-xs mt-1">
                      Unlocked: {new Date(achievement.unlockedDate).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-white/60">
            {showUnlocked
              ? "You haven't unlocked any achievements yet. Keep playing!"
              : "No achievements in progress. You've unlocked them all!"}
          </div>
        )}
      </div>
    </div>
  );
} 