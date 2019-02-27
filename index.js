'use strict';

const questions = [
  `What is the effect of this <code>if</code> statement:<br>
  <code>if ((x % 3 === 0) !== (x % 5 === 0)) {
    doSomething();
  }</code>`, 
  
  `What is the effect of this function:<br>
  <p><code>function magic(x) {<br>&ensp;
    if (x === 1) {<br>&ensp;&ensp;
      return 1;<br>&ensp;
    }<br>&ensp;
    return x * magic(x - 1);<br>
  }</code></p>`,

  `What does this function return?<br> 
  <p><code>function makeSomething() {<br>&ensp;
    let a = 0;<br>&ensp;
    return function () {<br>&ensp;&ensp;
      a += 1;<br>&ensp;&ensp;
      return a;<br>&ensp;
    }<br>
  }</code></p>`,

  `How does this expression evaluate:
  <code>2 + 5 * 5 - 2 / 2</code>`,

  `What does this function do:<br>
  <p><code>function zzz(x) {<br>&ensp;
    return x.split('e').join('i');<br>
  }</code></p>`,
];

const answers = [
  ['The statement causes an error',
    'doSomething runs if x is divisible by 3 or 5',
    'doSomething runs if x is divisible by 3 or 5, but not both', 
    'doSomething runs if x is divisible by both 3 and 5'
  ], 
  ['This returns x!, namely 1 * 2 * 3... * x',
    'This causes a reference error since magic is originally undefined',
    'This returns either 1 or undefined',
    'This returns NaN'
  ], 
  ['Undefined',
    'A new function that counts the number of times it has been called',
    'This causes an error',
    '1'
  ], 
  ['16.5',
    '34',
    '4.666...',
    '26'
  ], 
  ['This takes a string x and adds the letter \'i\' after each occurrence of \'e\'',
    'This takes a string x and replaces each letter \'e\' with \'i\'',
    'This takes a number x, divides by e and multiplies by i',
    'This causes a syntax error'
  ],
];

const rightAnswers = [2, 0, 1, 3, 1];

const STORE = {
  view: 'startingPage',
  currentQuestion: null,
  currentResponse: null,
  questionsComplete: 0,
  currentCorrect: 0,
};
console.log('beginning javascript file');

function renderPage() {
  $('section.topOfApp').html(createTop());
  $('form').html(createForm());
}

function createTop() {
  switch (STORE.view) {
  case 'startingPage':
    return '<h1 class="centered">Welcome to the JavaScript Quiz!</h1>';
  case 'questionPage':
    return `<legend><h1>Q${STORE.currentQuestion + 1} ${questions[STORE.currentQuestion]}</h1></legend>`;
  case 'answerPage':
    if (STORE.currentResponse === rightAnswers[STORE.currentQuestion]) {
      return '<h1 class="centered">CORRECT!</h1>';
    } else {
      let correctAnswer = answers[STORE.currentQuestion][rightAnswers[STORE.currentQuestion]];
      return `<h1 class="centered">INCORRECT!</h1>
      <p class="centered">Correct answer: ${correctAnswer}</p>`;
    }
  case 'lastPage':
    return `<h1 class="centered">Quiz Complete!</h1>
    <br>
    <h2 class="centered">FINAL SCORE:<br>
      ${STORE.currentCorrect} correct, ${STORE.questionsComplete - STORE.currentCorrect} incorrect
    </h2>`;
  }
}

function createForm() {
  switch (STORE.view) {
  case 'startingPage':
    return '<div class="centered move-down no-text"><button>Start Quiz</button></div>';
  case 'questionPage':
    return `<fieldset><label><input type="radio" name="answer" value="1" required>${answers[STORE.currentQuestion][0]}</input></label><br>
    <label><input type="radio" name="answer" value="2">${answers[STORE.currentQuestion][1]}</input></label><br>
    <label><input type="radio" name="answer" value="3">${answers[STORE.currentQuestion][2]}</input></label><br>
    <label><input type="radio" name="answer" value="4">${answers[STORE.currentQuestion][3]}</input></label></fieldset><br>
    <div class="centered move-down"><button>Submit</button>
    <p class="centered">Question ${STORE.currentQuestion + 1} of 5</p><p class="centered">Current Score:  ${STORE.currentCorrect} correct, ${STORE.questionsComplete - STORE.currentCorrect} incorrect</p></div>`;
  case 'answerPage':
    return `<div class="centered move-down"><button>Continue</button><p class="centered">Completed ${STORE.currentQuestion + 1} of 5</p><p class="centered">Current Score:  ${STORE.currentCorrect} correct, ${STORE.questionsComplete - STORE.currentCorrect} incorrect</p></div>`;
  case 'lastPage':
    return '<div class="centered move-down no-text"><button>Restart</button></div>';
  }
}

function handleSubmit() {
  $('form').on('click', 'button', function(event){
    event.preventDefault();
    console.log('button triggered');
    console.log('Initial state:', STORE);
    if (STORE.view === 'questionPage') {
      let playerAnswer = $('input[name=answer]:checked').val() - 1;
      if (!isNaN(playerAnswer)) {
        STORE.questionsComplete += 1;
        STORE.currentResponse = playerAnswer;
        if (playerAnswer === rightAnswers[STORE.currentQuestion] ) {
          STORE.currentCorrect += 1;
        }
      } else {
        return;
      }
    } 
    console.log('State after checking for question page', STORE);
    advancePage();
    console.log('State after advancing page', STORE);
    
  });
}

function advancePage() {
  switch(STORE.view) {
  case 'startingPage':
    STORE.currentQuestion = 0,
    STORE.view = 'questionPage';
    break;
  case 'questionPage':
    STORE.view = 'answerPage';
    break;
  case 'answerPage':
    if (STORE.currentQuestion === 4) {
      STORE.view = 'lastPage';
      STORE.currentQuestion = null;
      STORE.currentResponse = null;  
    }
    else {STORE.view = 'questionPage';
      STORE.currentQuestion += 1;
      STORE.currentResponse = null;
    }
    break;
  case 'lastPage':
    STORE.view = 'startingPage';
    STORE.currentQuestion = null;
    STORE.currentResponse = null;
    STORE.questionsComplete = 0;
    STORE.currentCorrect = 0;
  }
  renderPage();
}

function main() {
  console.log('starting main');
  renderPage(); 
  handleSubmit();
}

$(main);