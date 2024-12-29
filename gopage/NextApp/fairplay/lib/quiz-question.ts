export interface QuizQuestion {
    id: string
    question: string
    options: {
      id: string
      text: string
    }[]
    correctAnswer: string
  }
  
  export const quizQuestions: QuizQuestion[] = [
    {
      id: "q1",
      question: "Which of these is a common warning sign of steroid abuse?",
      options: [
        { id: "a1", text: "Rapid muscle growth and mood swings" },
        { id: "a2", text: "Improved concentration" },
        { id: "a3", text: "Better sleep patterns" },
        { id: "a4", text: "Increased appetite only" }
      ],
      correctAnswer: "a1"
    },
    {
      id: "q2",
      question: "What is the main purpose of WADA (World Anti-Doping Agency)?",
      options: [
        { id: "a1", text: "To organize sporting events" },
        { id: "a2", text: "To promote sports globally" },
        { id: "a3", text: "To protect clean sport and athletes" },
        { id: "a4", text: "To sell sporting equipment" }
      ],
      correctAnswer: "a3"
    },
    {
      id: "q3",
      question: "What are the potential consequences of doping in sports?",
      options: [
        { id: "a1", text: "Only temporary suspension" },
        { id: "a2", text: "Health risks and career ban" },
        { id: "a3", text: "Minor fines only" },
        { id: "a4", text: "No serious consequences" }
      ],
      correctAnswer: "a2"
    },
    {
      id: "q4",
      question: "Which is NOT a banned substance category in sports?",
      options: [
        { id: "a1", text: "Anabolic agents" },
        { id: "a2", text: "Regular vitamins" },
        { id: "a3", text: "Blood doping" },
        { id: "a4", text: "Growth hormones" }
      ],
      correctAnswer: "a2"
    },
    {
      id: "q5",
      question: "What should an athlete do if they need medication for a health condition?",
      options: [
        { id: "a1", text: "Take it without telling anyone" },
        { id: "a2", text: "Avoid all medication" },
        { id: "a3", text: "Apply for a Therapeutic Use Exemption" },
        { id: "a4", text: "Only use it during off-season" }
      ],
      correctAnswer: "a3"
    }
  ]
  
  