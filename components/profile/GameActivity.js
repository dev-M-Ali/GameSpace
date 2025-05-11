import Link from 'next/link';
import { useState } from 'react';

export default function GameActivity({ scores = [] }) {
  const [activeTab, setActiveTab] = useState('recent');
  
  // Add some sample data if no scores provided
  if (scores.length === 0) {
    scores = [
      { game: "Snake", score: 150, date: new Date().toLocaleString(), improvement: "+15%" },
      { game: "Whack-a-Mole", score: 42, date: new Date(Date.now() - 86400000).toLocaleString(), improvement: "+5%" },
      { game: "Memory Match", score: 12, date: new Date(Date.now() - 172800000).toLocaleString(), improvement: "-8%" },
      { game: "Tic Tac Toe", score: 5, date: new Date(Date.now() - 259200000).toLocaleString(), improvement: "N/A" },
      { game: "1024", score: 1024, date: new Date(Date.now() - 345600000).toLocaleString(), improvement: "+120%" },
    ];
  }

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
          <div className="space-y-4">
            {scores.map((score, index) => (
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
                    {score.improvement && (
                      <div className={`text-xs px-2 py-0.5 rounded-full ${score.improvement.startsWith('+') ? 'bg-green-500/20 text-green-400' : score.improvement.startsWith('-') ? 'bg-red-500/20 text-red-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {score.improvement}
                      </div>
                    )}
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
          
          <div className="mt-6 text-center">
            <button className="text-[#C26DFC] hover:text-[#F67385] font-medium transition-colors">
              View More Activity
            </button>
          </div>
        </div>
      )}
      
      {activeTab === 'best' && (
        <div className="p-4">
          <div className="space-y-4">
            {/* Sort scores and show best at top */}
            {[...scores].sort((a, b) => b.score - a.score).map((score, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">
                  #{index + 1}
                </div>
                
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${getGameColorClass(score.game)} flex items-center justify-center text-2xl`}>
                  {gameIcons[score.game] || "🎮"}
                </div>
                
                <div className="flex-grow">
                  <div className="text-white font-semibold">{score.game}</div>
                  <div className="text-white/90">Score: <span className="font-bold">{score.score}</span></div>
                </div>
                
                <div className="text-right">
                  <div className="text-white/60 text-sm">{score.date}</div>
                  <Link 
                    href={`/games/${score.game.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-[#C26DFC] hover:text-[#F67385] text-sm transition-colors"
                  >
                    Beat Your Record
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'stats' && (
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Time Played Per Game */}
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-3">Time Played Per Game</h3>
              <div className="h-40 flex items-end gap-2">
                <StatBar value={65} label="Snake" color="bg-green-500" />
                <StatBar value={40} label="Whack-a-Mole" color="bg-teal-500" />
                <StatBar value={25} label="Memory" color="bg-pink-500" />
                <StatBar value={15} label="Tic Tac Toe" color="bg-blue-500" />
                <StatBar value={30} label="1024" color="bg-orange-500" />
              </div>
            </div>
            
            {/* Progress Over Time */}
            <div className="bg-white/5 p-4 rounded-lg">
              <h3 className="text-white font-semibold mb-3">Progress Over Time</h3>
              <div className="h-40 flex items-end gap-0">
                {[15, 22, 18, 30, 25, 35, 40, 38, 45, 50, 48, 60].map((value, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center">
                    <div className="flex-1 w-full flex items-end">
                      <div 
                        className="w-full bg-gradient-to-t from-[#F67385] to-[#C26DFC] rounded-t"
                        style={{ height: `${value}%` }}
                      ></div>
                    </div>
                    <div className="text-white/50 text-xs mt-1">{i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <StatCard value="5.2h" label="Total Time Played" />
            <StatCard value="37" label="Games Completed" />
            <StatCard value="62%" label="Win Rate" />
            <StatCard value="#127" label="Global Ranking" />
          </div>
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