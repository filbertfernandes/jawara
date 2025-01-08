const chapters = [
  {
    id: 1,
    image: "",
    title: "Kenalan",
    description:
      "Master basic Javanese greetings, introductions, and simple conversation starters!",
    order: 1,
    contents: [
      { name: "Number", pdfPath: "/ppt/number.pdf" },
      { name: "Color", pdfPath: "/ppt/color.pdf" },
    ],
    contentsCount: 2,
    questions: [
      {
        question: "What is the Javanese word for 'Hello'?",
        options: [
          "Sugeng Enjing",
          "Sugeng Rawuh",
          "Sugeng Dalu",
          "Sugeng Siang",
        ],
        correctAnswer: 0,
      },
      {
        question: "How do you say 'What is your name?' in Javanese?",
        options: [
          "Jenengmu sopo?",
          "Jenenge kowe?",
          "Jenengku sopo?",
          "Jenenge aku?",
        ],
        correctAnswer: 2,
      },
    ],
  },
];

export default chapters;
