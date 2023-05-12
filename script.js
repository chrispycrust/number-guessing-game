let number = '';
let turnCount = 1;
let button = document.getElementById('submit');
let input = document.querySelector('input');
game();

function game() {
    number = getNumber();

    button.addEventListener('click', () => {
        let guess = document.querySelector('input').value;
    
        document.getElementById('turn-count').innerHTML = "Turn count: " + turnCount;

        if (turnCount === 1) {
          document.getElementById('record').innerHTML = "Previous guesses: " + guess;
        } else {
          document.getElementById('record').append(' ' + guess);
        }

        if (guess === '') {
          guess = 0; 
          document.getElementById('record').append('0');
        }

        compareGuess(guess, number);
    
        turnCount++; 
  }); 
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
       console.log(rightWrongMsg);
       highLowMsg.remove();
       terminate();
     }
}  

function terminate() {
    document.getElementById('submit').setAttribute('disabled', '');
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
    document.getElementById('right-or-wrong').classList.remove('fail', 'win');
    button.removeAttribute('disabled');
    input.removeAttribute('disabled');
    document.getElementById('turn-count').innerHTML
    = document.getElementById('record').innerHTML
    = document.getElementById('right-or-wrong').innerHTML
    = input.value
    = '';

    input.focus();
    
    let highLowMsg = document.createElement('p');
    highLowMsg.setAttribute('id', 'high-or-low');
    highLowMsg.innerHTML = '';
    document.querySelector('div').append(highLowMsg);

    turnCount = 1;
    number = getNumber();
  });
}