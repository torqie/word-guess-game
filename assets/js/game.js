var game = {
  words: ["one", "two", "three"],
  currentWord: "",
  wordGuessed: [],
  lettersGuessed: [],
  lives: 12,
  wins: 0,
  keyPressed:  "",

  textWordGuessed: document.getElementById("word"),
  textLives: document.getElementById("lives"),



  //Methods
  init: function() {
      this.currentWord = this.setCurrentWord();
      this.wordGuessed = this.setWordUnderscores(this.currentWord);
      this.updateText();

  },

  //Set the current word for the game.
  setCurrentWord() {
    return this.words[Math.floor(Math.random() * this.words.length)];
  },

  /** Set the guessed word to all underscores **/
  setWordUnderscores: function(word) {
    const underscores = [];
    for(let i = 0; i < word.length; i++) {
      underscores.push("_");
    }
    return underscores;
  },

  /** Check the letter against the already guessed letters. **/
  checkLetter() {
    if (!this.lettersGuessed.includes(this.keyPressed)) {
      //Update lettersGuessed array with key that was pressed.
      this.lettersGuessed.push(this.keyPressed);
      return true;
    }
    return false;
  },

  /** Check the letter to see if it is in the word. **/
  checkWord: function() {
    //explode the word into an array
    var wordExploded = this.currentWord.split("");

    //Check if letter is in word
    if(wordExploded.indexOf(this.keyPressed) !== -1) {
      var pos = 0;
      var i = -1;
      while(pos !== -1) {
        pos = wordExploded.indexOf(this.keyPressed, i + 1);
        i = pos;
        this.updateWordGuessed(pos);
        this.updateText();
      }
      return true;
    } else {
      this.lives--;
      this.updateText();
      this.checkIfLoss();
      return false;
    }
  },

  //Updated the Guessed word with letter pressed
  updateWordGuessed: function(i) {
    this.wordGuessed[i] = this.keyPressed;
  },

  checkIfWon() {
    if(this.wordGuessed.indexOf("_") === -1) {
      this.wins++;
      return true
    }
  },

  checkIfLoss() {
    if(this.lives <= 0) {
      alert("Game Over");
    }
  },


  updateText() {
    this.textWordGuessed.textContent = this.wordGuessed.join(' ');
    this.textLives.textContent = "Lives: " + this.lives;
  },

  /** Log Debug To Console **/
  debug: function() {
    console.log("Words: " + this.words);
    console.log("Current Word: " + this.currentWord);
    console.log("Word Guessed: " + this.wordGuessed);
    console.log("Letters Guessed: " + this.lettersGuessed);
    console.log("Current Key Pressed: ", this.keyPressed);
    console.log("Guesses Left: " + this.lives);
    console.log("Wins: " + this.wins);
    console.log("---------------------------------");
  }
};


const newGame = Object.create(game);
newGame.init();
//Get Key pressed
document.onkeyup = function(event) {
  newGame.keyPressed = event.key.toLowerCase();

  if(newGame.checkLetter()) {
    if(newGame.checkWord()) {
      if(newGame.checkIfWon()) {
        alert("You win!")
      }
    }
  }
  newGame.debug();
};





