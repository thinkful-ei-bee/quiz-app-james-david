'use strict';

const questions = [
  `What is the effect of this if statement:
  if ((x % 3 === 0) !== (x % 5 === 0)) {
    doSomething();
  }`, 
  
  `What is the effect of this function:
  function magic(x) {
    if (x === 1) {
      return 1;
    }
    return x * magic(x - 1);
  }`,

  `What does this function return? 
  function makeSomething() {
    let a = 0;
    return function () {
      a+= 1;
      return a;
    }
  }`,

  `How does this expression evaluate:
  2 + 5 * 5 - 2 / 2`,

  `What does this function do:
  function zzz(x) {
    return x.split('e').join('i');
  }`,
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
  $('section#topOfApp').html(createTop());
  $('form').html(createForm());
}

function createTop() {
  switch (STORE.view) {
  case 'startingPage':
    return '<h1>Welcome to the JavaScript Quiz!</h1>';
  case 'questionPage':
    return `<h1>Q${STORE.currentQuestion + 1} ${questions[STORE.currentQuestion]}</h1>`;
  case 'answerPage':
    if (STORE.currentResponse === rightAnswers[STORE.currentQuestion]) {
      return '<h1>CORRECT!</h1>';
    } else {
      let correctAnswer = answers[STORE.currentQuestion][rightAnswers[STORE.currentQuestion]];
      return `<h1>INCORRECT!</h1>
      <p>Correct answer: ${correctAnswer}</p>`;
    }
  case 'lastPage':
    return `<h1>Quiz Complete!</h1>
    <br>
    <h2>FINAL SCORE:<br>
      ${STORE.currentCorrect} correct, ${5 - STORE.currentCorrect} incorrect
    </h2>`;
  }
}

function createForm() {
  switch (STORE.view) {
  case 'startingPage':
    return '<button type="submit">Start Quiz</button>';
  case 'questionPage':
    return `<input type="radio" name="answer" value="1" required>${answers[STORE.currentQuestion][0]}</input><br>
    <input type="radio" name="answer" value="2">${answers[STORE.currentQuestion][1]}</input><br>
    <input type="radio" name="answer" value="3">${answers[STORE.currentQuestion][2]}</input><br>
    <input type="radio" name="answer" value="4">${answers[STORE.currentQuestion][3]}</input><br>
    <button type="submit">Submit</button>
    <p>Question ${STORE.currentQuestion + 1} of 5</p><p>Current Score:  ${STORE.currentCorrect} correct, ${5 - STORE.currentCorrect} incorrect</p>`;
  case 'answerPage':
    return `<button type="submit">Continue</button><p>Completed ${STORE.currentQuestion + 1} of 5</p><p>Current Score:  ${STORE.currentCorrect} correct, ${5 - STORE.currentCorrect} incorrect</p>`;
  case 'lastPage':
    return '<button type="submit">Restart</button>';
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