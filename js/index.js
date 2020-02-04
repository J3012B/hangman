const wordCollection = ['grit', 'creativity', 'impact', 'diversity', 'trust']
var currentWord;
var guessedLetters;
var wrongGuessCounter;
var missedLetters;

$(document).ready(function() { 
	
	const giveUpButton = document.getElementById("giveUpButton");

	giveUpButton.onclick = resetGame;

	resetGame();
 });

function resetGame() {
	// Reset all variables
	currentWord = wordCollection[Math.floor(Math.random() * wordCollection.length)];
	guessedLetters = [];
	missedLetters = [];
	wrongGuessCounter = 0;

	setWordField(currentWord, guessedLetters);
	setLetterKeyboard(guessedLetters);
	setMissedLettersLabel(missedLetters);

	console.log(currentWord);
}

function guessCharacter(character) {
	guessedLetters += character;

	if (currentWord.includes(character)) {

	} else {
		missedLetters += character;
	}

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

function setMissedLettersLabel(missedLetters) {
	const missedLettersLabel = document.getElementById("missedLettersLabel");

	missedLettersLabel.innerHTML = "Missed Letters: " + String(missedLetters);
} 