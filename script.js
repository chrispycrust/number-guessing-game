// try program this solely in the console
// then apply what i know about DOM manipulation

// computer select number between 1 - 100
// if 1 and 100 aren't inclusive 
  // number = Math.floor(Math.random()*98 + 2);
// if 1 and 100 are inclusive
const number = Math.floor(Math.random()*100 + 1);

// if global variable, start turn count at 0, local variable, start turn count at 1
let turnCount = 0;

// every time player clicks button to submit guess: 
  document.querySelector('button').addEventListener('click', () => {
        // store user input
        let guess = document.querySelector('input').value;
        turnCount++; // turnCount = 1
        //console.log(turnCount);

        // display number in a record
        if (turnCount === 1) {
            // if turn count is equal to 1, intiate a list of guesses 'Previous guesses', append to doc
          document.getElementById('record').innerHTML = "Previous guesses: " + guess;
        } else {
            // turnCount after 1, append guesses to record paragraph
            document.getElementById('record').append(' ' + guess);
        }
  });

// case: if user clicks button without inputting a number, default guess to 0

  // compare guess to selected number

     // if guess is incorrect, display "Wrong!"
        // report whether number is 'too low' or 'too high'
            //guess > number 
            //? // report 'last guess was too high'
            //: // report 'last guess was too low'
     // if guess is correct and turns <= 10
        // message: Congratulations! You got it right!
        // terminate game 
    // if game count = 10 and no guess has been correct
        // message: !!!GAME OVER!!!
        // terminate game

  // after each guess, increment turnCount by 1

  // terminate game
    // prevent more guesses from being submitted - deactivate button and input field
    // provide a button to restart game