// components/Navbar.js
import { useState, useEffect } from "react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in
    const fetchUser = async () => {
      try {
        const { data } = await axios.get("/api/auth/me");
        setUser(data.user);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLogin = () => {
    router.push("/auth/login");
  };
  
  const handleSignup = () => {
    router.push("/auth/signup");
  };
  
  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };
  
  const handleProfile = () => {
    router.push("/profile");
  };

  return (
    <nav className="bg-[#F67385]/10 backdrop-blur-md p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold hover:text-[#C26DFC] transition-colors">
          GameSpace
        </Link>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex md:flex-row md:items-center md:space-x-4">
          <Link
            href="/games/tictactoe"
            className="text-white hover:bg-[#C26DFC]/20 px-3 py-2 rounded-xl transition-colors"
          >
            Tic Tac Toe
          </Link>
          <Link
            href="/games/whack-a-mole"
            className="text-white hover:bg-[#C26DFC]/20 px-3 py-2 rounded-xl transition-colors"
          >
            Whack-a-Mole
          </Link>
          <Link
            href="/games/snake"
            className="text-white hover:bg-[#C26DFC]/20 px-3 py-2 rounded-xl transition-colors"
          >
            Snake
          </Link>
          <Link
            href="/games/memory-match"
            className="text-white hover:bg-[#C26DFC]/20 px-3 py-2 rounded-xl transition-colors"
          >
            Memory Match
          </Link>
          <Link
            href="/games/1024"
            className="text-white hover:bg-[#C26DFC]/20 px-3 py-2 rounded-xl transition-colors"
          >
            1024
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          {loading ? (
            <div className="bg-[#F67385]/50 text-white px-4 py-2 rounded-xl animate-pulse">
              Loading...
            </div>
          ) : user ? (
            <>
              <button
                onClick={handleProfile}
                className="bg-[#C26DFC] text-white px-4 py-2 rounded-xl shadow-md hover:bg-[#A84FE0] transition-all active:scale-95"
              >
                My Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-[#F67385] text-white px-4 py-2 rounded-xl shadow-md hover:bg-[#E85A7A] transition-all active:scale-95"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleSignup}
                className="bg-[#F67385] text-white px-4 py-2 rounded-xl shadow-md hover:bg-[#E85A7A] transition-all active:scale-95"
              >
                Sign Up
              </button>
              <button
                onClick={handleLogin}
                className="bg-[#C26DFC] text-white px-4 py-2 rounded-xl shadow-md hover:bg-[#A84FE0] transition-all active:scale-95"
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 bg-[#F67385]/20 backdrop-blur-md p-4 rounded-xl">
          <div className="flex flex-col space-y-3">
            <Link
              href="/games/tictactoe"
              className="text-white hover:bg-[#C26DFC]/20 px-3 py-2 rounded-xl transition-colors"
              onClick={toggleMenu}
            >
              Tic Tac Toe
            </Link>
            <Link
              href="/games/whack-a-mole"
              className="text-white hover:bg-[#C26DFC]/20 px-3 py-2 rounded-xl transition-colors"
              onClick={toggleMenu}
            >
              Whack-a-Mole
            </Link>
            <Link
              href="/games/snake"
              className="text-white hover:bg-[#C26DFC]/20 px-3 py-2 rounded-xl transition-colors"
              onClick={toggleMenu}
            >
              Snake
            </Link>
            <Link
              href="/games/memory-match"
              className="text-white hover:bg-[#C26DFC]/20 px-3 py-2 rounded-xl transition-colors"
              onClick={toggleMenu}
            >
              Memory Match
            </Link>
            <Link
              href="/games/1024"
              className="text-white hover:bg-[#C26DFC]/20 px-3 py-2 rounded-xl transition-colors"
              onClick={toggleMenu}
            >
              1024
            </Link>
            <div className="flex space-x-2 mt-2">
              {loading ? (
                <div className="bg-[#F67385]/50 text-white px-3 py-2 rounded-xl animate-pulse flex-1 text-center">
                  Loading...
                </div>
              ) : user ? (
                <>
                  <button
                    onClick={() => {
                      handleProfile();
                      toggleMenu();
                    }}
                    className="bg-[#C26DFC] text-white px-3 py-2 rounded-xl shadow-md hover:bg-[#A84FE0] transition-all active:scale-95 flex-1"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="bg-[#F67385] text-white px-3 py-2 rounded-xl shadow-md hover:bg-[#E85A7A] transition-all active:scale-95 flex-1"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handleSignup();
                      toggleMenu();
                    }}
                    className="bg-[#F67385] text-white px-3 py-2 rounded-xl shadow-md hover:bg-[#E85A7A] transition-all active:scale-95 flex-1"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => {
                      handleLogin();
                      toggleMenu();
                    }}
                    className="bg-[#C26DFC] text-white px-3 py-2 rounded-xl shadow-md hover:bg-[#A84FE0] transition-all active:scale-95 flex-1"
                  >
                    Login
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
