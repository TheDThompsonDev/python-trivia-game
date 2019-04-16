const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const scoreText = document.getElementById("score");
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
  {
    "question": "What is print(abs(5)) actually asking to be printed out?",
    "choice1": "Addition by Subtraction the value of 5.",
    "choice2": "Absolute Value of 5",
    "choice3": "Around bilateral Solution of 5",
    "choice4": "Absolute by variation of 5",
    "answer": 2
  },
  {
    "question": "Can you use the same name for a local variable as a global variable?",
    "choice1": "Yes, and there is no reason not to.",
    "choice2": "No, it will cause an error.",
    "choice3": "Yes, but it is considered bad form.",
    "choice4": "Yes, but it can cause a while loop to break.",
    "answer": 3
  },
  {
    "question": "How can you make a user's input turn into a number with decimal places?",
    "choice1": "int(input(user_input))",
    "choice2": "input(user_input) = int",
    "choice3": "str(input(user_input));",
    "choice4": "float(input(user_input));",
    "answer": 4
  },
  {
    "question": "An algorithm is:",
    "choice1": "A solution to a problem that can be solved by a computer.",
    "choice2": "A step by step list of instructions that if followed exactly will solve the problem under consideration.",
    "choice3": "A series of instructions implemented in a programming language.",
    "choice4": "A special kind of notation used by computer scientists.",
    "answer": 2
  },
  {
    "question": "What value is printed: print(int(53.785))",
    "choice1": "Nothing is printed. It generates a runtime error.",
    "choice2": "53",
    "choice3": "54",
    "choice4": "53.785",
    "answer": 2
  },
  {
    "question": "What is the best way to use Pi(3.14) in a program to get the most accurate value?",
    "choice1": "3.14",
    "choice2": "Pi",
    "choice3": "math.pi",
    "choice4": "float(pi)",
    "answer": 3
  },
  {
    "question": "Which example best shows how you should write 2 to the power of 10, 2 to the exponent of 10?",
    "choice1": "2 Ex(10)",
    "choice2": "2**10",
    "choice3": "2***10",
    "choice4": "2*10",
    "answer": 2
  },
]


const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 7;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    //go to the end page
    return window.location.assign("/end.html");
  }
    questionCounter++;
      progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
      //Update the progress bar
      progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
  });
    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener('click', e =>{
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
            getNewQuestion()
        }, 500);
    });
    incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};
   
});



startGame();