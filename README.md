This is MDN's game from their beginner javascript tutorial: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash

Wanted to have a crack at trying to code this from scratch first and then compare my solution to theirs.

# Lessons

Attempting this exercise was great for reviewing what I know about DOM manipulation and further practicing planning then implementing the logic for a simple program.

Basically, **don't overlook the basic and simple stuff**. The bulk of my debugging efforts went into finally having this realisation: I tended to write the operator `=` when I really wanted to assess equivalence (`==` or `===`). 

## Example 1
I had this:

```
  document.querySelector('button').addEventListener('click', () => {
        let guess = document.querySelector('input').value;
        turnCount++;

        if (turnCount = 1) {
          document.getElementById('record').innerHTML = "Previous guesses: " + guess;
        } else {
            document.getElementById('record').innerHTML.append(guess);
        }
  });
```
This meant guesses after the first guess would not print next to the first guess but replace the number. Each time a user submits a guess, the turnCount would reset to 1, which matches the first condition. The correct code should read `if (turnCount === 1)`

## Example 2
Even if the player guess matches the number the computer selects, the conditional will still say it's wrong. 
```
if (guess === number) {
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
```
A value taken from an input field is a string by default and because I used the strict equality sign, the player guess needed to be converted into a number first, so the correct code should read `Number(guess) === number`. However, if I used `guess == number`, the lax equality operator, the above code would've worked. 

## Accessibility
- [Auto-focusing as soon as a page loads can be confusing for users who are reliant on screen readers because they're given no context](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/autofocus). To address that, I only introduce autofocussing after the first guess is made and when a new game has begun after the first game. I assume the user will be familiar with the rules and requirements at this point and will want to speedily make their guesses.

- Provided an alternative way to "submit guess" via the "enter" key for keyboard user
  
  Ended up putting all the code I associated with just the event listener for clicking the submit guess button into its own separate function, to be reused according to however the user prefers to submit a guess: 

  ```
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        submitGuess();
        }
    });
  ```
  
  Resources used: 
  - [Keyboard event doc on MDN](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key), gives this example which I used:
    ```
    window.addEventListener(
    "keydown",
    (event) => {
    
      switch (event.key) {
        ...
        case "Enter":
          // Do something for "enter" or "return" key press.
          break;
      }

    ```
  - [Key value list doc](https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values#whitespace_keys) verified that `Enter` is indeed a valid value 
  - [keydown event doc](https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event), showed me another way to write the event listeners method which I thought had to be presented like this `input.addEventListener('keydown', () => //code });`
    ```
    input.addEventListener("keydown", logKey);

    function logKey(e) {
      log.textContent += ` ${e.code}`;
    }
    ```

Through writing this README, I realise that trying to document my thought process and errors is actually quite challenging... technical writing isn't easy.

# Next steps

⬜️ I'm still a little hazy on when to use parameters and when to break a function apart into smaller ones. Only one function in my code has parameters `compareGuess`, the others are all empty. I think I generally used functions more like collections of steps associated with one action. 

For example, I have a giant function called `reset()` which clears the game slate and readies itself for a new one. There are so many steps to create a new game:
- create a 'start new game' button
- when the newly created button is clicked 
  - remove the newly created button
  - remove the css styles that was applied when player made guesses
  - reactivate the input and submit guess button
  - clear all messages to blank
  - auto-focus on the input field
  - recreate the paragraph tags where the message giving clues about whether the guess is high or low will go
  - reset turn count
  - generate new number for the new game

I understand functions are reusuable blocks of code that makes our document neater and more readable, so, for me, if an action can't be used anywhere else but contributed to a specific purpose, I lumped it into the one function.

```
function reset() {

  // create a 'start new game' button
  let newGameButton = document.createElement('button');
  newGameButton.setAttribute('id', 'new-game');
  newGameButton.innerHTML = 'Start new game';
  document.querySelector('div').append(newGameButton);
  
  // when the newly created button is clicked 
  document.getElementById('new-game').addEventListener('click', () => {

    // remove the newly created button
    newGameButton.remove();

    // remove the css styles that was applied when player made guesses
    document.getElementById('right-or-wrong').classList.remove('fail', 'win');

    // reactivate the input and submit guess button
    button.removeAttribute('disabled');
    input.removeAttribute('disabled');

    // clear all messages to blank
    document.getElementById('turn-count').innerHTML
    = document.getElementById('record').innerHTML
    = document.getElementById('right-or-wrong').innerHTML
    = input.value
    = '';
    
    // auto-focus on the input field 
    input.focus();
    
    // recreate the paragraph tags where the message giving clues about whether the guess is high or low will go
    let highLowMsg = document.createElement('p');
    highLowMsg.setAttribute('id', 'high-or-low');
    highLowMsg.innerHTML = '';
    document.querySelector('div').append(highLowMsg);

    // reset turn count
    turnCount = 1;

    // generate new number for the new game
    number = getNumber();
    
  });
}
```

⬜️ For some reason, I can't grab elements by class name, just id?? Explore

⬜️ The code in example 1 brought up this error.
```Uncaught TypeError: document.getElementById(...).innerHTML.append is not a function```

I don't understand that much about DOM manipulation just yet but apparently we can't append to innerHTML `document.getElementById('record').append(' ' + guess);` works as expected

⬜️ Need to learn more about how to effectively harness chrome debugger. issues:
- sometimes the main frame freezes when I access dev console, need to refresh
- I mark a line to pause in the code, but I'm not sure how to get it to play through the entire thing especially in this code where it resets itself, it's not just one function, it's multiple. There are multiple instances where I want to track the journey of one game and the next after clicking the reset button but I can't