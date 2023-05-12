// computer select number between 1 - 100
const number = Math.floor(Math.random()*100 + 1);
console.log(number)

let turnCount = 1;
let button = document.querySelector('button');
let input = document.querySelector('input');

   button.addEventListener('click', () => {
        let guess = document.querySelector('input').value;
    
        document.getElementById('turn-count').innerHTML = "Turn count: " + turnCount;

        // display number in a record
        if (turnCount === 1) {
          document.getElementById('record').innerHTML = "Previous guesses: " + guess;
        } else {
          document.getElementById('record').append(' ' + guess);
        }
    
        // case: if user clicks button without inputting a number, default guess to 0
        if (guess === '') {
          guess = 0; // assign guess to 0 and compare against computer number
          document.getElementById('record').append('0');
        }

        compareGuess(guess, number);
    
        turnCount++; 
  }); 

  // compare guess to selected number
function compareGuess(guess, number) {
    let rightWrongMsg = document.getElementById('right-or-wrong');
    let highLowMsg = document.getElementById('high-or-low');
      console.log(guess, number);
       // if guess is correct
     if (Number(guess) === number) {
        rightWrongMsg.innerHTML = 'Congratulations! You got it right!';
       highLowMsg.remove();
       terminate();
     } else {
       // display "Wrong!"
        rightWrongMsg.innerHTML = 'Wrong!';
       // report whether number is 'too low' or 'too high'
            guess > number  
            ? highLowMsg.innerHTML = 'last guess was too high'
            : highLowMsg.innerHTML = 'last guess was too low'
     }
  
     if (turnCount >= 10) {
       rightWrongMsg.innerHTML = '!!!GAME OVER!!!';
       highLowMsg.remove();
       terminate();
     }
}  

// terminate game
function terminate() {
    // add disable attribute to button and input field
    button.setAttribute('disabled', '');
    input.setAttribute('disabled', '');
    // provide a button to restart game
    let newGameButton = document.createElement('button');
    newGameButton.innerHTML = 'Start new game';
    document.querySelector('div').append(newGameButton);
}