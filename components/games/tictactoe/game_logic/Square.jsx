import React from 'react';

const Square = ({ value, onClick }) => (
  <button
    className="w-16 h-16 flex items-center justify-center text-2xl font-bold bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded"
    onClick={onClick}
  >
    {value}
  </button>
);

export default Square;