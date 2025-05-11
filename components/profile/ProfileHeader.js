import { useState, useEffect } from 'react';
import Image from 'next/image';
import axios from 'axios';

export default function ProfileHeader({ user }) {
  const [isEditingAvatar, setIsEditingAvatar] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Calculate membership duration
  const memberSince = user._id 
    ? new Date(parseInt(user._id.substring(0, 8), 16) * 1000) 
    : null;
  
  const membershipDuration = memberSince ? calculateMembershipDuration(memberSince) : '';

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        const { data } = await axios.get('/api/auth/check-admin');
        setIsAdmin(data.isAdmin);
      } catch (error) {
        console.error('Failed to check admin status:', error);
      }
    };

    checkAdminStatus();
  }, []);

  return (
    <div className="relative mb-8">
      {/* Cover/Banner Image */}
      <div className="h-40 md:h-60 w-full rounded-xl overflow-hidden bg-gradient-to-r from-[#2D1A50] to-[#C26DFC]">
        <div className="absolute inset-0 bg-[url('/images/profile-banner.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>
      
      {/* Profile Information */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="relative flex flex-col md:flex-row items-start md:items-end -mt-16 md:-mt-24">
          {/* Avatar */}
          <div className="relative z-10 group">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#1A0E2D] bg-[#2D1A50]">
              {user.avatar ? (
                <Image 
                  src={user.avatar} 
                  alt={`${user.email}'s avatar`} 
                  width={128} 
                  height={128} 
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#2D1A50] text-white text-4xl font-bold">
                  {user.email ? user.email.charAt(0).toUpperCase() : 'G'}
                </div>
              )}
            </div>
            <button 
              onClick={() => setIsEditingAvatar(true)}
              className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </div>
          
          {/* User Info */}
          <div className="mt-4 md:mt-0 md:ml-6 pb-2">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-md">
                {user.displayName || user.email.split('@')[0]}
              </h1>
              
              {/* Admin Badge */}
              {isAdmin && (
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-xs font-bold px-2 py-1 rounded-full text-white shadow-md">
                  ADMIN
                </span>
              )}
            </div>
            <div className="flex flex-col md:flex-row md:items-center md:gap-6 mt-1 text-white/70">
              <div>{user.email}</div>
              <div className="hidden md:block">•</div>
              <div>Member for {membershipDuration}</div>
            </div>
          </div>
        </div>

        {/* Stats Panel */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-4 mt-8 bg-white/5 backdrop-blur-md rounded-xl p-4 border border-white/15">
          <StatItem value="24" label="Games Played" />
          <StatItem value="12,450" label="Total Score" />
          <StatItem value="3" label="Achievements" />
          <StatItem value="#42" label="Ranking" className="hidden md:flex" />
        </div>
      </div>
    </div>
  );
}

function StatItem({ value, label, className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="text-xl md:text-2xl font-bold text-white">{value}</div>
      <div className="text-xs md:text-sm text-white/70 text-center">{label}</div>
    </div>
  );
}

function calculateMembershipDuration(date) {
  const now = new Date();
  const diffInMs = now - date;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays < 30) {
    return `${diffInDays} days`;
  } else if (diffInDays < 365) {
    const months = Math.floor(diffInDays / 30);
    return `${months} ${months === 1 ? 'month' : 'months'}`;
  } else {
    const years = Math.floor(diffInDays / 365);
    const remainingMonths = Math.floor((diffInDays % 365) / 30);
    if (remainingMonths === 0) {
      return `${years} ${years === 1 ? 'year' : 'years'}`;
    }
    return `${years} ${years === 1 ? 'year' : 'years'}, ${remainingMonths} ${remainingMonths === 1 ? 'month' : 'months'}`;
  }
} 