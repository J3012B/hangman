const wordCollection = ['grit', 'creativity', 'impact', 'diversity', 'trust']
var currentWord;
var guessedLetters;
var wrongGuessCounter;
var missedLetters;

$(document).ready(function() { 
	resetGame();
 });

// Reset the whole game and start from new.
function resetGame() {
	// Reset all variables
	currentWord = wordCollection[Math.floor(Math.random() * wordCollection.length)];
	guessedLetters = [];
	missedLetters = [];
	wrongGuessCounter = 0;

	setUI(wrongGuessCounter, currentWord, guessedLetters, missedLetters);
}

// Guess a character and decide how gamec continues.
function guessCharacter(character) {
	if (currentWord.includes(character)) {
		guessedLetters += character;

		console.log(currentWord);
		console.log(guessedLetters);

		const currentWordAsSet = Array.from(new Set(currentWord.split('')));
		const guessedLettersAsSet = Array.from(new Set(guessedLetters));

		if (guessedLettersAsSet.length === currentWordAsSet.length) {
			alert("You won! :D\nYou guessed the word '" + currentWord + "'.");
			resetGame();
		}
	} else {
		wrongGuessCounter ++;
		missedLetters += character;

		if (wrongGuessCounter == hangman.length - 1) {
			alert("Game Over! :(\nThe word was '" + currentWord + "'.");
			resetGame();
		}
	}

	setUI(wrongGuessCounter, currentWord, guessedLetters, missedLetters);
}

/*
	UI
*/

// Sets the whole UI.
function setUI(wrongGuessCounter, currentWord, guessedLetters, missedLetters) {
	const giveUpButton = document.getElementById("giveUpButton");
	giveUpButton.onclick = resetGame;

	setHangmanField(wrongGuessCounter);
	setWordField(currentWord, guessedLetters);
	setLetterKeyboard(guessedLetters);
	setMissedLettersLabel(missedLetters);
 }

/// Takes a `word` and displays it through the word field, while the letters from `lettersDisplayed` are displayed already.
function setWordField(word, lettersDisplayed) {
	const wordField = document.getElementById("wordField");

	const wordAsCharArray = word.split('');

	const censoredWord = wordAsCharArray
	.map((character)=>{
		if (!lettersDisplayed.includes(character)) {
			return '_';
		}

		return character;
	})
	.join(' ');

	wordField.innerHTML = censoredWord; 
}

/// Displays all letters from the alphabet as buttons. `lettersDisplayed` are the letters, that are already taken.
function setLetterKeyboard(lettersDisplayed) {
	const letterKeyboard = document.getElementById("letterKeyboard");
	// Clear keyboard
	letterKeyboard.innerHTML = "";

	const alphabetAsCharArray = alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

	alphabetAsCharArray.forEach((character)=>{
		const upperChar = character.toUpperCase();

		const letterButton = document.createElement("BUTTON"); 
		letterButton.className += " letterKeyboardButton";
		letterButton.innerHTML = upperChar;
		letterButton.id = "letterKeyboardButton_" + upperChar;
		letterButton.disabled = lettersDisplayed.includes(character);
		letterButton.onclick = function() {
			guessCharacter(character);
		};

		letterKeyboard.appendChild(letterButton);
	});

}

/// Updates the missed letters label.
function setMissedLettersLabel(missedLetters) {
	const missedLettersLabel = document.getElementById("missedLettersLabel");

	missedLettersLabel.innerHTML = "Missed Letters: " + String(missedLetters);
} 

/// Updates the hangman field.
function setHangmanField(index) {
	const hangmanField = document.getElementById("hangmanField");

	hangmanField.innerHTML = hangman[index];
}

/*
	HANGMAN ASCII ART
*/

const hangman = [`
&nbsp;&nbsp;+---+<br>
&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
=========<br>
`,
`
&nbsp;&nbsp;+---+<br>
&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
=========
`, 
`
&nbsp;&nbsp;+---+<br>
&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
=========<br>
`,
`
&nbsp;&nbsp;+---+<br>
&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;/|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
=========<br>
`, 
`
&nbsp;&nbsp;+---+<br>
&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;/|\\&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
=========<br>
`, 
`
&nbsp;&nbsp;+---+<br>
&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;/|\\&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
=========<br>
`, 
`
&nbsp;&nbsp;+---+<br>
&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;O&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;/|\\&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;/&nbsp;\\&nbsp;&nbsp;&nbsp;&nbsp;|<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br>
=========<br>
`];