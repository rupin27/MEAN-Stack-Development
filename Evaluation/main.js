const Api = (() => {
  const url = "https://random-word-api.herokuapp.com/word";
  const getData = () => fetch(url).then((res) => res.json());
  return {
    getData,
  };
})();

const View = (() => {
  const domSelector = {
    workingWord: document.querySelector(".word-in-progress"),
    guessesRemaining: document.querySelector(".guesses-remaining"),
    wordInput: document.querySelector(".user-input"),
    // guessBtn: document.querySelector('.guess-button'),
    newGameBtn: document.querySelector(".new-game-button"),
    guesses: document.querySelector(".guesses"),
    incorrGuesses: document.querySelector(".incorr-guesses"),
  };

  const displayTimer = (timeRemaining) => {
    const timer = document.querySelector(".timer");
    timer.textContent = `Time remaining: ${timeRemaining}`;
  };

  const displayWorkingWord = (word, guessedLetters, visibleLetters) => {
    const wrkWrd = word
      .split("")
      .map((letter, i) =>
        guessedLetters.includes(letter) || visibleLetters.includes(letter) ? letter : " _ "
      )
      .join("");
    domSelector.workingWord.textContent = wrkWrd;
  };

  const displayGuesses = (guesses) => {
    domSelector.guesses.textContent = guesses.join(", ");
  };

  const displayIncorrGuesses = (incorrguesses) => {
    domSelector.incorrGuesses.textContent = incorrguesses.join(", ");
  };

  const displayGuessessRemaning = (guessesUsed) => {
    domSelector.guessesRemaining.textContent = `${guessesUsed} / 10`;
  };

  const clearInput = () => {
    domSelector.wordInput.value = "";
  };

  return {
    domSelector,
    displayTimer,
    displayWorkingWord,
    displayGuesses,
    displayIncorrGuesses,
    displayGuessessRemaning,
    clearInput,
  };
})();

const Model = ((api, view) => {
  const { domSelector } = view;
  const { getData } = api;
  
  class State {
      constructor() {
          this.origWord = "";
          this.word = "";
          this.guessedLetters = [];
          this.incorrGuessedLetters = [];
          this.visibleLetters = [];
          this.guesses = 0;
          this.maxGuesses = 10;
      };
  }

  State.prototype.pickNewWord = async function() {
      const data = await getData();
      this.word = data[0];
      this.origWord = data[0];
      this.guessedLetters = [];
      this.incorrGuessedLetters = [];
      this.guesses = 0;

      while (this.visibleLetters.length < 3) {
      const index = Math.floor(Math.random() * this.word.length);
      let letter = this.word[index];
      if (!this.visibleLetters.includes(letter)) {
          this.visibleLetters.push(letter);
      }
      }
  };

  State.prototype.guessLetter = function(letter) {
      if (this.guessedLetters.includes(letter)) {
      alert("Word already guessed. Try a new word!");
      return;
      }

      if (this.incorrGuessedLetters.includes(letter)) {
      alert("Word already guessed. Try a new word!");
      return;
      }

      if (!this.word.includes(letter)) {
      this.incorrGuessedLetters.push(letter);
      this.guesses += 1;
      return false;
      }
      this.guessedLetters.push(letter);
      return true;
  };

  State.prototype.getWorkingWord = function() {
      return this.word;
  };

  State.prototype.getGuessedLetters = function() {
      return this.guessedLetters;
  };

  State.prototype.getIncorrGuessedLetters = function() {
      return this.incorrGuessedLetters;
  };

  State.prototype.getVisibleLetters = function() {
      return this.visibleLetters;
  };

  State.prototype.getGuesses = function() {
      return this.guesses;
  };

  State.prototype.isGameOver = function() {
      return this.guesses >= this.maxGuesses;
  };

  State.prototype.checkCompletion = function() {
      const lettersInWord = new Set(this.origWord.toLowerCase());
      const lettersGuessed = new Set(this.guessedLetters);
      const lettersVisible = new Set(this.visibleLetters);
      const unionSet = new Set([...lettersGuessed, ...lettersVisible]);

      return new Set([...lettersInWord].filter((x) => !unionSet.has(x))).size === 0;
  };

  return {
      State
  };
})(Api, View);

const Controller = ((view, model) => {
  const { domSelector } = view;
  const { State } = model;

  const state = new State();
  let timerId; 

  const init = async () => {
    await state.pickNewWord();
    view.displayWorkingWord(state.getWorkingWord(), [], state.getVisibleLetters());
    view.displayGuesses(state.getGuessedLetters());
    view.displayIncorrGuesses(state.getIncorrGuessedLetters());
    view.displayGuessessRemaning(state.getGuesses());

    let timeRemaining = 60;
    timerId = setInterval(() => { 
      timeRemaining--;
      view.displayTimer(timeRemaining);
      if (timeRemaining === 0) {
        clearInterval(timerId);
        alert("Time is up! You lose!");
        handleNewGame();
      }
    }, 1000);
  };

  const handleNewGame = () => {
    clearInterval(timerId); 
    state.pickNewWord().then(() => {
      view.clearInput();
      view.displayGuesses([]);
      view.displayIncorrGuesses([]);
      view.displayGuessessRemaning(0);
      view.displayWorkingWord(state.getWorkingWord(), [], state.getVisibleLetters());
      init();
    });
  };

  const handleGuess = () => {
    const input = domSelector.wordInput.value;
    if (!input || input.length > 1) {
      return;
    }
    const letter = input.toLowerCase();
    domSelector.wordInput.value = "";
    const correctGuess = state.guessLetter(letter);
    if (correctGuess) {
      const visibleLetters = state.getVisibleLetters();
      if (state.checkCompletion()) {
        alert("You won! Ready for the next challenge?");
        handleNewGame();
      } 
      else {
        view.displayWorkingWord(state.getWorkingWord(), state.getGuessedLetters(), visibleLetters);
        view.displayGuesses(state.getGuessedLetters());
        view.displayGuessessRemaning(state.getGuesses());
      }
    } else {
      view.displayIncorrGuesses(state.getIncorrGuessedLetters());
      view.displayGuessessRemaning(state.getGuesses());
      if (state.isGameOver()) {
          alert(`Game over! The word was "${state.getWorkingWord()}". You guessed ${state.getGuessedLetters().length} letters correctly!`);
        handleNewGame();
      }
    }
  };

  domSelector.newGameBtn.addEventListener("click", handleNewGame);
  domSelector.wordInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      handleGuess();
    }
  });

  const bootstrap = async () => {
    await init();
    addEventListeners();
  };

  return {
    bootstrap,
  };

})(View, Model);

Controller.bootstrap();


