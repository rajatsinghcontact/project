import React from 'react';
import { BrainCircuit, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BrainCircuit size={28} />
          <h1 className="text-xl font-bold">AI Mock Interview</h1>
        </div>
        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-white hover:text-gray-200 transition-colors">Dashboard</a>
            <a href="#" className="text-white hover:text-gray-200 transition-colors">Features</a>
            <a href="#" className="text-white hover:text-gray-200 transition-colors">Testimonials</a>
            <a href="#" className="text-white hover:text-gray-200 transition-colors">Contact</a>
          </nav>
          {toggleDarkMode && (
            <button 
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-indigo-500 hover:bg-indigo-600 transition-colors"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;