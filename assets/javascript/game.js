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
		"disestablishmentarianism",
		"four"
	],
	// Takes any keypress and stores it in var letter.
	guess: function () {
		var letter = String.fromCharCode(event.keyCode).toLowerCase();
		document.querySelector("#inputKey").innerHTML = letter;

		console.log(letter);
		return letter;
	},
	// Chooses a word from the list.
	chooseWord: function (list) {
		//console.log(list);
		var num = Math.floor((Math.random() * list.length));
		//console.log(num);
		console.log(list[num]);
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
					blankArray[i].replace("_", guess);
					console.log("replaced: " + blankArray[i].replace("_", guess))
				}
			}
			return blankArray;
		} else {
			return blankArray;
		}
	}
}

// This is the hangman word.
var theList = Game.wordList;
var wordToGuess = Game.chooseWord(theList);

// Initialize a blank word to display on page load.
var theBlankArray = Game.makeBlankArray(wordToGuess);
var displayBlank = Game.displayGameWord(theBlankArray);
console.log(displayBlank);

// every key press, this runs.
document.onkeydown = function(event){
	// your guess.
	var keyPress = Game.guess();
	
	// checks guess against hangman word.
	var guessInWord = Game.checkWord(wordToGuess, keyPress);

	// if guess is in word, finds which indices equal keyPress, and replace blank with KeyPress on blank array.
	var newArray = Game.replaceLetter(guessInWord, keyPress, wordToGuess, theBlankArray);
	console.log(newArray);
}
// var keyPress = Game.guess();
// console.log(keyPress);
//console.log(Game.test);

//var wordToGuess = Game.chooseWord(wordList);
//Game.checkWord(wordToGuess, keyPress);
