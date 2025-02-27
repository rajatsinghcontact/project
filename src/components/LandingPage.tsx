import React from 'react';
import { Play, BarChart, MessageSquare, Video } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Ace Your Next Interview</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Practice with AI-powered mock interviews and get personalized feedback
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={onGetStarted}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition-colors flex items-center"
            >
              <Play size={18} className="mr-2" />
              Get Started
            </button>
            <button className="border border-white hover:bg-white hover:text-indigo-900 text-white font-medium py-2 px-6 rounded-md transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Features</h2>
          <p className="text-gray-600 text-center mb-12">
            Our AI Mock Interview platform offers a range of powerful features:
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <Video className="text-blue-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold">AI Mock Interviews</h3>
              </div>
              <p className="text-gray-600">
                Experience realistic interview scenarios with our advanced AI interviewer.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <MessageSquare className="text-blue-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold">Instant Feedback</h3>
              </div>
              <p className="text-gray-600">
                Get detailed, personalized feedback to improve your interview performance.
              </p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <BarChart className="text-blue-600 mr-3" size={24} />
                <h3 className="text-xl font-semibold">Comprehensive Reports</h3>
              </div>
              <p className="text-gray-600">
                Receive detailed reports highlighting your strengths and areas for improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-4">
                "This AI mock interview experience was incredibly helpful. I felt much more confident going into my real interview."
              </p>
              <p className="font-semibold text-right">- Alex Johnson</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <p className="text-gray-600 mb-4">
                "The feedback was spot on and helped me improve my answers. Highly recommend this service!"
              </p>
              <p className="font-semibold text-right">- Sarah Williams</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-3xl font-bold text-center mb-8">Get In Touch</h2>
          <p className="text-center text-gray-600 mb-8">
            Have any questions? Reach out to us and we'll get back to you as soon as possible.
          </p>

          <form className="space-y-4">
            <div>
              <input 
                type="text" 
                placeholder="Your Name" 
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <textarea 
                placeholder="Your Message" 
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div>
              <button 
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-6 rounded-md transition-colors w-full md:w-auto"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;