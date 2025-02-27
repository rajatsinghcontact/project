import React, { useState } from 'react';
import { BarChart, RefreshCw, Video, Award, Download, ChevronDown, ChevronUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Question } from '../types';

interface VideoResultsScreenProps {
  questions: Question[];
  answers: Record<number, string>;
  feedback: Record<number, string>;
  onRestart: () => void;
  overallRating?: number;
}

const VideoResultsScreen: React.FC<VideoResultsScreenProps> = ({
  questions,
  answers,
  feedback,
  onRestart,
  overallRating = 0,
}) => {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null);
  
  const answeredQuestions = questions.filter(q => answers[q.id]);
  const rating = overallRating || (Math.floor(Math.random() * 5) + 6) / 10; // Random rating between 0.6 and 1.0
  
  const toggleQuestion = (id: number) => {
    if (expandedQuestion === id) {
      setExpandedQuestion(null);
    } else {
      setExpandedQuestion(id);
    }
  };
  
  // Extract individual ratings from feedback
  const getQuestionRating = (questionId: number): number => {
    const fb = feedback[questionId] || '';
    const match = fb.match(/Rating: (\d+\.\d+)\/10/);
    return match ? parseFloat(match[1]) : 0;
  };
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-green-600 mb-2">Congratulations</h2>
        <p className="text-xl font-semibold text-gray-800">Here is your interview feedback</p>
      </div>
      
      <div className="bg-indigo-50 p-6 rounded-lg mb-8">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700 mb-2">Your overall interview rating</p>
          <div className="flex items-center justify-center">
            <Award size={28} className="text-yellow-500 mr-2" />
            <span className="text-3xl font-bold text-indigo-700">{rating.toFixed(1)}</span>
            <span className="text-xl text-gray-500">/10</span>
          </div>
          <div className="w-full max-w-md mx-auto bg-gray-200 rounded-full h-2.5 mt-4">
            <div 
              className="h-2.5 rounded-full bg-indigo-600" 
              style={{ width: `${rating * 10}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Video size={20} className="text-indigo-600 mr-2" />
          Interview Questions & Answers
        </h3>
        
        <div className="space-y-4">
          {questions.map((question, index) => (
            <div key={question.id} className="border border-gray-200 rounded-md overflow-hidden">
              <div 
                className="flex justify-between items-start p-4 bg-gray-50 cursor-pointer"
                onClick={() => toggleQuestion(question.id)}
              >
                <h4 className="text-md font-medium text-gray-700 flex-1">
                  {index + 1}. {question.question}
                </h4>
                <div className="flex items-center">
                  {answers[question.id] && (
                    <span className="text-xs bg-green-100 px-2 py-1 rounded-full text-green-600 mr-2">
                      {getQuestionRating(question.id).toFixed(1)}/10
                    </span>
                  )}
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600 mr-2">
                    {question.category}
                  </span>
                  {expandedQuestion === question.id ? (
                    <ChevronUp size={16} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-500" />
                  )}
                </div>
              </div>
              
              {answers[question.id] ? (
                <>
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Your Answer:</span>
                      <span className="text-xs bg-green-100 px-2 py-1 rounded-full text-green-600">
                        Answered
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {answers[question.id] || "Provided via audio/video"}
                    </p>
                  </div>
                  
                  {expandedQuestion === question.id && feedback[question.id] && (
                    <div className="p-4 border-t border-gray-200 bg-green-50">
                      <div className="prose prose-sm max-w-none text-gray-700">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {feedback[question.id]}
                        </ReactMarkdown>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-4 border-t border-gray-200">
                  <span className="text-sm text-red-600">
                    Not answered
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <button
          onClick={onRestart}
          className="flex-1 flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
        >
          <RefreshCw size={18} />
          <span>Start New Interview</span>
        </button>
        
        <button
          className="flex-1 flex items-center justify-center space-x-2 border border-indigo-600 text-indigo-600 hover:bg-indigo-50 font-medium py-3 px-4 rounded-md transition-colors"
        >
          <Download size={18} />
          <span>Download Report</span>
        </button>
      </div>
    </div>
  );
};

export default VideoResultsScreen;