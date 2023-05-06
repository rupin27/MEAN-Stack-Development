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

  let origWord = "";
  let word = "";
  let guessedLetters = [];
  let incorrGuessedLetters = [];
  let visibleLetters = [];
  let guesses = 0;
  const maxGuesses = 10;

  const pickNewWord = async () => {
    const data = await api.getData();
    word = data[0];
    origWord = data[0];
    guessedLetters = [];
    incorrGuessedLetters = [];
    guesses = 0;

    while (visibleLetters.length < 3) {
      const index = Math.floor(Math.random() * word.length);
      let letter = word[index]
      if (!visibleLetters.includes(letter)) {
        visibleLetters.push(letter);
      }
    }
  };

  const guessLetter = (letter) => {
    if (guessedLetters.includes(letter)) {
      alert("Word already guessed. Try a new word!");
      return;
    }

    if (incorrGuessedLetters.includes(letter)) {
      alert("Word already guessed. Try a new word!");
      return;
    }

    if (!word.includes(letter)) {
      incorrGuessedLetters.push(letter);
      guesses += 1;
      return false;
    }
    guessedLetters.push(letter);
    return true;
  };

  const getWorkingWord = () => {
    return word;
  };

  const getGuessedLetters = () => {
    return guessedLetters;
  };

  const getIncorrGuessedLetters = () => {
    return incorrGuessedLetters;
  };

  const getVisibleLetters = () => {
      return visibleLetters;
    };    

  const getGuesses = () => {
    return guesses;
  };

  const isGameOver = () => {
    return guesses >= maxGuesses;
  };

  const checkCompletion = () => {
    const lettersInWord = new Set(origWord.toLowerCase());
    const lettersGuessed = new Set(guessedLetters);
    const lettersVisible = new Set(visibleLetters);
    const unionSet = new Set([...lettersGuessed, ...lettersVisible]);

    return (
      new Set([...lettersInWord].filter((x) => !unionSet.has(x))).size === 0);
  };

  return {
    pickNewWord,
    guessLetter,
    getWorkingWord,
    getGuessedLetters,
    getIncorrGuessedLetters,
    getVisibleLetters,
    getGuesses,
    isGameOver,
    checkCompletion,
    maxGuesses,
  };
})(Api, View);

const Controller = ((view, model) => {
  const { domSelector } = view;
  const { pickNewWord } = model;

  const init = async () => {
    await pickNewWord();
    view.displayWorkingWord(model.getWorkingWord(), [], model.getVisibleLetters());
    view.displayGuesses(model.getGuessedLetters());
    view.displayIncorrGuesses(model.getIncorrGuessedLetters());
    view.displayGuessessRemaning(model.getGuesses());

    let timeRemaining = 60;
    const timerId = setInterval(() => {
      timeRemaining--;
      view.displayTimer(timeRemaining);
      if (timeRemaining === 0) {
        clearInterval(timerId);
        alert("Time is up! You lose!");
        handleNewGame();
      }
    }, 1000);
  };

  const handleGuess = () => {
    const input = domSelector.wordInput.value;
    if (!input || input.length > 1) {
      return;
    }
    const letter = input[0].toLowerCase();
    if (!/[a-z]/.test(letter)) {
      return;
    }

    domSelector.wordInput.value = "";
    const correctGuess = model.guessLetter(letter);
    if (correctGuess) {
      view.displayWorkingWord(model.getWorkingWord(), model.getGuessedLetters(), model.getVisibleLetters());
      view.displayGuessessRemaning(model.getGuesses());
      view.displayGuesses(model.getGuessedLetters());
      view.displayIncorrGuesses(model.getIncorrGuessedLetters());

      if (model.isGameOver() || model.checkCompletion()) {
        alert("You won! Ready for the next challenge?");
        handleNewGame();
      }
    } 
    else {
      view.displayGuesses(model.getGuessedLetters());
      view.displayIncorrGuesses(model.getIncorrGuessedLetters());
      view.displayGuessessRemaning(model.getGuesses());
      if (model.isGameOver()) {
        alert(`Game over! The word was "${model.getWorkingWord()}". You guessed ${model.getGuessedLetters().length} letters correctly!`);
        handleNewGame();
      }
    }
  };

  const handleNewGame = async () => {
    await pickNewWord();
    view.displayWorkingWord(model.getWorkingWord(), [], model.getVisibleLetters());
    view.displayGuesses(model.getGuessedLetters());
    view.displayIncorrGuesses(model.getIncorrGuessedLetters());
    view.displayGuessessRemaning(model.getGuesses());

    let timeRemaining = 60;
    const timerId = setInterval(() => {
      timeRemaining--;
      view.displayTimer(timeRemaining);
      if (timeRemaining === 0) {
        clearInterval(timerId);
        alert("Time is up! You lose!");
        handleNewGame();
      }
    }, 1000);
  };

  const addEventListeners = () => {
    domSelector.wordInput.addEventListener("keyup", function (e) {
      if (e.key === "Enter") {
        handleGuess();
      }
    });
    // domSelector.guessBtn.addEventListener('click', handleGuess);
    domSelector.newGameBtn.addEventListener("click", handleNewGame);
  };

  const bootstrap = async () => {
    await init();
    addEventListeners();
  };
  return {
    bootstrap,
  };
})(View, Model);

Controller.bootstrap();
