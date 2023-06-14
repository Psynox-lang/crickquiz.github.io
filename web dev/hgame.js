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
    question: "When was the Ashes first played?",
    choice1: "1872",
    choice2: "1877",
    choice3: "1882",
    choice4: "1887",
    answer: 3
  },
  {
    question:
      "How long did the longest cricket match in history go on for?",
    choice1: "5",
    choice2: "12",
    choice3: "6",
    choice4: "8",
    answer: 2
  },
  {
    question: "Which legendary bowler has the nickname 'Whispering Death?",
    choice1: "Curtly Ambrose",
    choice2: "Wasim Akram",
    choice3: "Michael Holding",
    choice4: "Dennis Lille",
    answer: 3
  },
  {
    question: "How many inches is the circumference of a standard Cricket ball?",
    choice1: "9.1",
    choice2: "10.2",
    choice3: "7.8",
    choice4: "8.7",
    answer: 1
  },
  {
    question:"The first official international match of cricket was held in 1844 between...",
    choice1:"Australia and England",
    choice2:"India and England",
    choice3:"England and West Indies",
    choice4:"USA and Canada",
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