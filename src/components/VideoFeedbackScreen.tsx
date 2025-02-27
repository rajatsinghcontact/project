import React from 'react';
import { ThumbsUp, ArrowRight, Video, ChevronDown, ChevronUp } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Question } from '../types';

interface VideoFeedbackScreenProps {
  question: Question;
  answer: string;
  feedback: string;
  onNext: () => void;
  isLastQuestion: boolean;
}

const VideoFeedbackScreen: React.FC<VideoFeedbackScreenProps> = ({
  question,
  answer,
  feedback,
  onNext,
  isLastQuestion,
}) => {
  const [expanded, setExpanded] = React.useState(false);
  
  // Extract rating from feedback if present
  const ratingMatch = feedback.match(/Rating: (\d+\.\d+)\/10/);
  const rating = ratingMatch ? parseFloat(ratingMatch[1]) : null;
  
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="border-b border-gray-200 pb-4 mb-4">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-800">
            {question.question}
          </h3>
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-gray-500 hover:text-gray-700"
            aria-label={expanded ? "Collapse question" : "Expand question"}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
      
      {rating && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Rating:</span>
            <span className={`text-lg font-bold ${
              rating >= 8 ? 'text-green-600' : 
              rating >= 6 ? 'text-yellow-600' : 
              'text-red-600'
            }`}>
              {rating.toFixed(1)}/10
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div 
              className={`h-2.5 rounded-full ${
                rating >= 8 ? 'bg-green-600' : 
                rating >= 6 ? 'bg-yellow-600' : 
                'bg-red-600'
              }`} 
              style={{ width: `${rating * 10}%` }}
            ></div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6 mb-6">
        <div>
          <h4 className="text-md font-medium text-gray-700 mb-2 flex items-center">
            <span className="mr-2">Your Answer:</span>
            {answer.length > 0 && (
              <span className="text-xs bg-blue-100 px-2 py-1 rounded-full text-blue-600">
                Text
              </span>
            )}
            <span className="text-xs bg-indigo-100 px-2 py-1 rounded-full text-indigo-600 ml-1">
              Audio/Video
            </span>
          </h4>
          <div className="bg-gray-50 p-4 rounded-md text-gray-600 whitespace-pre-wrap">
            {answer || "Your answer was provided via audio/video."}
          </div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-md text-gray-700 prose prose-sm max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {feedback}
          </ReactMarkdown>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-4 mt-4">
        <div className="flex items-center mb-4">
          <Video size={18} className="text-indigo-600 mr-2" />
          <h4 className="text-md font-medium text-gray-700">Video Analysis:</h4>
        </div>
        
        <div className="bg-indigo-50 p-4 rounded-md mb-6">
          <h5 className="font-medium text-indigo-800 mb-2">Body Language & Presentation</h5>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Good eye contact maintained throughout</li>
            <li>Natural hand gestures used effectively</li>
            <li>Clear articulation and appropriate speaking pace</li>
            <li>Professional posture and appearance</li>
          </ul>
        </div>
      </div>
      
      <button
        onClick={onNext}
        className="w-full flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
      >
        <span>{isLastQuestion ? 'View Results' : 'Next Question'}</span>
        <ArrowRight size={18} />
      </button>
    </div>
  );
};

export default VideoFeedbackScreen;