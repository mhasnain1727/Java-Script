//Take the reference of all needed DOM
const userName = document.getElementById("registerName");

const startPage = document.querySelector(".startPage");
const questionPage = document.querySelector(".questionPage");
const resultPage = document.querySelector(".resultPage");

const participantName = document.getElementById("userName");
const startQuiz = document.querySelector(".startQuiz");

//======================================================for start page ============================================================================

//initially display none for question and result page
questionPage.classList.add("d-none");
resultPage.classList.add("d-none");

startQ = () => {
  localStorage.setItem("registerName", userName.value);
  // console.log(localStorage.getItem('registerName'));
  startPage.classList.add("d-none");
  questionPage.classList.remove("d-none");
  participantName.innerHTML = localStorage.getItem("registerName");
};

startQuiz.addEventListener("click", startQ);

// ======================================================for Question page=======================================================================
 
//take the reference of question, all options and response of that question
const question = document.getElementById("quizQuestion");
const response = document.querySelectorAll(".answer");
const option_a = document.getElementById("option_a");
const option_b = document.getElementById("option_b");
const option_c = document.getElementById("option_c");
const option_d = document.getElementById("option_d");
const submitBtn = document.getElementById("submitBtn");
const nextBtn = document.getElementById("nextBtn");
const showAnswer = document.querySelector(".showAnswer");

const questionNumber = document.querySelector(".questionNumber");

//set quizData
const quizData = [
  {
    question: "Which of the following keywords is used to define a variable in Javascript?",
    a: "var",
    b: "let",
    c: "both A and B",
    d: "None of the above",
    correct: "c",
  },
  {
    question: "Upon encountering empty statements, what does the Javascript Interpreter do?",
    a: "Throws an error",
    b: "Ignore the statements",
    c: "Gives a warning",
    d: "None of the above",
    correct: "b",
  },
  {
    question: "Which of the following methods can be used to display data in some form using Javascript?",
    a: "documnet.write()",
    b: "Console.log()",
    c: "window.alert()",
    d: "All of the above",
    correct: "d",
  },
  {
    question: "What keyword is used to check whether a given property is valid or not?",
    a: "is",
    b: "is in",
    c: "exists",
    d: "lies",
    correct: "a",
  },
  {
    question: "What does the Javascript “debugger” statement do?",
    a: "It will debug all errors in the program at runtime",
    b: "It acts as a break point in the program",
    c: "It will debug error in the current statement if any",
    d: "All the above",
    correct: "b",
  },
  {
    question: "When an operator's value is NULL, the typeof returned by the unary operator is:",
    a: "Boolean",
    b: "Undefined",
    c: "Object",
    d: "integer",
    correct: "c",
  },
  {
    question: "Which of the following are closures in Javascript?",
    a: "Variables",
    b: "Functions",
    c: "Objects",
    d: "All the above",
    correct: "d",
  },
  {
    question: "Which of the following is not a Javascript framework?",
    a: "Node",
    b: "Vue",
    c: "React",
    d: "Cassandra",
    correct: "d",
  },
  {
    question: "How to stop an interval timer in Javascript?",
    a: "clearInterval",
    b: "clearTimer",
    c: "intervalOver",
    d: "None of the above",
    correct: "a",
  },
  {
    question: "Which object in Javascript doesn't have a prototype?",
    a: "Base Object",
    b: "All objects have a prototype",
    c: "None of the objects have a prototype",
    d: "None of the above",
    correct: "a",
  },
];


//initialise quizQuestion and score to zero
let quizQuestion = 0;
let score = 0;

displayQuiz();

function displayQuiz() {
  deselectAnswers();
  const quizQuestionData = quizData[quizQuestion];
  question.innerText = quizQuestionData.question;
  option_a.innerText = quizQuestionData.a;
  option_b.innerText = quizQuestionData.b;
  option_c.innerText = quizQuestionData.c;
  option_d.innerText = quizQuestionData.d;
}

//this function is used to deselect the selected button
function deselectAnswers() {
  response.forEach((response) => (response.checked = false));
}

function getSelected() {
  let answer;
  response.forEach((response) => {
    if (response.checked) {
      answer = response.id;
      // console.log(answer,response)
      // console.log("response Id:", response.id, response.checked)
    }
  });
  return answer;
}


// ======================================================for result page=======================================================================

const finalResult = document.querySelector(".result");

//to avoid double submit on signle page/question
var flag = false;

submitBtn.addEventListener("click", () => {
  //check for some validation
  const answer = getSelected();
  if(answer == undefined)
  {
    alert("Please choose an option");
    return;
  }
  if(flag){
    alert("You have already submitted. Please proceed to the next question");
    return;
  }
  flag = true;
  console.log(flag)
  alert("Are you sure you want to submit");
  // console.log("sumbit button fired")
  console.log(answer);
  if (answer) {
    if (answer === quizData[quizQuestion].correct) {
      score++;
      showAnswer.innerHTML = `<p class="h5 text-success">Correct Answer!</p> Go to the next question.`;
    }
    else{
      showAnswer.innerHTML = `<p class="h5 text-danger">Wrong Answer!</p>The correct answer is ${quizData[quizQuestion].correct}`
    }

    quizQuestion++;
  }
});



nextBtn.addEventListener("click", () => {
  flag = false;
  showAnswer.innerHTML = ''
  const answer = getSelected();
  //check for validation
  if(answer === undefined){
    alert("Please select an answer first and then submit it");
    return;
  }
  if (quizQuestion < quizData.length) {
    questionNumber.innerHTML = `Question ${quizQuestion + 1} of ${quizData.length}`;
  }

  if (quizQuestion < quizData.length) {
    displayQuiz();
  } 
  else {
    questionPage.classList.add("d-none");
    resultPage.classList.remove("d-none");

    //finally show the name and score of the participant
    finalResult.innerHTML = `
           You got ${score} out of ${quizData.length} correct <br>
           Name : ${localStorage.getItem("registerName")} <br>
           Score : ${score}<br>   
         `;
  }
});