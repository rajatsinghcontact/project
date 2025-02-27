export interface Question {
  id: number;
  question: string;
  category: string;
}

export interface InterviewState {
  status: 'idle' | 'interviewing' | 'completed' | 'setup' | 'results';
  currentQuestionIndex: number;
  questions: Question[];
  answers: Record<number, string>;
  feedback: Record<number, string>;
  selectedCategory: string;
  audioEnabled: boolean;
  videoEnabled: boolean;
  jobPosition: string;
  jobDescription: string;
  yearsOfExperience: number;
  overallRating?: number;
}

export interface CategoryOption {
  value: string;
  label: string;
}

export interface UserProfile {
  jobPosition: string;
  jobDescription: string;
  yearsOfExperience: number;
}