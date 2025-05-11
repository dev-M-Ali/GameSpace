import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

// Import profile components
import ProfileHeader from "../components/profile/ProfileHeader";
import GameActivity from "../components/profile/GameActivity";
import Achievements from "../components/profile/Achievements";
import GameRecommendations from "../components/profile/GameRecommendations";
import Friends from "../components/profile/Friends";

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

        // Fetch user scores from all game endpoints
        const games = ['snake', 'whack-a-mole', 'tictactoe', 'memory-match', '1024'];
        const scoresData = [];
        
        for (const game of games) {
          try {
            const response = await axios.get(`/api/${game}/scores?email=${data.user.email}`);
            if (response.data && response.data.length > 0) {
              // Format game name for display
              const formattedGameName = game
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
              
              // For each score entry for this game
              response.data.forEach(entry => {
                scoresData.push({
                  game: game === 'tictactoe' ? 'Tic Tac Toe' : formattedGameName,
                  score: entry.score || 0,
                  date: new Date(entry.timestamp || Date.now()).toLocaleString()
                });
              });
            }
          } catch (err) {
            console.error(`Failed to fetch scores for ${game}:`, err);
          }
        }
        
        // Sort by date (newest first)
        scoresData.sort((a, b) => new Date(b.date) - new Date(a.date));
        setScores(scoresData);
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
    <div className="min-h-screen pt-20 pb-10 bg-[#1A0E2D]">
      {/* Profile Header */}
      <ProfileHeader user={user} />
      
      <div className="max-w-4xl mx-auto px-4">
        {/* Game Activity */}
        <GameActivity scores={scores} />
        
        {/* Achievements */}
        <Achievements />
        
        {/* Game Recommendations */}
        <GameRecommendations />
        
        {/* Friends Component */}
        <Friends />
        
        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mt-8">
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