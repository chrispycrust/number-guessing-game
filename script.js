// computer select number between 1 - 100
// if 1 and 100 aren't inclusive 
  // number = Math.floor(Math.random()*98 + 2);
// if 1 and 100 are inclusive
number = Math.floor(Math.random()*100 + 1);

// when user clicks button to submit guess: 
  // store user input
    // display number in a record 'previous guesses', append to html doc 
      // create <p> document.elementCreate ?? 
  // compare guess to selected number
     // if guess doesn't match number, display "Wrong!"
     // report whether number is 'too low' or 'too high'
        guess > number 
        ? // report 'last guess was too high'
        : // report 'last guess was too low'

// start turn count at 1
   let turn = 1;
// if guess is correct and turns <= 10
   if 
  // message: Congratulations! You got it right!
  // terminate game 
// if game count = 10 
  // message: !!!GAME OVER!!!
  // terminate game

// terminate game
  // prevent more guesses from being submitted - deactivate button and input field
  // provide a button to restart game