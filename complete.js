////////////////////////////////////
//////////// Auto Suggest

// Function called when user input something
function filterResult(){
    // Get user input
	let resultInput = document.getElementById("resultInput").value;
    // Check if last input was a backspace
    let backspaceActivated = false;
	if (this.currentIndex == resultInput.length || resultInput.length == 0) {
		backspaceActivated = true;
	}
    this.currentIndex = resultInput.length - 1;
    // If the user backspaced, we need to research the whole word to get again the possible words.
	if (backspaceActivated || resultInput.length == 1) {
		getResultsByWholeWord(this.results, resultInput);
	}else{
        // If the user added characters, we filter the possible results
		if (this.resultsCount > 0) {
			filterResultsByLetter(resultInput[this.currentIndex], this.currentIndex);
		}
    }
    // Refresh the DIV result with possible words
    
    document.getElementById('result').innerHTML = this.possibleResults;
}

function getResultsByWholeWord(results, word){
	resetPossibleResults();		
    // First, we get all possible words by first letter
	getResultsByLetter(results, word);
    // Then, we start to filter the result by the next letters
	for(let i = 1; i < word.length; i++){
		filterResultsByLetter(word[i], i);
	}

}

function getResultsByLetter(results, word){
    // We pass through all possible words to see which start with the inputed letter;
	for (let i = 0; i < results.length; i++) {
		if (word.length > 0 && (results[i][0].toLowerCase() == word[0].toLowerCase()
			|| results[i][1].toLowerCase() == word[0].toLowerCase())){
				this.possibleResults[this.resultsCount] = results[i];
				this.resultsCount++;
		}
	}
}

function filterResultsByLetter(letter, letterPosition){
    // Create a variable to calculate the mismatch tolerance between the input and preset word based on the size of the input
    let mismatchTolerance = Math.floor((this.currentIndex/4) + 1);
    // Pass through every possible result and filter based on last inputed letter
	for (var i = 0; i < this.possibleResults.length; i++) {
        // Check if the last inputed letter correlate to i position of the possible word
		if (this.possibleResults[i].length > letterPosition
			 && (this.possibleResults[i][letterPosition].toLowerCase() != letter.toLowerCase()
				&& (this.possibleResults[i][letterPosition + 1] != undefined
				 && this.possibleResults[i][letterPosition + 1].toLowerCase() != letter.toLowerCase()))){
				if (this.possibleResults[i][0] == undefined)
					this.possibleResults[i][0] = 0;
                
                // Check if the mismatch tolerance is filled, if so, we remove the word from the possible pool
				if (this.possibleResults[i][0] <= mismatchTolerance){
                    this.possibleResults[i][0]++;
				}else{
					this.possibleResults.splice(i, 1);
					this.resultsCount--;
				}
        }
        // If the inputed word is bigger than the i possible result, we remove this word from the possible pool 
        if(this.possibleResults[i].length < letterPosition){
            this.possibleResults.splice(i, 1);
        }
	}
}
// Reset the control variables of the script
function resetPossibleResults(){
	this.possibleResults.length = 0;
	this.resultsCount = 0;
}
//////////// End Auto Suggest
////////////////////////////////////


// Aux function to remove punctuation
function removeAccent(stringWithPunctuation) {
 	let string = stringWithPunctuation;
	let mapaAcentosHex = {
	a : /[\xE0-\xE6]/g,
	A : /[\xC0-\xC6]/g,
	e : /[\xE8-\xEB]/g,
	E : /[\xC8-\xCB]/g,
	i : /[\xEC-\xEF]/g,
	I : /[\xCC-\xCF]/g,
	o : /[\xF2-\xF6]/g,
	O : /[\xD2-\xD6]/g,
	u : /[\xF9-\xFC]/g,
	U : /[\xD9-\xDC]/g,
	c : /\xE7/g,
	C : /\xC7/g,
	n : /\xF1/g,
	N : /\xD1/g,
	};

	for ( let letra in mapaAcentosHex ) {
		let expressaoRegular = mapaAcentosHex[letra];
		string = string.replace( expressaoRegular, letra );
	}

	return string;
}