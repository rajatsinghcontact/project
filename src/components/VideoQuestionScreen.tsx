import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Clock, Mic, MicOff, Video, VideoOff } from 'lucide-react';
import Webcam from 'react-webcam';
import { Question } from '../types';

interface VideoQuestionScreenProps {
  question: Question;
  onSubmitAnswer: (answer: string) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
  audioEnabled: boolean;
  videoEnabled: boolean;
  onToggleAudio: () => void;
  onToggleVideo: () => void;
}

const VideoQuestionScreen: React.FC<VideoQuestionScreenProps> = ({
  question,
  onSubmitAnswer,
  currentQuestionIndex,
  totalQuestions,
  audioEnabled,
  videoEnabled,
  onToggleAudio,
  onToggleVideo,
}) => {
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);

  useEffect(() => {
    let timer: number | undefined;
    
    if (isTimerActive && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      handleStopRecording();
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

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordedChunks([]);
    
    if (webcamRef.current && webcamRef.current.stream) {
      mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
        mimeType: 'video/webm'
      });
      mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
      mediaRecorderRef.current.start();
    }
  };

  const handleDataAvailable = ({ data }: BlobEvent) => {
    if (data.size > 0) {
      setRecordedChunks((prev) => [...prev, data]);
    }
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  };

  const handleSubmit = () => {
    handleStopRecording();
    if (answer.trim() || recordedChunks.length > 0) {
      // In a real app, you would process the video/audio here
      // For this demo, we'll just use the text answer
      onSubmitAnswer(answer);
      setAnswer('');
      setTimeLeft(300);
      setIsTimerActive(true);
      setRecordedChunks([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col">
          <div className="relative bg-black rounded-lg overflow-hidden h-[300px] mb-4">
            {videoEnabled ? (
              <Webcam
                audio={audioEnabled}
                ref={webcamRef}
                className="absolute inset-0 w-full h-full object-cover"
                mirrored={true}
              />
            ) : (
              <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-800">
                <VideoOff size={48} className="text-gray-400" />
              </div>
            )}
            
            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-4">
              <button
                onClick={onToggleVideo}
                className={`p-2 rounded-full ${videoEnabled ? 'bg-indigo-600' : 'bg-red-600'}`}
                aria-label={videoEnabled ? "Turn off camera" : "Turn on camera"}
              >
                {videoEnabled ? <Video size={20} className="text-white" /> : <VideoOff size={20} className="text-white" />}
              </button>
              
              <button
                onClick={onToggleAudio}
                className={`p-2 rounded-full ${audioEnabled ? 'bg-indigo-600' : 'bg-red-600'}`}
                aria-label={audioEnabled ? "Mute microphone" : "Unmute microphone"}
              >
                {audioEnabled ? <Mic size={20} className="text-white" /> : <MicOff size={20} className="text-white" />}
              </button>
            </div>
          </div>
          
          <div className="flex space-x-2">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
                disabled={!videoEnabled && !audioEnabled}
              >
                Start Recording
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Stop Recording
              </button>
            )}
          </div>
        </div>
        
        <div>
          <label htmlFor="answer" className="block text-sm font-medium text-gray-700 mb-2">
            Your Answer (Text Backup)
          </label>
          <textarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 min-h-[200px]"
            placeholder="Type your answer here as a backup..."
          />
        </div>
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={(!answer.trim() && recordedChunks.length === 0) || isRecording}
        className={`w-full flex items-center justify-center space-x-2 ${
          (answer.trim() || recordedChunks.length > 0) && !isRecording
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

export default VideoQuestionScreen;