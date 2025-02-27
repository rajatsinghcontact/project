export const generateFeedback = (question: string, answer: string): string => {
  // In a real application, this would call an AI API like OpenAI
  // For this demo, we'll generate structured feedback similar to the example
  
  if (!answer || answer.trim().length < 20) {
    return `
## Feedback on Your Answer

Your answer was quite brief. In an interview setting, it's important to provide comprehensive responses that demonstrate your knowledge and experience.

### Rating: 0.5/10

### Your Answer:
${answer || "The audio appears to contain only a repeated \"p\" sound. There is no other discernible speech or sound."}

### Correct Answer:
A comprehensive answer would explain the key concepts related to the question, provide examples, and demonstrate your understanding of the topic. For this question, you should discuss the main points, trade-offs, and real-world applications.

### Feedback:
The user's answer is completely irrelevant to the question. It appears there was a technical issue with audio recording or playback. The candidate should re-record their answer, focusing on explaining the key concepts and providing a structured response with examples and practical applications.
`;
  }
  
  // Generate a random rating between 7.0 and 9.8
  const rating = (Math.floor(Math.random() * 28) + 70) / 10;
  
  // Create a "correct answer" based on the question
  let correctAnswer = "";
  if (question.toLowerCase().includes("react")) {
    correctAnswer = "Functional components, combined with hooks, are my preferred way of building React components. They're simpler, easier to test, and generally lead to more readable code. Hooks provide access to features previously only available in class components (like state management, lifecycle, useEffect, useState), and context (useContext). I would choose a functional component over a class component almost always unless I'm working with legacy code, needing to support very old browsers, or encounter a specific edge case not easily handled by hooks.";
  } else if (question.toLowerCase().includes("javascript")) {
    correctAnswer = "JavaScript is a versatile, high-level programming language that supports multiple paradigms including object-oriented, functional, and event-driven programming. It's the primary language for web development, allowing for dynamic content, interactive features, and complex applications in browsers. With Node.js, JavaScript has expanded to server-side development, creating a full-stack ecosystem with a single language.";
  } else if (question.toLowerCase().includes("css")) {
    correctAnswer = "CSS (Cascading Style Sheets) is a styling language used to control the presentation and layout of HTML documents. It separates content from design, allowing for consistent styling across multiple pages. Modern CSS includes features like flexbox and grid for advanced layouts, animations and transitions for interactive elements, and media queries for responsive design.";
  } else {
    correctAnswer = "A comprehensive answer would explain the key concepts related to the question, provide examples, and demonstrate your understanding of the topic. For this question, you should discuss the main points, trade-offs, and real-world applications.";
  }
  
  // Generate feedback based on the question type
  let specificFeedback = "";
  if (question.toLowerCase().includes("react")) {
    specificFeedback = "Your answer shows some understanding of React concepts, but could benefit from more specific examples of when to use functional components vs class components. Consider discussing React's performance optimizations, the rules of hooks, and how the React rendering lifecycle works with functional components.";
  } else if (question.toLowerCase().includes("javascript")) {
    specificFeedback = "Your explanation covers basic JavaScript concepts, but could be enhanced by discussing more advanced topics like closures, the event loop, promises, and async/await. Consider adding examples of how these concepts are applied in real-world scenarios.";
  } else if (question.toLowerCase().includes("css")) {
    specificFeedback = "Your answer demonstrates knowledge of CSS fundamentals, but could be improved by discussing modern CSS techniques like CSS variables, container queries, and CSS-in-JS approaches. Consider explaining how you approach responsive design and browser compatibility issues.";
  } else {
    specificFeedback = "Your answer provides a good foundation, but could be enhanced with more specific examples and practical applications. Consider structuring your response with a clear introduction, main points, and conclusion to better showcase your knowledge.";
  }
  
  return `
## Feedback on Your Answer

### Rating: ${rating.toFixed(1)}/10

### Your Answer:
${answer}

### Correct Answer:
${correctAnswer}

### Feedback:
${specificFeedback}

Your delivery was generally good, with clear articulation and appropriate pacing. To improve your video presentation:
- Maintain consistent eye contact with the camera
- Use hand gestures more deliberately to emphasize key points
- Consider structuring your answer with a clear introduction, main points, and conclusion
- Speak with confidence and authority, avoiding filler words and hesitations

Overall, this was a solid response that demonstrates your knowledge of the subject matter. With the suggested improvements, you could make an even stronger impression in your next interview.
`;
};