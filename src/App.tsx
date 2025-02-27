import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import StartScreen from './components/StartScreen';
import SetupScreen from './components/SetupScreen';
import VideoQuestionScreen from './components/VideoQuestionScreen';
import VideoFeedbackScreen from './components/VideoFeedbackScreen';
import VideoResultsScreen from './components/VideoResultsScreen';
import { categories, getQuestionsByCategory } from './data/questions';
import { generateFeedback } from './utils/feedbackGenerator';
import { InterviewState, UserProfile } from './types';

function App() {
  const [state, setState] = useState<InterviewState>({
    status: 'idle',
    currentQuestionIndex: 0,
    questions: [],
    answers: {},
    feedback: {},
    selectedCategory: 'all',
    audioEnabled: true,
    videoEnabled: true,
    jobPosition: '',
    jobDescription: '',
    yearsOfExperience: 0,
  });

  const [showLanding, setShowLanding] = useState(true);

  useEffect(() => {
    // Load questions when category changes
    const questions = getQuestionsByCategory(state.selectedCategory);
    setState(prevState => ({
      ...prevState,
      questions
    }));
  }, [state.selectedCategory]);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  const handleSelectCategory = (category: string) => {
    setState(prevState => ({
      ...prevState,
      selectedCategory: category
    }));
  };

  const handleStartInterview = () => {
    setState(prevState => ({
      ...prevState,
      status: 'setup',
    }));
  };

  const handleSetupComplete = (profile: UserProfile) => {
    setState(prevState => ({
      ...prevState,
      jobPosition: profile.jobPosition,
      jobDescription: profile.jobDescription,
      yearsOfExperience: profile.yearsOfExperience,
      status: 'interviewing',
      currentQuestionIndex: 0,
      answers: {},
      feedback: {}
    }));
  };

  const handleToggleAudio = () => {
    setState(prevState => ({
      ...prevState,
      audioEnabled: !prevState.audioEnabled
    }));
  };

  const handleToggleVideo = () => {
    setState(prevState => ({
      ...prevState,
      videoEnabled: !prevState.videoEnabled
    }));
  };

  const handleSubmitAnswer = (answer: string) => {
    const { currentQuestionIndex, questions } = state;
    const currentQuestion = questions[currentQuestionIndex];
    
    // Generate feedback for the answer
    const feedback = generateFeedback(currentQuestion.question, answer);
    
    setState(prevState => ({
      ...prevState,
      answers: {
        ...prevState.answers,
        [currentQuestion.id]: answer
      },
      feedback: {
        ...prevState.feedback,
        [currentQuestion.id]: feedback
      },
      status: 'completed'
    }));
  };

  const handleNextQuestion = () => {
    const { currentQuestionIndex, questions } = state;
    
    if (currentQuestionIndex < questions.length - 1) {
      setState(prevState => ({
        ...prevState,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        status: 'interviewing'
      }));
    } else {
      // End of interview - show results
      setState(prevState => ({
        ...prevState,
        status: 'results',
        overallRating: (Math.floor(Math.random() * 5) + 6) / 10 // Random rating between 0.6 and 1.0
      }));
    }
  };

  const handleRestartInterview = () => {
    setState(prevState => ({
      ...prevState,
      status: 'idle',
      currentQuestionIndex: 0,
      answers: {},
      feedback: {}
    }));
  };

  const renderContent = () => {
    if (showLanding) {
      return <LandingPage onGetStarted={handleGetStarted} />;
    }
    
    const { status, currentQuestionIndex, questions, answers, feedback, audioEnabled, videoEnabled, overallRating } = state;
    
    if (questions.length === 0) {
      return (
        <div className="text-center p-8">
          <p>Loading questions...</p>
        </div>
      );
    }
    
    if (status === 'idle') {
      return (
        <StartScreen
          onStart={handleStartInterview}
          categories={categories}
          selectedCategory={state.selectedCategory}
          onSelectCategory={handleSelectCategory}
        />
      );
    }

    if (status === 'setup') {
      return (
        <SetupScreen 
          onComplete={handleSetupComplete}
          initialProfile={{
            jobPosition: state.jobPosition,
            jobDescription: state.jobDescription,
            yearsOfExperience: state.yearsOfExperience
          }}
        />
      );
    }
    
    const currentQuestion = questions[currentQuestionIndex];
    
    if (status === 'interviewing') {
      return (
        <VideoQuestionScreen
          question={currentQuestion}
          onSubmitAnswer={handleSubmitAnswer}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={questions.length}
          audioEnabled={audioEnabled}
          videoEnabled={videoEnabled}
          onToggleAudio={handleToggleAudio}
          onToggleVideo={handleToggleVideo}
        />
      );
    }
    
    if (status === 'completed') {
      const isLastQuestion = currentQuestionIndex === questions.length - 1;
      
      if (currentQuestion) {
        return (
          <VideoFeedbackScreen
            question={currentQuestion}
            answer={answers[currentQuestion.id] || ''}
            feedback={feedback[currentQuestion.id] || ''}
            onNext={handleNextQuestion}
            isLastQuestion={isLastQuestion}
          />
        );
      }
    }
    
    if (status === 'results') {
      return (
        <VideoResultsScreen
          questions={questions}
          answers={answers}
          feedback={feedback}
          onRestart={handleRestartInterview}
          overallRating={overallRating}
        />
      );
    }
    
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}

export default App;