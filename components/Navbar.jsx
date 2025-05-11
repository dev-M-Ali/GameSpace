// components/Navbar.js
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#F67385]/10 backdrop-blur-md p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">GameSpace</h1>
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
            href="/games/game2"
            className="text-white hover:bg-[#C26DFC]/20 px-3 py-2 rounded-xl transition-colors"
          >
            Game 2
          </Link>
          <Link
            href="/games/game3"
            className="text-white hover:bg-[#C26DFC]/20 px-3 py-2 rounded-xl transition-colors"
          >
            Game 3
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link
            href="/signup"
            className="bg-[#F67385] text-white px-4 py-2 rounded-xl shadow-md hover:bg-[#C26DFC] transition-colors"
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="bg-[#F67385] text-white px-4 py-2 rounded-xl shadow-md hover:bg-[#C26DFC] transition-colors"
          >
            Login
          </Link>
        </div>
      </div>
      {/* Mobile Menu */}
      <div
        className={`md:hidden ${
          isOpen ? "block" : "hidden"
        } bg-[#F67385]/20 backdrop-blur-md mt-2 rounded-xl p-4`}
      >
        <Link
          href="/games/tictactoe"
          className="block text-white hover:bg-[#C26DFC]/20 px-4 py-2 rounded-xl transition-colors"
        >
          Tic Tac Toe
        </Link>
        <Link
          href="/games/whack-a-mole"
          className="block text-white hover:bg-[#C26DFC]/20 px-4 py-2 rounded-xl transition-colors"
        >
          Whack-a-Mole
        </Link>
        <Link
          href="/games/game2"
          className="block text-white hover:bg-[#C26DFC]/20 px-4 py-2 rounded-xl transition-colors"
        >
          Game 2
        </Link>
        <Link
          href="/games/game3"
          className="block text-white hover:bg-[#C26DFC]/20 px-4 py-2 rounded-xl transition-colors"
        >
          Game 3
        </Link>
        <Link
          href="/auth/signup"
          className="block bg-[#F67385] text-white px-4 py-2 rounded-xl shadow-md hover:bg-[#C26DFC] mt-2 transition-colors"
        >
          Sign Up
        </Link>
        <Link
          href="/auth/signup"
          className="block bg-[#F67385] text-white px-4 py-2 rounded-xl shadow-md hover:bg-[#C26DFC] mt-2 transition-colors"
        >
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
