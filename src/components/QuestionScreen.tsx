import React, { useState } from 'react';
import { ArrowRight, Clock } from 'lucide-react';
import { Question } from '../types';

interface QuestionScreenProps {
  question: Question;
  onSubmitAnswer: (answer: string) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  onSubmitAnswer,
  currentQuestionIndex,
  totalQuestions,
}) => {
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);

  React.useEffect(() => {
    let timer: number | undefined;
    
    if (isTimerActive && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, isTimerActive]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSubmit = () => {
    if (answer.trim()) {
      onSubmitAnswer(answer);
      setAnswer('');
      setTimeLeft(300);
      setIsTimerActive(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {totalQuestions}
        </div>
        <div className={`flex items-center space-x-1 ${timeLeft < 60 ? 'text-red-500' : 'text-gray-500'}`}>
          <Clock size={16} />
          <span>{formatTime(timeLeft)}</span>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {question.question}
        </h3>
        <div className="text-xs text-gray-500 uppercase tracking-wide">
          Category: {question.category}
        </div>
      </div>
      
      <div className="mb-4">
        <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
          Your Answer
        </label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 min-h-[200px]"
          placeholder="Type your answer here..."
        />
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={!answer.trim()}
        className={`w-full flex items-center justify-center space-x-2 ${
          answer.trim() 
            ? 'bg-indigo-600 hover:bg-indigo-700' 
            : 'bg-gray-300 cursor-not-allowed'
        } text-white font-medium py-2 px-4 rounded-md transition-colors`}
      >
        <span>Submit Answer</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default QuestionScreen;