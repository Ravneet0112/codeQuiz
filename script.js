const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const welcomeEl = document.getElementById("welcome-page")
var initialsEl= document.getElementById("initials")
const submitEl = document.getElementById("submit")
const highscoreEl = document.getElementById("highscore")
const countdownEL = document.querySelector(".timer");

//const startTime = 5;
//let time = startTime * 60;



let shuffledQuestions, currentQuestionIndex
var result=0

startButton.addEventListener('onclick', startGame())

answerButtonsElement.addEventListener('onclick', () => {
  currentQuestionIndex++;
  setNextQuestion();
})

function startGame() {
  
  startButton.classList.add('hide')
  welcomeEl.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
 
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct;
      result = result+5;
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex +1) {
    nextButton.classList.remove('hide')
  } else {
    initialsEl.classList.remove('hide')
    startButton.classList.remove('hide')
   
    resetState();
    initials();
    showQuestion.hide(); 
  }
}
//submitEl.addEventListener('click', highscore());
function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

function initials(){
  clearStatusClass(document.body)
  initialsEl.classList.remove('hide')
  
}

function highscore(){
  clearStatusClass(document.body)
  highscoreEl.classList.remove('hide')
}

const questions = [
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '4', correct: true },
      { text: '22', correct: false }
    ]
  },
  {
    question: 'Who is the best YouTuber?',
    answers: [
      { text: 'Web Dev Simplified', correct: true },
      { text: 'Traversy Media', correct: true },
      { text: 'Dev Ed', correct: true },
      { text: 'Fun Fun Function', correct: true }
    ]
  },
  {
    question: 'Is web development fun?',
    answers: [
      { text: 'Kinda', correct: false },
      { text: 'YES!!!', correct: true },
      { text: 'Um no', correct: false },
      { text: 'IDK', correct: false }
    ]
  },
  {
    question: 'What is 4 * 2?',
    answers: [
      { text: '6', correct: false },
      { text: '8', correct: true }
    ]
  }
]

/* function updateCountdown() {
    const minutes = Math.floor(time/60);
    let seconds = time % 60;
  
    seconds = seconds < 10 ? '0'+seconds : seconds;
  
    countdownEL.innerHTML = `${minutes}: ${seconds}`;
    time--;
  
    if (minutes <= 0 || seconds <=0){
      clearInterval();
    }
  
    if (answerButtonsElement == correct){
    time--;
    }
    else{
      time-60;
    }
    
  }*/