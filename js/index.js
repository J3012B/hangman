const wordCollection = ['grit', 'creativity', 'impact', 'diversity', 'trust']
var currentWord;

$(document).ready(function() { 
	const giveUpButton = document.getElementById("giveUpButton");

	giveUpButton.onclick = resetGame;
 });

function resetGame() {
	currentWord = wordCollection[Math.floor(Math.random() * wordCollection.length)];

	console.log(currentWord);
}