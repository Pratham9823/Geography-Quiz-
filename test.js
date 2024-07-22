const questions = [
  {
    question: "Khardung La mountain pass is located in which Indian state or Union Territory?",
    answers: [
      { text: "Himachal Pradesh", correct: false },
      { text: "Uttarakhand", correct: false },
      { text: "Jammu & Kashmir", correct: true },
      { text: "Sikkim", correct: false },
    ],
  },
  {
    question: "Which among the following is considered to be the best soil for plant growth?",
    answers: [
      { text: "Sand", correct: false },
      { text: "Clay", correct: false },
      { text: "Loam", correct: true },
      { text: "Silt", correct: false },
    ],
  },
  {
    question: "Which of the following Union Territories of India has the largest size?",
    answers: [
      { text: "Chandigarh", correct: false },
      { text: "Andaman and Nicobar", correct: true },
      { text: "Puducherry", correct: false },
      { text: "Daman and Diu", correct: false },
    ],
  },
  {
    question: "Which among the following rivers of India originate from the Western Ghats?",
    answers: [
      { text: "Godavari", correct: false },
      { text: "Kaveri", correct: false },
      { text: "Kabam", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next_btn");

let currentQuestionIndex = 0;
let score = 0;
let shuffledQuestions = [];

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  shuffledQuestions = shuffleArray(questions);
  nextButton.innerHTML = "Next";
  showQuestion();
}

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function showQuestion() {
  resetState();
  let currentQuestion = shuffledQuestions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === true;
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === true) {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < shuffledQuestions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();