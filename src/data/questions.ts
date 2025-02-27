import { Question } from '../types';

export const categories = [
  { value: 'react', label: 'React' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'css', label: 'CSS' },
  { value: 'html', label: 'HTML' },
  { value: 'node', label: 'Node.js' },
  { value: 'general', label: 'General' },
];

export const questions: Question[] = [
  {
    id: 1,
    question: "What is React and why would you use it?",
    category: "react"
  },
  {
    id: 2,
    question: "Explain the difference between state and props in React.",
    category: "react"
  },
  {
    id: 3,
    question: "What are React hooks? Name some built-in hooks and their use cases.",
    category: "react"
  },
  {
    id: 4,
    question: "Explain the virtual DOM and its benefits.",
    category: "react"
  },
  {
    id: 5,
    question: "What is JSX and why is it used in React?",
    category: "react"
  },
  {
    id: 6,
    question: "Explain closures in JavaScript.",
    category: "javascript"
  },
  {
    id: 7,
    question: "What is the difference between let, const, and var?",
    category: "javascript"
  },
  {
    id: 8,
    question: "Explain promises and async/await in JavaScript.",
    category: "javascript"
  },
  {
    id: 9,
    question: "What is event delegation in JavaScript?",
    category: "javascript"
  },
  {
    id: 10,
    question: "Explain the concept of hoisting in JavaScript.",
    category: "javascript"
  },
  {
    id: 11,
    question: "What is the box model in CSS?",
    category: "css"
  },
  {
    id: 12,
    question: "Explain the difference between flexbox and grid in CSS.",
    category: "css"
  },
  {
    id: 13,
    question: "What are CSS preprocessors and why would you use them?",
    category: "css"
  },
  {
    id: 14,
    question: "Explain CSS specificity and how it works.",
    category: "css"
  },
  {
    id: 15,
    question: "What are media queries and how do they work?",
    category: "css"
  },
  {
    id: 16,
    question: "What is semantic HTML and why is it important?",
    category: "html"
  },
  {
    id: 17,
    question: "Explain the difference between localStorage and sessionStorage.",
    category: "html"
  },
  {
    id: 18,
    question: "What are data attributes in HTML and how are they used?",
    category: "html"
  },
  {
    id: 19,
    question: "Explain the purpose of the <meta> tag in HTML.",
    category: "html"
  },
  {
    id: 20,
    question: "What is the difference between HTML and XHTML?",
    category: "html"
  },
  {
    id: 21,
    question: "Explain the event loop in Node.js.",
    category: "node"
  },
  {
    id: 22,
    question: "What is the difference between Node.js and browser JavaScript?",
    category: "node"
  },
  {
    id: 23,
    question: "Explain middleware in Express.js.",
    category: "node"
  },
  {
    id: 24,
    question: "What is the purpose of package.json in a Node.js project?",
    category: "node"
  },
  {
    id: 25,
    question: "Explain the concept of streams in Node.js.",
    category: "node"
  },
  {
    id: 26,
    question: "Tell me about yourself and your experience.",
    category: "general"
  },
  {
    id: 27,
    question: "What are your strengths and weaknesses as a developer?",
    category: "general"
  },
  {
    id: 28,
    question: "Describe a challenging project you worked on and how you overcame obstacles.",
    category: "general"
  },
  {
    id: 29,
    question: "How do you stay updated with the latest technologies and trends?",
    category: "general"
  },
  {
    id: 30,
    question: "Where do you see yourself in 5 years?",
    category: "general"
  }
];

export const getQuestionsByCategory = (category: string): Question[] => {
  if (category === 'all') {
    return questions;
  }
  return questions.filter(q => q.category === category);
};