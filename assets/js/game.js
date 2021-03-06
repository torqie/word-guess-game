let wins = 0; //how many wins

function Hangman() {
  this.words = ["birdie", "bogey", "bunker", "eagle", "par", "tee", "fore", "putter", "driver", "wedge", "iron", "slice", "hook"]; // Array of words to use.
  this.currentWord = ""; // Current selected Word.
  this.wordGuessed = []; // Current state of the guessed word
  this.guesses = []; // Letters already guessed
  this.lives = 10;// Lives left until game is over
  this.keyPressed = ""; // current key that has been pressed
  this.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  this.textWordGuessed = document.getElementById("word");
  this.textLives = document.getElementById("lives");
  this.textWins = document.getElementById("wins");
  this.status = document.getElementById('status');
  this.that = this;
  this.gameWon = false;

  //Game Init
  this.init = function () {
    const word = this.setCurrentWord();

    this.currentWord = word.word;
    this.wordGuessed = word.underscores;
    this.guesses = [];
    this.lives = 10;
    this.keyPressed = "";
    this.gameWon = false;
    this.resetAlphabet();
    this.resetCanvas();
    this.updateText();
  };

  //Resets the alphabet of already guessed words.
  this.resetAlphabet = function () {
    for (let i = 0; i < this.alphabet.length; i++) {
      const el = document.getElementById(this.alphabet[i]);
      el.classList.remove("active");
    }
  };

  // Resets the canvas that the stickman drawing is on.
  this.resetCanvas = function () {
    const myStickman = document.getElementById("stickman");
    const context = myStickman.getContext('2d');
    context.clearRect(0, 0, myStickman.width, myStickman.height);
  };

  // Set the current word for the game.
  this.setCurrentWord = function () {

    // Get a random word
    const word = this.words[Math.floor(Math.random() * this.words.length)];

    // Set the new word to underscores
    const underscores = [];
    for (let i = 0; i < word.length; i++) {
      underscores.push("_");
    }
    return {word: word, underscores: underscores}
  };

  // Check the letter against the already guessed letters.
  this.checkLetter = function () {
    // If the key pressed isn't in the already guessed letters, and is within the alphabet array
    if (!this.guesses.includes(this.keyPressed) && this.alphabet.includes(this.keyPressed)) {
      //Update guesses array with key that was pressed.
      this.guesses.push(this.keyPressed);
      //Set the class 'active' on the letter of the key that was pressed to show that it can not be used again.
      document.getElementById(this.keyPressed).setAttribute("class", "active");
      return true;
    }
    //Key pressed is either in the guessed letters or not in the alphabet.
    return false;
  };

  // Check the letter to see if it is in the word.
  this.checkWord = function () {
    if (this.checkLetter()) {
      //explode the word into an array
      const wordExploded = this.currentWord.split("");

      //Check if letter is in word
      if (wordExploded.indexOf(this.keyPressed) !== -1) {
        let pos = 0;
        let i = -1;
        while (pos !== -1) {
          pos = wordExploded.indexOf(this.keyPressed, i + 1);
          i = pos;
          this.updateWordGuessed(pos);
          this.updateText();
        }

        return true;
      } else {
        this.animate(this);
        this.lives--;
        this.updateText();
        return false;
      }
    }
    return false;
  };

  //Updated the Guessed word with letter pressed.
  this.updateWordGuessed = function (i) {
    this.wordGuessed[i] = this.keyPressed;
  };

  //Check if game has been won.
  this.checkIfWon = function () {
    if (this.wordGuessed.indexOf("_") === -1) {
      wins++;
      this.gameWon = true;
      this.updateText();
      return true;
    }
  };

  // Check if the game has been lost.
  this.checkIfLoss = function () {
    if (this.lives <= 0) {
      wins = 0;
      this.updateText();
      return true;
    }
  };

  // Animation for the canvas to draw the stickman.
  // Got the animation from https://codepen.io/cathydutton/pen/ldazc
  this.animate = function (that) {
    const frames = [];
    // Frames to draw on canvas as wrong letter is guessed.
    frames['frame10'] = function () {
      that.draw(0, 150, 150, 150)
    };
    frames['frame9'] = function () {
      that.draw(10, 0, 10, 600)
    };
    frames['frame8'] = function () {
      that.draw(0, 5, 70, 5)
    };
    frames['frame7'] = function () {
      that.draw(60, 5, 60, 15)
    };
    frames['frame6'] = function () {
      var myStickman = document.getElementById("stickman");
      var context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI * 2, true);
      context.stroke();
    };
    frames['frame5'] = function () {
      that.draw(60, 36, 60, 70)
    };
    frames['frame4'] = function () {
      that.draw(60, 46, 100, 50)
    };
    frames['frame3'] = function () {
      that.draw(60, 46, 20, 50)
    };
    frames['frame2'] = function () {
      that.draw(60, 70, 100, 100)
    };
    frames['frame1'] = function () {
      that.draw(60, 70, 20, 100)
    };

    // Calling the method to draw the right body part
    frames['frame' + this.lives]();
  };

  // Function to draw the lines for hangman.
  this.draw = function ($pathFromx, $pathFromy, $pathTox, $pathToy) {
    var myStickman = document.getElementById("stickman");
    var context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#ffffff";
    context.lineWidth = 2;
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  };

  // Update the game text on the screen.
  this.updateText = function () {
    this.textWordGuessed.textContent = this.wordGuessed.join(' ');
    this.textLives.textContent = "Lives: " + this.lives;
    this.textWins.textContent = "Wins: " + wins;
    this.status.textContent = "";
    this.status.classList.add("d-none");
    if (this.gameWon) {
      this.status.textContent = "YOU GUESSED THE WORD";
      this.status.classList.remove("d-none");
    }
  };

  // Log Debug To Console.
  this.debug = function () {
    console.log("Words: " + this.words);
    console.log("Current Word: " + this.currentWord);
    console.log("Word Guessed: " + this.wordGuessed);
    console.log("Letters Guessed: " + this.guesses);
    console.log("Current Key Pressed: ", this.keyPressed);
    console.log("Guesses Left: " + this.lives);
    console.log("Wins: " + wins);
    console.log("---------------------------------");
  };

  // Calling the init function to start the game.
  this.init();
}








