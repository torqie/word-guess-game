var game = {
  words: ["one", "two", "three"],
  currentWord: "",
  wordGuessed: "",
  lettersGuessed: [],
  guessesLeft: 12,
  wins: 0,
  keyPressed:  "",


  //Methods
  init: function() {
      this.currentWord = this.setCurrentWord();
      this.wordGuessed = this.setWordUnderscores(this.currentWord);
      this.buttons();
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
  checkLetter: function() {
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
    const wordExploded = this.currentWord.split("");

    var pos = 0;
    var i = -1;

    while(pos !== -1)
    {
      pos = wordExploded.indexOf(this.keyPressed, i + 1);
      i = pos;
      this.updateWordGuessed(pos);
    }
    return true;
  },

  //Updated the Guessed word with letter pressed
  updateWordGuessed: function(i) {
    this.wordGuessed[i] = this.keyPressed;
    return this.checkIfWon();
  },

  checkIfWon() {
    if(this.wordGuessed.indexOf("_") === -1) {
      return true
    }

  },

  /** Log Debug To Console **/
  debug: function() {
    console.log("Words: " + this.words);
    console.log("Current Word: " + this.currentWord);
    console.log("Word Guessed: " + this.wordGuessed);
    console.log("Letters Guessed: " + this.lettersGuessed);
    console.log("Current Key Pressed: ", this.keyPressed);
    console.log("Guesses Left: " + this.guessesLeft);
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
        alert("YOU WIN")
      }
    }
  }
  newGame.debug();
};





