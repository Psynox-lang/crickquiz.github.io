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
    question: "What is the largest cricket stadium in the world?",
    choice1: "Melbourne Cricket Ground, Melbourne",
    choice2: "Eden Gardens, Kolkata",
    choice3: "Lords, London",
    choice4: "Narendra Modi Stadium, Ahmedabad",
    answer: 4
  },
  {
    question:"How many ways are there to get a batsman out?",
    choice1:"10",
    choice2: "5",
    choice3: "6",
    choice4: "8",
    answer:1
  },
  {
    question: " Who did England beat in the final of the 2019 Cricket World Cup?",

    choice1: "South Africa",
    choice2: "New Zealand",
    choice3: "Australia",
    choice4: "India",
    answer: 2
  },
  {
    question:"Where will the 2023 Cricket World Cup be hosted?",

    choice1:"India",
    choice2:"Australia",
    choice3:"England",
    choice4:"West Indies",
    answer: 1

  },
  {
  question:
      "Who won the first ever Cricket World Cup in 1975?",
    choice1: "West Indies",
    choice2: "Australia",
    choice3: "England",
    choice4: "India",
    answer: 1
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