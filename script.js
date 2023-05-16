let number = getNumber();
let turnCount = 1;
// document.getElementById('number').innerHTML = number; // test whether computer actually is generating a new number
let button = document.getElementById('submit');
let input = document.querySelector('input');

button.addEventListener('click', submitGuess); 
input.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
      submitGuess();
  }
});

function submitGuess() {
  let guess = document.querySelector('input').value;
  let guessRecord = document.getElementById('record');
    
  document.getElementById('turn-count').innerHTML = "Turn count: " + turnCount;

  if (turnCount === 1) {
    guessRecord.innerHTML = "Previous guesses: " + guess;
  } else {
    guessRecord.append(' ' + guess);
  }

  if (guess === '') {
    guess = 0; 
    guessRecord.append('0');
  }

  compareGuess(guess, number);
    
  turnCount++; 
  input.value = '';
  input.focus();
}

function getNumber() {
  return Math.floor(Math.random()*100 + 1);
}

function compareGuess(guess, number) {
    let rightWrongMsg = document.getElementById('right-or-wrong');
    let highLowMsg = document.getElementById('high-or-low');

    if (Number(guess) === number) {
        rightWrongMsg.innerHTML = 'Congratulations! You got it right!';
        rightWrongMsg.setAttribute('class', 'win');
        highLowMsg.remove();
        terminate();
     } else {
        rightWrongMsg.innerHTML = 'Wrong!';
        rightWrongMsg.setAttribute('class', 'fail');
        guess > number  
            ? highLowMsg.innerHTML = 'last guess was too high'
            : highLowMsg.innerHTML = 'last guess was too low'
     }
  
     if (turnCount === 10) {
       rightWrongMsg.innerHTML = '!!!GAME OVER!!!';
       rightWrongMsg.setAttribute('class', 'fail');
       highLowMsg.remove();
       terminate();
     }
}  

function terminate() {
  button.setAttribute('disabled', '');
  input.setAttribute('disabled', '');
  reset();
}

function reset() {

  let newGameButton = document.createElement('button');
  newGameButton.setAttribute('id', 'new-game');
  newGameButton.innerHTML = 'Start new game';
  document.querySelector('div').append(newGameButton);
  
  document.getElementById('new-game').addEventListener('click', () => {
    newGameButton.remove();
    removeProperties();
    createHighLowMsg();
    turnCount = 1;
    input.focus();
    number = getNumber();
    // document.getElementById('number').innerHTML = number; // test whether computer actually is generating a new number
  });
}

function removeProperties() {
  let rightWrongMsg = document.getElementById('right-or-wrong');
  rightWrongMsg.classList.remove('fail', 'win');
  button.removeAttribute('disabled');
  input.removeAttribute('disabled');

  document.getElementById('turn-count').innerHTML
  = document.getElementById('record').innerHTML
  = rightWrongMsg.innerHTML
  = input.value
  = '';
}

function createHighLowMsg() {
  let highLowMsg = document.createElement('p');
  highLowMsg.setAttribute('id', 'high-or-low');
  highLowMsg.innerHTML = '';
  document.querySelector('div').append(highLowMsg);
}