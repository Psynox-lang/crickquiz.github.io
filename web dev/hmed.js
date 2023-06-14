const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  
  {
    question:
      "How long is the wicket on a cricket pitch?",
    choice1: "18 yards",
    choice2: "20 yards",
    choice3: "22 yards",
    choice4: "16 yards",
    answer: 3
  },
  {
    question: "Which fast bowler has taken the most test wickets?",
    choice1: "Stuart Broad",
    choice2: "Dale Steyn",
    choice3: "James Anderson",
    choice4: "Glen McGrath",
    answer: 3
  },
  {
    question:
      "Which Australian player has scored the most test runs?",
    choice1: "Matthew Hayden",
    choice2: "Ricky Ponting",
    choice3: "Don Bradman",
    choice4: "Steve Smith",
    answer: 2
  },
  {
    question:"Who is the first batsman to cross 10,000 runs in tests?",
    choice1:"Sunil Gavaskar",
    choice2:"Sachin Tendulkar",
    choice3:"Brian Lara",
    choice4:"Allan Border",
    answer: 1
  },
  {
    question:" Who bowled the fastest delivery ever of 100.2mph?",
    choice1:"Brett Lee",
    choice2:"Shaun Tait",
    choice3:"Dale Steyn",
    choice4:"Shoaib Akhtar",
    answer:4
  }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();