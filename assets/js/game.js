let wins = 0; //how many wins

const game = {
  words: ["one", "two", "three"], // Array of words to use.
  currentWord: "", // Current selected Word.
  wordGuessed: [], // Current state of the guessed word
  guesses: [], // Letters already guessed
  lives: 10, // Lives left until game is over
  keyPressed: "", // current key that has been pressed
  alphabet: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
  textWordGuessed: document.getElementById("word"),
  textLives: document.getElementById("lives"),
  textWins: document.getElementById("wins"),


  // Methods
  init: function () {
    this.currentWord = this.setCurrentWord();
    this.wordGuessed = this.setWordUnderscores(this.currentWord);
    this.guesses = [];
    this.lives = 10;
    this.keyPressed = "";
    this.resetAlphabet();
    this.resetCanvas();
    this.updateText();
  },

  resetAlphabet() {
    for (let i = 0; i < this.alphabet.length; i++) {
      const el = document.getElementById(this.alphabet[i]);
      el.classList.remove("active");
    }
  },
  
  resetCanvas() {
    const myStickman = document.getElementById("stickman");
    const context = myStickman.getContext('2d');
    context.clearRect(0, 0, myStickman.width, myStickman.height);
  },

  // Set the current word for the game.
  setCurrentWord() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  },

  // Set the guessed word to all underscores
  setWordUnderscores(word) {
    var underscores = [];
    for (var i = 0; i < word.length; i++) {
      underscores.push("_");
    }
    return underscores;
  },

  // Check the letter against the already guessed letters.
  checkLetter() {
    // If the key pressed isnt in the already guessed letters, and is within the alphabet array
    if (!this.guesses.includes(this.keyPressed) && this.alphabet.includes(this.keyPressed)) {
      //Update guesses array with key that was pressed.
      this.guesses.push(this.keyPressed);
      //Set the class 'active' on the letter of the key that was pressed to show that it can not be used again.
      document.getElementById(this.keyPressed).setAttribute("class", "active");
      return true;
    }
    //Key pressed is either in the guessed letters or not in the alphabet.
    return false;
  },

  // Check the letter to see if it is in the word.
  checkWord: function () {
    //explode the word into an array
    var wordExploded = this.currentWord.split("");

    //Check if letter is in word
    if (wordExploded.indexOf(this.keyPressed) !== -1) {
      var pos = 0;
      var i = -1;
      while (pos !== -1) {
        pos = wordExploded.indexOf(this.keyPressed, i + 1);
        i = pos;
        this.updateWordGuessed(pos);
        this.updateText();
      }
      return true;
    } else {
      this.animate();
      this.lives--;
      this.updateText();
      this.checkIfLoss();
      return false;
    }
  },

  //Updated the Guessed word with letter pressed.
  updateWordGuessed: function (i) {
    this.wordGuessed[i] = this.keyPressed;
  },

  //Check if game has been won.
  checkIfWon() {
    if (this.wordGuessed.indexOf("_") === -1) {
      wins++;
      this.updateText();
      return true
    }
  },

  // Check if the game has been lost.
  checkIfLoss() {
    if (this.lives <= 0) {
      alert("Game Over");
    }
  },

  // Animate man
  animate() {
    var frames = [];
    frames['frame10'] = function () {
      game.draw(0, 150, 150, 150)
    };
    frames['frame9'] = function () {
      game.draw(10, 0, 10, 600)
    };
    frames['frame8'] = function () {
      game.draw(0, 5, 70, 5)
    };
    frames['frame7'] = function () {
      game.draw(60, 5, 60, 15)
    };
    frames['frame6'] = function () {
      var myStickman = document.getElementById("stickman");
      var context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI * 2, true);
      context.stroke();
    };
    frames['frame5'] = function () {
      game.draw(60, 36, 60, 70)
    };
    frames['frame4'] = function () {
      game.draw(60, 46, 100, 50)
    };
    frames['frame3'] = function () {
      game.draw(60, 46, 20, 50)
    };
    frames['frame2'] = function () {
      game.draw(60, 70, 100, 100)
    };
    frames['frame1'] = function () {
      game.draw(60, 70, 20, 100)
    };


    frames['frame' + this.lives]();

  },

  // Function to draw the lines for hangman.
  draw($pathFromx, $pathFromy, $pathTox, $pathToy) {
    var myStickman = document.getElementById("stickman");
    var context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke();
  },

  updateText() {
    this.textWordGuessed.textContent = this.wordGuessed.join(' ');
    this.textLives.textContent = "Lives: " + this.lives;
    this.textWins.textContent = "Wins: " + wins;
  },

  // Log Debug To Console.
  debug: function () {
    console.log("Words: " + this.words);
    console.log("Current Word: " + this.currentWord);
    console.log("Word Guessed: " + this.wordGuessed);
    console.log("Letters Guessed: " + this.guesses);
    console.log("Current Key Pressed: ", this.keyPressed);
    console.log("Guesses Left: " + this.lives);
    console.log("Wins: " + wins);
    console.log("---------------------------------");
  }
};








