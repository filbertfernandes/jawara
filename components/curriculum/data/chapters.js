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
  {
    id: 2,
    image: "",
    title: "Pitutur kang Becik",
    description:
      "Learn about good advice and wise sayings in Javanese culture.",
    order: 2,
    contents: [
      { name: "Wisdom", pdfPath: "/ppt/wisdom.pdf" },
      { name: "Proverbs", pdfPath: "/ppt/proverbs.pdf" },
    ],
    contentsCount: 2,
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
    image: "",
    title: "Budi Pekerti",
    description:
      "Learn about good manners and how to behave respectfully in Javanese culture.",
    order: 3,
    contents: [
      { name: "Respect", pdfPath: "/ppt/respect.pdf" },
      { name: "Etiquette", pdfPath: "/ppt/etiquette.pdf" },
    ],
    contentsCount: 2,
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
    image: "",
    title: "Perangane Awak",
    description: "Learn the Javanese vocabulary related to body parts.",
    order: 4,
    contents: [
      { name: "Head and Neck", pdfPath: "/ppt/head-neck.pdf" },
      { name: "Limbs and Hands", pdfPath: "/ppt/limbs-hands.pdf" },
    ],
    contentsCount: 2,
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
    image: "",
    title: "Ayo, Dolanan",
    description: "Explore Javanese traditional games and fun activities.",
    order: 5,
    contents: [
      { name: "Traditional Games", pdfPath: "/ppt/traditional-games.pdf" },
      { name: "Toys", pdfPath: "/ppt/toys.pdf" },
    ],
    contentsCount: 2,
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
    image: "",
    title: "Ndongeng Fabel",
    description: "Learn about Javanese fairy tales and storytelling.",
    order: 6,
    contents: [
      { name: "Fairy Tales", pdfPath: "/ppt/fairy-tales.pdf" },
      { name: "Storytelling", pdfPath: "/ppt/storytelling.pdf" },
    ],
    contentsCount: 2,
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
