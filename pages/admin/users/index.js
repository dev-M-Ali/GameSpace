import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';

export default function UserManagement() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const router = useRouter();
  const usersPerPage = 10;

  // Check authentication and admin status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get('/api/auth/check-admin');
        
        if (!data.isAdmin) {
          router.push('/');
          return;
        }
        
        setUser(data.user);
        fetchUsers();
      } catch (error) {
        console.error('Authentication error:', error);
        router.push('/auth/login?redirect=admin/users');
      }
    };

    checkAuth();
  }, [router]);

  // Fetch users from the database
  const fetchUsers = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to get users
      // For demo purposes, we'll simulate users data
      const sampleUsers = [
        { _id: '1', email: 'admin@example.com', isAdmin: true, lastLogin: new Date().toISOString() },
        { _id: '2', email: 'user1@example.com', isAdmin: false, lastLogin: new Date(Date.now() - 86400000).toISOString() },
        { _id: '3', email: 'user2@example.com', isAdmin: false, lastLogin: new Date(Date.now() - 172800000).toISOString() },
        { _id: '4', email: 'user3@example.com', isAdmin: false, lastLogin: new Date(Date.now() - 259200000).toISOString() },
        { _id: '5', email: 'moderator@example.com', isAdmin: true, lastLogin: new Date(Date.now() - 345600000).toISOString() },
        { _id: '6', email: 'test1@gmail.com', isAdmin: false, lastLogin: new Date(Date.now() - 432000000).toISOString() },
        { _id: '7', email: 'inactive@example.com', isAdmin: false, lastLogin: new Date(Date.now() - 2592000000).toISOString() },
      ];
      
      setUsers(sampleUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      setMessage({ type: 'error', text: 'Failed to load users. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle toggle admin status
  const toggleAdminStatus = async (userId, currentStatus) => {
    try {
      const response = await axios.post('/api/admin/set-admin-status', {
        userId,
        isAdmin: !currentStatus
      });
      
      if (response.data.success) {
        // Update local state to reflect the change
        setUsers(prevUsers => 
          prevUsers.map(u => 
            u._id === userId ? { ...u, isAdmin: !currentStatus } : u
          )
        );
        
        setMessage({ 
          type: 'success', 
          text: `User is now ${!currentStatus ? 'an admin' : 'a regular user'}`
        });
        
        // Clear message after 3 seconds
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      console.error('Failed to update admin status:', error);
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update user. Please try again.'
      });
    }
  };

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-pulse text-white text-xl">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-10 bg-[#1A0E2D]">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
            <p className="text-white/70">Manage all users in the system</p>
          </div>
          
          <Link
            href="/admin"
            className="mt-4 md:mt-0 bg-[#C26DFC]/80 hover:bg-[#C26DFC] text-white px-4 py-2 rounded-lg transition-colors inline-flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        {/* Message alert */}
        {message.text && (
          <div className={`p-4 mb-6 rounded-lg ${
            message.type === 'success' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
          }`}>
            {message.text}
          </div>
        )}

        {/* Search and filters */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/15 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C26DFC]/50 pl-10"
            />
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/50 absolute left-3 top-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Users table */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/15 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/15">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white/70">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white/70">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-white/70">Last Login</th>
                  <th className="px-6 py-3 text-right text-sm font-semibold text-white/70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.length > 0 ? (
                  currentUsers.map((userData) => (
                    <tr key={userData._id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-6 py-4 text-white">{userData.email}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          userData.isAdmin 
                            ? 'bg-purple-400/20 text-purple-300'
                            : 'bg-blue-400/20 text-blue-300'
                        }`}>
                          {userData.isAdmin ? 'Admin' : 'User'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white/70">{formatDate(userData.lastLogin)}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => toggleAdminStatus(userData._id, userData.isAdmin)}
                          className={`text-sm px-3 py-1 rounded-lg ${
                            userData.isAdmin
                              ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30'
                              : 'bg-purple-500/20 text-purple-300 hover:bg-purple-500/30'
                          }`}
                        >
                          {userData.isAdmin ? 'Remove Admin' : 'Make Admin'}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-white/70">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-between items-center">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? 'bg-white/5 text-white/30 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/15'
              }`}
            >
              Previous
            </button>
            
            <div className="text-white/70">
              Page {currentPage} of {totalPages}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? 'bg-white/5 text-white/30 cursor-not-allowed'
                  : 'bg-white/10 text-white hover:bg-white/15'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 