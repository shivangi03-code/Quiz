// Programming Quiz Questions
const quizQuestions = [

   { 
    question: "Which language is used to style web pages?", 
    options: ["C", "Python", "CSS", "SQL"], 
    answer: "CSS" 
  },

  { 
    question: "Which programming language runs in the browser?", 
    options: ["C++", "PHP", "Python", "JavaScript"], 
    answer: "JavaScript" 
  },


  { 
    question: "Which data type holds true or false values?", 
    options: ["Boolean", "String", "Number", "Array"], 
    answer: "Boolean" 
  },

  { 
    question: "What does CSS stand for?", 
    options: ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style System", "Creative Style Syntax"], 
    answer: "Cascading Style Sheets" 
  },


  { 
    question: "Which of these is NOT a programming language?", 
    options: ["HTML", "Python", "Java", "C#"], 
    answer: "HTML" 
  },

  { 
    question: "What is used to store multiple values in one variable?", 
    options: ["Function", "String", "Boolean", "Array"], 
    answer: "Array" 
  },

  { 
    question: "Which function prints output in the browser console?", 
    options: ["output()", "print()", "log.console()", "console.log()"], 
    answer: "console.log()" 
  },


  { 
    question: "What is the correct file extension for JavaScript?", 
    options: [".js", ".java", ".script", ".jss"], 
    answer: ".js" 
  },


  { 
    question: "Which HTML attribute specifies a link URL?", 
    options: [ "src", "href","ref", "link"], 
    answer: "href" 
  },

  { 
    question: "Which programming language is known as the 'mother of all languages'?", 
    options: ["C", "Python", "Java", "Ruby"], 
    answer: "C" 
  }
];


// DOM Elements
const userInfoBox = document.getElementById("user-info");
const startButton = document.getElementById("start-btn");
const usernameInput = document.getElementById("username");
const useremailInput = document.getElementById("useremail");

const questionBox = document.getElementById("question-box");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");

const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const submitButton = document.getElementById("submit-btn");
const navButtons = document.getElementById("nav-buttons");

const submittedBox = document.getElementById("submitted-box");
const viewScoreBtn = document.getElementById("view-score-btn");

const resultBox = document.getElementById("result");
const scoreElement = document.getElementById("score");
const answersList = document.getElementById("answers-list");
const restartButton = document.getElementById("restart-btn");

let questionIndex = 0;
let quizScore = 0;
let userAnswers = new Array(quizQuestions.length).fill(null);

// START QUIZ
startButton.addEventListener("click", () => {
  if (!usernameInput.value.trim() || !useremailInput.value.trim()) {
    alert("Please enter your name and email!");
    return;
  }
  userInfoBox.classList.add("hide");
  questionBox.classList.remove("hide");
  navButtons.classList.remove("hide");
  displayQuestion();
});

// DISPLAY QUESTION
function displayQuestion() {
  const currentQuestion = quizQuestions[questionIndex];
  const labels = ["A", "B", "C", "D"];
  questionElement.innerText = `${questionIndex + 1}. ${currentQuestion.question}`;
  optionsElement.innerHTML = "";

  questionBox.classList.remove("fade");
  void questionBox.offsetWidth;
  questionBox.classList.add("fade");

  nextButton.classList.remove("hide");
  submitButton.classList.add("hide");
  if (questionIndex === quizQuestions.length - 1) {
    nextButton.classList.add("hide");
    submitButton.classList.remove("hide");
  }

  nextButton.disabled = true;
  prevButton.disabled = questionIndex === 0;

  currentQuestion.options.forEach((option, i) => {
    const li = document.createElement("li");
    li.classList.add("option-item");
    li.innerHTML = `<strong>${labels[i]}</strong> ${option}`;

    if (userAnswers[questionIndex] === option) {
      li.classList.add("selected");
      nextButton.disabled = false;
    }

    li.addEventListener("click", () => handleOptionClick(option, li));
    optionsElement.appendChild(li);
  });
}

// HANDLE OPTION CLICK
function handleOptionClick(selectedOption, element) {
  const allOptions = optionsElement.querySelectorAll("li");
  allOptions.forEach(li => li.classList.remove("selected"));
  element.classList.add("selected");
  userAnswers[questionIndex] = selectedOption;
  nextButton.disabled = false;
}

// NAVIGATION
nextButton.addEventListener("click", () => {
  if (questionIndex < quizQuestions.length - 1) questionIndex++;
  displayQuestion();
});

prevButton.addEventListener("click", () => {
  if (questionIndex > 0) questionIndex--;
  displayQuestion();
});

// SUBMIT QUIZ
submitButton.addEventListener("click", () => {
  submittedBox.classList.remove("hide");
  navButtons.classList.add("hide");
  questionBox.classList.add("hide");
});

// VIEW SCORE
viewScoreBtn.addEventListener("click", () => {
  calculateScore();
  showResult();
});

// CALCULATE SCORE
function calculateScore() {
  quizScore = userAnswers.reduce((score, answer, index) => {
    return answer === quizQuestions[index].answer ? score + 1 : score;
  }, 0);
}

// SHOW RESULT
function showResult() {
  submittedBox.classList.add("hide");
  resultBox.classList.remove("hide");

  scoreElement.innerText = `${quizScore} / ${quizQuestions.length}`;
  answersList.innerHTML = "";

  const labels = ["A", "B", "C", "D"];

  quizQuestions.forEach((q, index) => {
    const li = document.createElement("li");
    li.classList.add("review-question");

    let optionsHTML = q.options.map((option, i) => {
      const label = labels[i];
      if (option === q.answer) return `<span class="option correct"><strong>${label}</strong> ${option}</span>`;
      else if (option === userAnswers[index]) return `<span class="option wrong"><strong>${label}</strong> ${option}</span>`;
      else return `<span class="option"><strong>${label}</strong> ${option}</span>`;
    }).join("");

    li.innerHTML = `<strong>Q${index + 1}:</strong> ${q.question}<br>${optionsHTML}`;
    answersList.appendChild(li);
  });
}

// RESTART QUIZ
restartButton.addEventListener("click", () => {
  questionIndex = 0;
  quizScore = 0;
  userAnswers.fill(null);
  resultBox.classList.add("hide");
  userInfoBox.classList.remove("hide");
  usernameInput.value = "";
  useremailInput.value = "";
});


