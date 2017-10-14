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
	// Already guessed? More like function already made.
	alreadyGuessed: function (wordToFill, theGuess){
		var letterInWord = false;

		// is guess in word to fill?
		for (var i = 0; i < wordToFill.length; i++) {
			if (theGuess === word.charAt(i)) {
				letterInWord = true
			}
		}
		return letterInWord;
	}
	// functions display 
}

// This is the hangman word.
var theList = Game.wordList;
var wordToGuess = Game.chooseWord(theList);

// Initialize a blank word to display on page load.
var theBlankArray = Game.makeBlankArray(wordToGuess);
var noDisplayBlankWord = Game.makeBlankWord(theBlankArray);
var displayBlankWord = Game.displayGameWord(theBlankArray);

// Initialize a place to put wrong guesses.
var wrongGuesses = [];
var wrongGuessCount = 0;

console.log(displayBlankWord);
// When the page loads, it displays the word to be filled.
window.onload = function(event){
	document.querySelector('#wordToFill').innerHTML = displayBlankWord;
}

// every key press, this runs.
document.onkeyup = function(event){

	// GAME LOGIC VARIABLES

	// your guess.
	var keyPress = Game.guess();
	//console.log(updatedWord);
	//var alreadyGuessed = Game.checkWord(updatedWord, keyPress);
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

	var guessesLeft = (6 - wrongGuessCount);	
	console.log(guessesLeft);
	document.querySelector("#triesLeft").innerHTML = guessesLeft;

	if (guessesLeft === 0) {
		console.log("You were hanged.");
		document.querySelector("#youLose").innerHTML = "You Lose!"
	} else if (guessesLeft === (-20)) {
		document.querySelector("#youLose").innerHTML = "You know... if all these answers were unique, you'd have won by now."
	}
}
// var keyPress = Game.guess();
// console.log(keyPress);
//console.log(Game.test);

//var wordToGuess = Game.chooseWord(wordList);
//Game.checkWord(wordToGuess, keyPress);
