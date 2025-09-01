import { useState } from 'react';

export default function Friends() {
  const [activeTab, setActiveTab] = useState('friends');

  const friends = [
    {
      id: 1,
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: null,
      online: true,
      lastActive: new Date().toISOString(),
      recentGame: "Snake"
    },
    {
      id: 2,
      name: "Sarah Lee",
      email: "sarah@example.com",
      avatar: null,
      online: false,
      lastActive: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
      recentGame: "Tic Tac Toe"
    },
    {
      id: 3,
      name: "Miguel Rodriguez",
      email: "miguel@example.com",
      avatar: null,
      online: false,
      lastActive: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      recentGame: "1024"
    },
  ];

  const activities = [
    {
      id: 1,
      type: "achievement",
      user: friends[0],
      game: "Snake",
      description: "unlocked Snake Master achievement",
      timestamp: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
    },
    {
      id: 2,
      type: "score",
      user: friends[1],
      game: "Memory Match",
      score: 42,
      description: "scored 42 in Memory Match",
      timestamp: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
    },
    {
      id: 3,
      type: "challenge",
      user: friends[2],
      game: "Tic Tac Toe",
      description: "challenged you to Tic Tac Toe",
      timestamp: new Date(Date.now() - 14400000).toISOString(), // 4 hours ago
      pending: true
    }
  ];

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/15 overflow-hidden mb-8">
      <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Friends & Activity</h2>

        <div className="flex rounded-lg bg-white/5 p-0.5">
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'friends' ? 'bg-[#C26DFC] text-white' : 'text-white/70 hover:text-white'}`}
            onClick={() => setActiveTab('friends')}
          >
            Friends ({friends.length})
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md transition-colors ${activeTab === 'activity' ? 'bg-[#C26DFC] text-white' : 'text-white/70 hover:text-white'}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity Feed
          </button>
        </div>
      </div>

      {activeTab === 'friends' && (
        <div className="p-4">
          <div className="space-y-3">
            {friends.map((friend) => (
              <div key={friend.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-[#2D1A50] flex items-center justify-center text-white font-bold">
                    {friend.avatar ? (
                      <img src={friend.avatar} alt={friend.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      friend.name.charAt(0)
                    )}
                  </div>

                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#1A0E2D] ${friend.online ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                </div>

                <div className="flex-grow min-w-0">
                  <div className="text-white font-medium">{friend.name}</div>
                  <div className="text-white/60 text-sm truncate">
                    {friend.online ? 'Online' : formatTimeAgo(friend.lastActive)}
                    {friend.recentGame && !friend.online && ` • Last played: ${friend.recentGame}`}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button className="bg-[#C26DFC]/80 hover:bg-[#C26DFC] text-white text-sm p-2 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>

                  <button className="bg-[#F67385]/80 hover:bg-[#F67385] text-white text-sm p-2 rounded-lg transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center">
            <button className="bg-white/10 hover:bg-white/15 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium">
              <div className="flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Friends
              </div>
            </button>
          </div>
        </div>
      )}

      {activeTab === 'activity' && (
        <div className="p-4">
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#2D1A50] flex items-center justify-center text-white font-bold">
                    {activity.user.avatar ? (
                      <img src={activity.user.avatar} alt={activity.user.name} className="w-full h-full rounded-full object-cover" />
                    ) : (
                      activity.user.name.charAt(0)
                    )}
                  </div>

                  <div className="flex-grow">
                    <div className="text-white">
                      <span className="font-medium">{activity.user.name}</span> {activity.description}
                    </div>
                    <div className="text-white/60 text-sm">
                      {formatTimeAgo(activity.timestamp)}
                    </div>
                  </div>
                </div>

                {activity.type === 'challenge' && activity.pending && (
                  <div className="mt-3 flex gap-2 justify-end">
                    <button className="bg-[#F67385]/80 hover:bg-[#F67385] text-white text-sm py-1 px-3 rounded-lg transition-colors">
                      Accept
                    </button>
                    <button className="bg-white/10 hover:bg-white/20 text-white text-sm py-1 px-3 rounded-lg transition-colors">
                      Decline
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);

  if (diffInSeconds < 60)
  {
    return 'Just now';
  } else if (diffInSeconds < 3600)
  {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}m ago`;
  } else if (diffInSeconds < 86400)
  {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}h ago`;
  } else
  {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}d ago`;
  }
} 