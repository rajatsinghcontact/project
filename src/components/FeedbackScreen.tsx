import React from 'react';
import { ThumbsUp, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Question } from '../types';

interface FeedbackScreenProps {
  question: Question;
  answer: string;
  feedback: string;
  onNext: () => void;
  isLastQuestion: boolean;
}

const FeedbackScreen: React.FC<FeedbackScreenProps> = ({
  question,
  answer,
  feedback,
  onNext,
  isLastQuestion,
}) => {
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {question.question}
      </h3>
      
      <div className="mb-6">
        <h4 className="text-md font-medium text-gray-700 mb-2">Your Answer:</h4>
        <div className="bg-gray-50 p-4 rounded-md text-gray-600 whitespace-pre-wrap">
          {answer}
        </div>
      </div>
      
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <ThumbsUp size={18} className="text-green-500" />
          <h4 className="text-md font-medium text-gray-700">Feedback:</h4>
        </div>
        <div className="bg-green-50 p-4 rounded-md text-gray-700 prose prose-sm max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {feedback}
          </ReactMarkdown>
        </div>
      </div>
      
      <button
        onClick={onNext}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        <span>{isLastQuestion ? 'Finish Interview' : 'Next Question'}</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default FeedbackScreen;