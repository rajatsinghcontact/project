import React from 'react';
import { Play } from 'lucide-react';
import CategorySelector from './CategorySelector';
import { CategoryOption } from '../types';

interface StartScreenProps {
  onStart: () => void;
  categories: CategoryOption[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Welcome to AI Mock Interview
      </h2>
      
      <p className="text-gray-600 mb-6">
        Practice your technical interview skills with our AI-powered mock interview. 
        Select a category and start answering questions to improve your interview performance.
      </p>
      
      <CategorySelector
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />
      
      <button
        onClick={onStart}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        <Play size={18} />
        <span>Start Interview</span>
      </button>
    </div>
  );
};

export default StartScreen;