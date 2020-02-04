/// All words, which can be guessed in the game.
const wordCollection = ['grit', 'creativity', 'impact', 'diversity', 'trust'];

/// The word, which is currently guessed.
var currentWord;
/// The letters, which were already guessed properly.
var guessedLetters;
/// The amount of wrong guesses yet.
var wrongGuessCounter;
/// The letters, which weren't correct.
var missedLetters;

$(document).ready(function() { 
	startNewGame();
 });

 /*
 	GAME LOGIC
 */

// Reset the whole game and start a new game. Resets game values and the UI.
function startNewGame() {
	// Reset all variables
	resetGameState();

	// Update UI
	setUI(wrongGuessCounter, currentWord, guessedLetters, missedLetters);
}

// Resets the state
function resetGameState() {
	currentWord = wordCollection[Math.floor(Math.random() * wordCollection.length)];
	guessedLetters = [];
	missedLetters = [];
	wrongGuessCounter = 0;
}

// Guess a character and decide how game continues
function guessCharacter(character) {
	// The letter was correct
	if (currentWord.includes(character)) {
		guessedLetters += character;

		// Decide wether the player has won

		const currentWordAsSet = Array.from(new Set(currentWord.split('')));
		const guessedLettersAsSet = Array.from(new Set(guessedLetters));

		if (guessedLettersAsSet.length === currentWordAsSet.length) {
			playerWon();
		}
	// The letter was not correct
	} else {
		wrongGuessCounter ++;
		missedLetters += character;

		// Decide wether the player has lost

		if (wrongGuessCounter == hangman.length - 1) {
			playerLost();
		}
	}

	// Update the UI
	setUI(wrongGuessCounter, currentWord, guessedLetters, missedLetters);
}

function playerWon() {
	alert("You won! :D\nYou guessed the word '" + currentWord + "'.");
	startNewGame();
}

function playerLost() {
	alert("Game Over! :(\nThe word was '" + currentWord + "'.");
	startNewGame();
}

/*
	UI
*/

// Updates the whole UI
function setUI(wrongGuessCounter, currentWord, guessedLetters, missedLetters) {
	const giveUpButton = document.getElementById("giveUpButton");
	giveUpButton.onclick = startNewGame;

	setHangmanField(wrongGuessCounter);
	setWordField(currentWord, guessedLetters);
	setLetterKeyboard(guessedLetters);
	setMissedLettersLabel(missedLetters);
 }

/// Takes a `word` and displays it through the word field, while the letters from `lettersDisplayed` are displayed already.
function setWordField(word, lettersDisplayed) {
	const wordField = document.getElementById("wordField");

	const wordAsCharArray = word.split('');

	// Construct the content of the word field
	const censoredWord = wordAsCharArray
	.map((character)=>{
		// If the character was not guessed yet, hide it (display as `_`)
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

	// Construct keyboard button for each character of the alphabet
	alphabetAsCharArray.forEach((character) => letterKeyboard.appendChild(
		createLetterButton(character, lettersDisplayed.includes(character))
	));

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
	UI Constructors
*/

function createLetterButton(character, disabled) {
	const upperChar = character.toUpperCase();

	const letterButton = document.createElement("BUTTON"); 

	letterButton.className += " letterKeyboardButton";
	letterButton.innerHTML = upperChar;
	letterButton.id = "letterKeyboardButton_" + upperChar;
	letterButton.disabled = disabled;
	letterButton.onclick = function() {
		guessCharacter(character);
	};

	return letterButton;
}

/*
	HANGMAN ASCII ART (hardcoded)
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