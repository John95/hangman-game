//alert ("My name is Gandalf");

// document.onkeyup = function(event) {
//   var letter = String.fromCharCode(event.keyCode).toLowerCase();
//   //  (more stuff here)
//   document.querySelector("#inputKey").innerHTML = letter;
// }



var Game = {
	
	wordList: [
		"nth",
		"ghost",
		"knight",
		"game",
		"discord",
		"coffee",
		"cute",
		"antidisestablishmentarianism",
		"four",
		"basilica",
		"drugs",
		"killing",
		"oxymoron",
		"auxymoron",
		"bells",
		"billions",
		"adult",
		"coders-"
	],
	// Takes any keypress and stores it in var letter.
	guess: function () {
		var letter = String.fromCharCode(event.keyCode).toLowerCase();
		//document.querySelector("#inputKey").innerHTML = letter;

		console.log(letter);
		return letter;
	},
	// Chooses a word from the list.
	chooseWord: function (list) {
		var num = Math.floor((Math.random() * list.length));
		//console.log(list[num]);
		return list[num];
	},
	// Takes word and creates word of underscores from it.
	makeBlankArray: function (realWord){
		var wordArray = [];
		for (var i = 0; i < realWord.length; i++) {
			wordArray.push("_");
		}
		return wordArray;
	},
	makeBlankWord: function (blankArray){
		return blankArray.join("");
	},
	displayGameWord: function (gameWord){
		return gameWord.join(" ");
	},
	// Takes a guess and word, and checks if guess is in the word.
	checkWord: function (word, theGuess) {
		// Boolean checks if letter is in word.
		var letterInWord = false;

		// is guess in word?
		for (var i = 0; i < word.length; i++) {
			if (theGuess === word.charAt(i)) {
				// yeah, it is.
				letterInWord = true;
			}
		}
		// returns true if guess is in word, false if not.
		console.log(letterInWord);
		return letterInWord;
	},
	// if guess is in word, finds which indices equal keyPress, and replace blank with KeyPress on blank array.
	replaceLetter: function (guessIsInWord, guess, word, blankArray){
		if (guessIsInWord) {
			for (var i = 0; i < word.length; i++) {
				if (guess === word.charAt(i)) {
					blankArray.splice(i, 1, guess);
				}
			}
		}
		// if guess not in word, returns original array, if in word, returns new array.
		return blankArray;
	},
	isGuessed: function (wrongArray, theGuess){
		var letterInArray = false;

		for (var i = 0; i < wrongArray.length; i++) {
			if (theGuess === wrongArray[i]){
				letterInArray = true;
			}
		}
		return letterInArray;
	}

}

// This is the hangman word.
// function start() {
// 	var theList = Game.wordList;
// 	var wordToGuess = Game.chooseWord(theList);

// 	// Initialize a blank word to display on page load.
// 	var theBlankArray = Game.makeBlankArray(wordToGuess);
// 	var noDisplayBlankWord = Game.makeBlankWord(theBlankArray);
// 	var displayBlankWord = Game.displayGameWord(theBlankArray);

// 	// Initialize a place to put wrong guesses.
// 	var wrongGuesses = [];
// 	var wrongGuessCount = 0;

// 	var winsCounter = 0;
// 	var lossesCounter = 0;

// 	console.log(displayBlankWord);
// 	// When the page loads, it displays the word to be filled.
// 	window.onload = function(event){
// 		document.querySelector('#wordToFill').innerHTML = displayBlankWord;
// 	}

// }

//Take all dat out of the function. NEXT TIME

var theList = Game.wordList;
var wordToGuess = Game.chooseWord(theList);

// Initialize a blank word to display on page load.
var theBlankArray = Game.makeBlankArray(wordToGuess);
var noDisplayBlankWord = Game.makeBlankWord(theBlankArray);
var displayBlankWord = Game.displayGameWord(theBlankArray);

// Initialize a place to put wrong guesses.
var wrongGuesses = [];
var wrongGuessCount = 0;

var winsCounter = 0;
var lossesCounter = 0;

console.log(displayBlankWord);

function reset() {
	theList = Game.wordList;
	wordToGuess = Game.chooseWord(theList);

	// Initialize a blank word to display on page load.
	theBlankArray = Game.makeBlankArray(wordToGuess);
	noDisplayBlankWord = Game.makeBlankWord(theBlankArray);
	displayBlankWord = Game.displayGameWord(theBlankArray);

	// Initialize a place to put wrong guesses.
	wrongGuesses = [];
	wrongGuessCount = 0;

}

// When the page loads, it displays the word to be filled.
window.onload = function(event){
	document.querySelector('#wordToFill').innerHTML = displayBlankWord;
}

// every key press, this runs.
document.onkeyup = function(event){
	// your guess.
	var keyPress = Game.guess();

	var letterIsGuessed = Game.isGuessed(wrongGuesses, keyPress);

	// GAME LOGIC VARIABLES

	if (letterIsGuessed) {

	} else {

		
		// checks guess against hangman word.
		var guessInWord = Game.checkWord(wordToGuess, keyPress);

		// if guess is in word, finds which indices equal keyPress, and replace blank with KeyPress on blank array.
		var updatedArray = Game.replaceLetter(guessInWord, keyPress, wordToGuess, theBlankArray);
		var updatedWord = Game.displayGameWord(updatedArray)
		console.log(updatedWord);

		// if you've already guessed this letter, skip code that increments counters.
		// var alreadyGuessed = Game.checkWord(updatedWord, keyPress);

		// GAME DISPLAY

		document.querySelector("#wordToFill").innerHTML = updatedWord;
		if (!guessInWord) {
			//if (Game.checkWord())
			wrongGuesses.push(keyPress);
			var something = Game.displayGameWord(wrongGuesses);
			document.querySelector("#wrongGuess").innerHTML = wrongGuesses;
			wrongGuessCount++;
		}

		var guessesLeft = (9 - wrongGuessCount);	
		console.log(guessesLeft);
		document.querySelector("#triesLeft").innerHTML = guessesLeft;
		var compareUpdatedWord = updatedWord.replace(/\s/g, ''); // removes spaces from word.

		if (guessesLeft > 0) {
			if(compareUpdatedWord === wordToGuess){
				winsCounter++;
				var snd = new Audio("assets/audio/blip-sfx.mp3"); // buffers automatically when created
				snd.play();
				document.querySelector("#wins").innerHTML = winsCounter;
				reset();
			}
		} else if (guessesLeft === 0) {
			console.log("You were hanged.");
			lossesCounter++;
			document.querySelector("#losses").innerHTML = lossesCounter;
			reset();

		}
	}
	console.log(wordToGuess);
	//console.log(updatedWord);
}
// var keyPress = Game.guess();
// console.log(keyPress);
//console.log(Game.test);

//var wordToGuess = Game.chooseWord(wordList);
//Game.checkWord(wordToGuess, keyPress);
