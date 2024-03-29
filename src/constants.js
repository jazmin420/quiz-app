export const QuizQ = {
questions: [
  {
      "id": 1,
      "question": "What is ReactJS?",
      "choices": [
          "A server-side framework",
          "A front-end JavaScript library",
          "A back-end JavaScript framework",
          "A database management system"
      ],
      "type": "MCQs",
      "correctAnswer": "A front-end JavaScript library"
  },
  {
      "id": 2,
      "question": "Which company developed ReactJS?",
      "choices": [
          "Facebook",
          "Google",
          "Microsoft",
          "Apple"
      ],
      "type": "MCQs",
      "correctAnswer": "Facebook"
  },
  {
      "id": 3,
      "question": "What is JSX in ReactJS?",
      "choices": [
          "A syntax extension for JavaScript",
          "A templating engine",
          "A state management library",
          "A build tool"
      ],
      "type": "MCQs",
      "correctAnswer": "A syntax extension for JavaScript"
  },
  {
      "id": 4,
      "question": "In React, what is used to pass data to a component from outside?",
      "choices": [
          "setState",
          "props",
          "state",
          "getInitialState"
      ],
      "type": "MCQs",
      "correctAnswer": "props"
  },
  {
      "id": 5,
      "question": "What is the purpose of the virtual DOM in React?",
      "choices": [
          "To improve website security",
          "To optimize database queries",
          "To improve performance by minimizing DOM manipulation",
          "To handle server-side rendering"
      ],
      "type": "MCQs",
      "correctAnswer": "To improve performance by minimizing DOM manipulation"
  }
]
};
export const resultInitialState = {
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0
}