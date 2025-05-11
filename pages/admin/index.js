import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalGames: 5,
    totalPlays: 0,
    gameStats: []
  });
  
  const router = useRouter();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Check admin status
        const { data: adminData } = await axios.get('/api/auth/check-admin');
        
        if (!adminData.isAdmin) {
          router.push('/');
          return;
        }
        
        setUser(adminData.user);
        
        // Fetch dashboard statistics
        try {
          const { data: statsData } = await axios.get('/api/admin/stats');
          if (statsData.success) {
            setStats(statsData.stats);
          }
        } catch (statsError) {
          console.error('Failed to fetch stats data:', statsError);
          // If stats fail, we still show the dashboard with default values
        }
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
        router.push('/auth/login?redirect=admin');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10 bg-[#1A0E2D]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-white/70">Welcome back, {user.email}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <StatCard title="Total Users" value={stats.totalUsers} icon="👤" color="bg-gradient-to-br from-pink-500 to-rose-600" />
          <StatCard title="Games Available" value={stats.totalGames} icon="🎮" color="bg-gradient-to-br from-blue-500 to-indigo-600" />
          <StatCard title="Total Game Plays" value={stats.totalPlays} icon="🎯" color="bg-gradient-to-br from-emerald-500 to-green-600" />
        </div>

        {/* Game Statistics */}
        {stats.gameStats && stats.gameStats.length > 0 && (
          <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/15 overflow-hidden mb-8">
            <div className="px-4 py-3 border-b border-white/10">
              <h2 className="text-xl font-bold text-white">Game Statistics</h2>
            </div>
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/15">
                      <th className="px-4 py-2 text-left text-sm font-semibold text-white/70">Game</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-white/70">Plays</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-white/70">Top Score</th>
                      <th className="px-4 py-2 text-left text-sm font-semibold text-white/70">Top Player</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.gameStats.map((game, index) => (
                      <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                        <td className="px-4 py-3 text-white capitalize">
                          {game.name.replace(/-/g, ' ')}
                        </td>
                        <td className="px-4 py-3 text-white">{game.plays}</td>
                        <td className="px-4 py-3 text-white">{game.topScore}</td>
                        <td className="px-4 py-3 text-white/70">{game.topPlayer}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Management Sections - Only include user management which is implemented */}
        <div className="mb-8">
          <AdminSection 
            title="User Management" 
            description="Manage user accounts and permissions"
            icon="👥"
            actions={[
              { label: 'View All Users', href: '/admin/users' },
            ]}
          />
        </div>

        {/* Note about future functionality */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/15 overflow-hidden mb-8 p-6">
          <h2 className="text-xl font-bold text-white mb-4">Admin Dashboard Development</h2>
          <p className="text-white/70 mb-3">
            This admin dashboard is currently in development. Additional functionality will be added in future updates.
          </p>
          <p className="text-white/70">
            Currently implemented features:
          </p>
          <ul className="list-disc list-inside text-white/70 mt-2 ml-4 space-y-1">
            <li>View basic system statistics</li>
            <li>View and manage user accounts</li>
            <li>Set admin privileges</li>
          </ul>
        </div>

        {/* Return to site button */}
        <div className="mt-8 flex justify-end">
          <Link
            href="/"
            className="bg-[#C26DFC] text-white px-4 py-3 rounded-xl shadow-md hover:bg-[#A84FE0] transition-all active:scale-95 inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            Return to Site
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/15 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-lg ${color} flex items-center justify-center text-2xl`}>
            {icon}
          </div>
          <div>
            <div className="text-white/70 text-sm">{title}</div>
            <div className="text-2xl font-bold text-white">{value.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminSection({ title, description, icon, actions }) {
  return (
    <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/15 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-3xl">{icon}</div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
        </div>
        
        <p className="text-white/70 mb-6">{description}</p>
        
        <div className="space-y-2">
          {actions.map((action, index) => (
            <Link 
              key={index}
              href={action.href}
              className="w-full bg-white/10 hover:bg-white/15 text-white py-2 px-4 rounded-lg transition-colors inline-flex items-center justify-between"
            >
              {action.label}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 