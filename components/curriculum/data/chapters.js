const chapters = [
  {
    id: 1,
    title: "Kenalan",
    description:
      "Master basic Javanese greetings, introductions, and simple conversation starters!",
    order: 1,
    phases: [
      { id: 1, name: "Pretest" },
      { id: 2, name: "Number", pdfFile: "chapter-1.pdf" },
      { id: 3, name: "Color", pdfFile: "chapter-1.pdf" },
      { id: 4, name: "Posttest" },
    ],
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
      {
        question: "How do you say 'Good morning' in Javanese?",
        options: [
          "Sugeng Enjing",
          "Sugeng Rawuh",
          "Sugeng Dalu",
          "Sugeng Siang",
        ],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 2,
    title: "Pitutur kang Becik",
    description:
      "Learn about good advice and wise sayings in Javanese culture.",
    order: 2,
    phases: [
      { id: 1, name: "Pretest" },
      { id: 2, name: "Wisdom", pdfFile: "chapter-1.pdf" },
      { id: 3, name: "Proverbs", pdfFile: "chapter-1.pdf" },
      { id: 4, name: "Posttest" },
    ],
    questions: [
      {
        question: "What does 'Aja nganti nyangkruk' mean?",
        options: [
          "Don’t rush",
          "Don’t be lazy",
          "Don’t sit idly",
          "Don’t be rude",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which of these is a Javanese proverb?",
        options: [
          "Aja nggo ngongkon",
          "Ngundhuh wohing pakarti",
          "Rungokna wong tuwa",
          "Aja tumindak kaya lemah",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    id: 3,
    title: "Budi Pekerti",
    description:
      "Learn about good manners and how to behave respectfully in Javanese culture.",
    order: 3,
    phases: [
      { id: 1, name: "Pretest" },
      { id: 2, name: "Respect", pdfFile: "chapter-1.pdf" },
      { id: 3, name: "Etiquette", pdfFile: "chapter-1.pdf" },
      { id: 4, name: "Posttest" },
    ],
    questions: [
      {
        question: "How do you show respect in Javanese culture?",
        options: [
          "Always speak loudly",
          "Use polite words",
          "Ignore elders",
          "Show anger",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which of these is not considered polite in Javanese?",
        options: [
          "Speaking slowly",
          "Addressing elders with respect",
          "Interrupting conversations",
          "Offering help to others",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    id: 4,
    title: "Perangane Awak",
    description: "Learn the Javanese vocabulary related to body parts.",
    order: 4,
    phases: [
      { id: 1, name: "Pretest" },
      { id: 2, name: "Head and Neck", pdfFile: "chapter-1.pdf" },
      {
        id: 3,
        name: "Limbs and Hands",
        pdfFile: "chapter-1.pdf",
      },
      { id: 4, name: "Posttest" },
    ],
    questions: [
      {
        question: "What is the Javanese word for 'Hand'?",
        options: ["Tangan", "Wajah", "Kaki", "Tulung"],
        correctAnswer: 0,
      },
      {
        question: "Which part of the body is 'Sirah' in Javanese?",
        options: ["Head", "Leg", "Arm", "Eye"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 5,
    title: "Ayo, Dolanan",
    description: "Explore Javanese traditional games and fun activities.",
    order: 5,
    phases: [
      { id: 1, name: "Pretest" },
      {
        id: 2,
        name: "Traditional Games",
        pdfFile: "chapter-1.pdf",
      },
      { id: 3, name: "Toys", pdfFile: "chapter-1.pdf" },
      { id: 4, name: "Posttest" },
    ],
    questions: [
      {
        question: "Which of these is a traditional Javanese game?",
        options: ["Sepak Bola", "Congklak", "Monopoli", "Kartu Remi"],
        correctAnswer: 1,
      },
      {
        question: "What is the Javanese name for 'Doll'?",
        options: ["Boneka", "Topi", "Gasing", "Wayang"],
        correctAnswer: 0,
      },
    ],
  },
  {
    id: 6,
    title: "Ndongeng Fabel",
    description: "Learn about Javanese fairy tales and storytelling.",
    order: 6,
    phases: [
      { id: 1, name: "Pretest" },
      { id: 2, name: "Fairy Tales", pdfFile: "chapter-1.pdf" },
      {
        id: 3,
        name: "Storytelling",
        pdfFile: "chapter-1.pdf",
      },
      { id: 4, name: "Posttest" },
    ],
    questions: [
      {
        question: "What is a common theme in Javanese fairy tales?",
        options: ["Good vs Evil", "Love stories", "Friendship", "Adventure"],
        correctAnswer: 0,
      },
      {
        question:
          "Which of these animals is often featured in Javanese fables?",
        options: ["Tiger", "Crocodile", "Elephant", "Monkey"],
        correctAnswer: 3,
      },
    ],
  },
];

export default chapters;
