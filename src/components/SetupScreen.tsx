import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Lightbulb, ArrowRight } from 'lucide-react';

interface SetupScreenProps {
  onComplete: (profile: UserProfile) => void;
  initialProfile?: UserProfile;
}

const SetupScreen: React.FC<SetupScreenProps> = ({ onComplete, initialProfile }) => {
  const [profile, setProfile] = useState<UserProfile>(initialProfile || {
    jobPosition: '',
    jobDescription: '',
    yearsOfExperience: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: name === 'yearsOfExperience' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(profile);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Let's Get Started
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="jobPosition" className="block text-sm font-medium text-gray-700 mb-2">
            Job Role/Job Position
          </label>
          <input
            type="text"
            id="jobPosition"
            name="jobPosition"
            value={profile.jobPosition}
            onChange={handleChange}
            placeholder="e.g., Frontend Developer, Data Scientist"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 mb-2">
            Job Description/Job Stack
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            value={profile.jobDescription}
            onChange={handleChange}
            placeholder="e.g., React, Node.js, AWS"
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 min-h-[100px]"
            required
          />
        </div>
        
        <div className="mb-8">
          <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700 mb-2">
            Years of Experience
          </label>
          <select
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={profile.yearsOfExperience}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="0">0-1 years</option>
            <option value="1">1-2 years</option>
            <option value="2">2-3 years</option>
            <option value="3">3-5 years</option>
            <option value="5">5-7 years</option>
            <option value="7">7-10 years</option>
            <option value="10">10+ years</option>
          </select>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex items-start">
            <Lightbulb size={20} className="text-yellow-500 mr-2 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800">Information</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Enable Video Web Cam and Microphone to start your AI generated mock interview. It has 5 questions which you can answer and at the last you will get report on the basis of your answer. NOTE: We never record your video, web cam access you can disable at any time if you want.
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
                checked={true}
                readOnly
              />
              <span className="ml-2 text-gray-700">Enable WebCam</span>
            </label>
            
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
                checked={true}
                readOnly
              />
              <span className="ml-2 text-gray-700">Enable Microphone</span>
            </label>
          </div>
          
          <button
            type="submit"
            className="flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
          >
            <span>Start Interview</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default SetupScreen;