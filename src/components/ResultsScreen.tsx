import React from 'react';
import { BarChart, RefreshCw } from 'lucide-react';
import { Question } from '../types';

interface ResultsScreenProps {
  questions: Question[];
  answers: Record<number, string>;
  feedback: Record<number, string>;
  onRestart: () => void;
}

const ResultsScreen: React.FC<ResultsScreenProps> = ({
  questions,
  answers,
  feedback,
  onRestart,
}) => {
  const answeredQuestions = questions.filter(q => answers[q.id]);
  
  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-center mb-6">
        <BarChart size={28} className="text-indigo-600 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800">Interview Results</h2>
      </div>
      
      <div className="mb-6">
        <div className="bg-indigo-50 p-4 rounded-md">
          <p className="text-center text-gray-700">
            You completed <span className="font-bold">{answeredQuestions.length}</span> out of <span className="font-bold">{questions.length}</span> questions.
          </p>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Question Summary</h3>
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={question.id} className="border border-gray-200 rounded-md p-4">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-md font-medium text-gray-700">
                  {index + 1}. {question.question}
                </h4>
                <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                  {question.category}
                </span>
              </div>
              
              {answers[question.id] ? (
                <div className="text-sm text-green-600">
                  Answered
                </div>
              ) : (
                <div className="text-sm text-red-600">
                  Not answered
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <button
        onClick={onRestart}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        <RefreshCw size={18} />
        <span>Start New Interview</span>
      </button>
    </div>
  );
};

export default ResultsScreen;