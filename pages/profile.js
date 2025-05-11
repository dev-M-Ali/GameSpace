import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scores, setScores] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get user data
        const { data } = await axios.get("/api/auth/me");
        
        if (!data.user) {
          router.push("/auth/login?redirect=profile");
          return;
        }
        
        setUser(data.user);

        // Fetch user scores
        // TODO: Implement an API to fetch scores for all games for this user
        // For now, this is a placeholder
        
        setScores([
          { game: "Snake", score: 150, date: new Date().toLocaleString() },
          { game: "Whack-a-Mole", score: 42, date: new Date().toLocaleString() },
          { game: "Memory Match", score: 12, date: new Date().toLocaleString() },
        ]);
      } catch (error) {
        console.error("Failed to fetch user data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading profile...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 mt-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-[#2D1A50]/70 to-[#1A0E2D]/70 backdrop-blur-lg rounded-2xl overflow-hidden border border-[#C26DFC]/30 mb-8">
          <div className="p-4 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-6">My Profile</h1>
            
            <div className="bg-white/5 backdrop-blur-md p-4 md:p-6 rounded-xl border border-white/15 mb-6">
              <h2 className="text-lg md:text-xl font-bold text-white mb-4">User Information</h2>
              <div className="space-y-3 break-words">
                <div className="flex flex-col md:flex-row md:items-center">
                  <span className="text-[#F67385] font-semibold mr-2 whitespace-nowrap">Email: </span>
                  <span className="text-white break-all">{user.email}</span>
                </div>
                {/* Add more user details here as they become available */}
                <div className="flex flex-col md:flex-row md:items-center">
                  <span className="text-[#F67385] font-semibold mr-2 whitespace-nowrap">Member Since: </span>
                  <span className="text-white">
                    {user._id ? new Date(parseInt(user._id.substring(0, 8), 16) * 1000).toLocaleDateString() : "Unknown"}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-4 md:p-6 rounded-xl border border-white/15">
              <h2 className="text-lg md:text-xl font-bold text-white mb-4">My Game Scores</h2>
              
              {scores.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-white text-sm md:text-base">
                    <thead>
                      <tr className="border-b border-[#C26DFC]/30">
                        <th className="py-2 px-2 md:py-3 md:px-4 text-left">Game</th>
                        <th className="py-2 px-2 md:py-3 md:px-4 text-left">Score</th>
                        <th className="py-2 px-2 md:py-3 md:px-4 text-left hidden md:table-cell">Date</th>
                        <th className="py-2 px-2 md:py-3 md:px-4 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scores.map((score, index) => (
                        <tr 
                          key={index} 
                          className="border-b border-white/5 hover:bg-white/5 transition-colors"
                        >
                          <td className="py-2 px-2 md:py-3 md:px-4">{score.game}</td>
                          <td className="py-2 px-2 md:py-3 md:px-4">{score.score}</td>
                          <td className="py-2 px-2 md:py-3 md:px-4 hidden md:table-cell">{score.date}</td>
                          <td className="py-2 px-2 md:py-3 md:px-4">
                            <Link 
                              href={`/games/${score.game.toLowerCase().replace(/\s+/g, '-')}`}
                              className="text-[#C26DFC] hover:text-[#F67385] transition-colors"
                            >
                              Play
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-white/80">No game scores yet. Start playing to record your scores!</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-4">
          <Link 
            href="/"
            className="bg-[#C26DFC] text-white px-4 py-3 rounded-xl shadow-md hover:bg-[#A84FE0] transition-all active:scale-95 inline-flex items-center justify-center md:justify-start"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Home
          </Link>
          <button 
            onClick={async () => {
              try {
                await axios.get("/api/auth/logout");
                router.push("/");
              } catch (error) {
                console.error("Failed to logout", error);
              }
            }}
            className="bg-[#F67385] text-white px-4 py-3 rounded-xl shadow-md hover:bg-[#E85A7A] transition-all active:scale-95 inline-flex items-center justify-center md:justify-start"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V7.414l-5-5H3zm7 5a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L12 11.586V8z" clipRule="evenodd" />
            </svg>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
} 