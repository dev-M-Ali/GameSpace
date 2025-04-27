// components/Navbar.js
import { useState } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">GameSpace</h1>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
        </div>
        {/* Desktop Menu */}
        <div className={`hidden md:flex md:flex-row md:items-center md:space-x-4 ${isOpen ? 'hidden' : 'flex'}`}>
          <Link href="/tictactoe" className="text-white hover:bg-gray-700 px-3 py-2 rounded-xl">
            Tic Tac Toe
          </Link>
          <Link href="/game1" className="text-white hover:bg-gray-700 px-3 py-2 rounded-xl">
            Game 1
          </Link>
          <Link href="/game2" className="text-white hover:bg-gray-700 px-3 py-2 rounded-xl">
            Game 2
          </Link>
          <Link href="/game3" className="text-white hover:bg-gray-700 px-3 py-2 rounded-xl">
            Game 3
          </Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
            SignUp
          </Link>
          <Link href="/login" className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
            Login
          </Link>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-700 mt-2 rounded`}>
        <Link href="/tictactoe" className="block text-white hover:bg-gray-600 px-4 py-2 rounded-xl">
          Tic Tac Toe
        </Link>
        <Link href="/game1" className="block text-white hover:bg-gray-600 px-4 py-2 rounded-xl">
          Game 1
        </Link>
        <Link href="/game2" className="block text-white hover:bg-gray-600 px-4 py-2 rounded-xl">
          Game 2
        </Link>
        <Link href="/game3" className="block text-white hover:bg-gray-600 px-4 py-2 rounded-xl">
          Game 3
        </Link>
        <Link href="/signup" className="block bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-xl">
          SignUp
        </Link>
        <Link href="/login" className="block bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-xl">
          Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
