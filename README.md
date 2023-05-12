This is MDN's game from their beginner javascript tutorial: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/A_first_splash

Wanted to have a crack at trying to code this from scratch first and then compare my solution to theirs.

# Issues

- For some reason, I can't grab elements by class name, just id??

# Lessons

This was largely great for reviewing what I know about DOM manipulation and further practicing planning then implementing the logic for a simple program.

A lot of simple things I forgot and overlooked - don't overlook the basic stuff

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

This returned two errors: 
1. subsequent numbers after the first guess would not append to the first guess but replace the previous
2. ```Uncaught TypeError: document.getElementById(...).innerHTML.append is not a function```

I was struggling to understand why for several hours before I realised:
1. face-palmed so hard, I forgot the most basic programming idea `=` is not for assessing equivalence but ASSIGNMENT!! `turnCount === 1`  
2. I don't understand that much about DOM manipulation just yet but apparently we can't append to innerHTML `document.getElementById('record').append(' ' + guess);` works as expected

Working code now:
```
  document.querySelector('button').addEventListener('click', () => {
        let guess = document.querySelector('input').value;
        turnCount++;

        if (turnCount === 1) {
          document.getElementById('record').innerHTML = "Previous guesses: " + guess;
        } else {
            document.getElementById('record').append(' ' + guess);
        }
  });
```

I was also getting unexpected results from this where even if the player guess matches the number the computer selects, the conditional will still say it's wrong. This was because a value taken from an input field is a string by default and because I used the strict equality sign, the player guess needed to be converted into a number first.
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

# Next steps
Need to learn more about how to effectively harness chrome debugger. issues:
- sometimes the main frame freezes when I access dev console, need to refresh
- I mark a line to pause in the code, but I'm not sure how to get it to play through the entire thing especially in this code where it resets itself, it's not just one function, it's multiple. There are multiple instances where I want to track the journey of one game and the next after clicking the reset button but I can't