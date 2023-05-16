This is MDN's game from their beginner javascript tutorial: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash

Wanted to have a crack at trying to code this from scratch first and then compare my solution to theirs. Extended functionality by offering an alternate way to to submit guesses quickly via keyboard instead of just clicking the submit guess button.

# Comparing my code to MDN's 

MDN's code: https://github.com/mdn/learning-area/blob/main/javascript/introduction-to-js-1/first-splash/number-guessing-game.html


- I had to specify the below code to record any empty inputs in the field as '0'
    ```
    if (guess === '') {
      guess = 0; 
      guessRecord.append('0');
    }
    ```
  MDN's code converted string value gained from the input field to a number `const userGuess = Number(guessField.value);` which automatically converts any empty strings submitted to '0'. Whether the html tag is `<input>` or `<button>` doesn't seem to matter. Although I'd like to look more into when to use `<button>` to submit something over `<input type='submit'>`
- used `const` for variables that don't refer to a different value
  e.g. `document.querySelector(".guesses");` will always point to the paragraph with class name `'guesses'` despite the inner content changing. <br>
  I used `let` for everything because I assumed the content changing in the tags means it's changing - experiment and explore in an isolated environment later
- stored all paragraph tags in a div so they could easily use a for loop to empty out the tags
  ```
  <div class="resultParas">
    <p class="guesses"></p>
    <p class="lastResult"></p>
    <p class="lowOrHi"></p>
  </div>
  ```
  ```
  const resetParas = document.querySelectorAll(".resultParas p");
  for (const resetPara of resetParas) {
    resetPara.textContent = "";
  }
  ```
  I didn't put the paragraph tags in a containing div, and just assigned each of the paragraph tags manually to an empty string in the js script: 
  ```
  document.getElementById('turn-count').innerHTML
  = document.getElementById('record').innerHTML
  = rightWrongMsg.innerHTML
  = input.value
  = '';
  ```
- Forgot about this cool and convenient operator `+=`: 
  ```
  guesses.textContent += `${userGuess} `;
  ```
  I used the append method:
  ```
  if (turnCount === 1) {
    guessRecord.innerHTML = "Previous guesses: " + guess;
  } else {
    guessRecord.append(' ' + guess);
  }
  ```
- Chained the conditionals when checking the player's guess against the computer's selected number
  ```
      if (userGuess === randomNumber) {
        lastResult.textContent = "Congratulations! You got it right!";
        lastResult.style.backgroundColor = "green";
        lowOrHi.textContent = "";
        setGameOver();
      } else if (guessCount === 10) {
        lastResult.textContent = "!!!GAME OVER!!!";
        lowOrHi.textContent = "";
        setGameOver();
      } else {
        lastResult.textContent = "Wrong!";
        lastResult.style.backgroundColor = "red";
        if (userGuess < randomNumber) {
          lowOrHi.textContent = "Last guess was too low!";
        } else if (userGuess > randomNumber) {
          lowOrHi.textContent = "Last guess was too high!";
        }
      }
    
  ```
- Interesting to see how their functions are divvied:
  - their function `checkGuess()` also contains the code for comparing guesses whereas I separated into two functions - one that occurs when player submits guesses and another for comparing guesses. Although thinking about it now - when a player submits a guess this would also include checking their guess so it makes sense to put them together.
  - their setGameOver() function is similar to my terminate() function but also includes the creation of the `start new game` button. when this new button is clicked, they've split reset into another function.
  ```
  function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    
    resetButton = document.createElement("button");
    resetButton.textContent = "Start new game";
    document.body.append(resetButton);
    resetButton.addEventListener("click", resetGame);
  }
  ```
   i lumped the creation of a new button in my reset function.
   ```
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
   ```
- Made almost all their variables global and identified them at the start of the doc - even the resetButton which seems specific and necessary only for one function is declared simply as `let resetButton` at the start
- They just changed background colour of the low hi message to white in reset function. I removed style classes completely then readded them later 
- forgot to interrogate more deeply what other attributes are necessary for labels and inputs - maybe for accessibility
  ```
  <label for="guessField">Enter a guess: </label>
  <input type="number" id="guessField" class="guessField" />
  <input type="submit" value="Submit guess" class="guessSubmit" />
  ```
- grabbed selectors by classes using `document.querySelector()`... maybe me trying to get by class name didn't work (`document.getElementsByClassName()`) 
  __returns an array-like object of all child elements which have all of the given class name(s).__ — via [Document: getElementsByClassName() method - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName) [[+Roam]]
- can type this `guessField.disabled = false;` instead of this `button.setAttribute('disabled', '');`
- used `<input type="submit" value="Submit guess" class="guessSubmit" />` to allow player to submit a guess. I used a button
 
# Lessons

First, technical writing isn't easy. Just me trying to document my thought process and errors through this README has been pretty challenging.

Attempting this exercise was great for reviewing what I know about DOM manipulation and further practicing planning then implementing the logic for a simple program.

Basically, **don't overlook the basic and simple stuff**. The bulk of my debugging efforts went into finally having this realisation: I tended to write the assignment operator `=` when I really wanted to assess equivalence (`==` or `===`). 

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

# Next steps

⬜️ I initally had the event listener for the button in a function called game(). I specified the computer to generate a number in that function to accommodate when the page first loads, and to generate a number again for subsequent games. 
It's clear the line to generate a new number is redundant, but it worked and I'm still not sure why? I'm not sure but I thought the game() function would automatically run after the reset button is clicked (can't track through Chrome Debugger atm, please see last dot point.)

In my latest code doc, I got rid of the redundancy:
  - when the `start new button` is clicked, a new number is generated and stored back into `number` variable
  - the game picks up only when the user starts submitting guesses (i.e. clicking button directly, or pressing enter on keyboard when the input field is focussed)

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