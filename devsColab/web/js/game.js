var tempWords = [];
// var responseTyped = "";
var currentWord;
var respondNode = document.getElementById('respond');
function init()
{
    nextWord();
    document.body.onkeypress = validateWord;
}

function nextWord() {
    currentWord = pickWord().toUpperCase();
    document.getElementById('wordToGuess').innerHTML = currentWord;
    respondNode.innerHTML = "";
}
function validateWord(event) {

    var keyCode = event.which || event.keyCode;
    // TODO : Filter non-letter keys. Put in CAPS.
    var letter = String.fromCharCode(keyCode).toUpperCase();
    console.log(keyCode);

    switch (keyCode) {
        // 8 corresponds to the backspace.
        case 8:
            removeLetter();
            // responseTyped = responseTyped.substr(0,responseTyped.length-1);
            break;
        // 27 corresponds to escape.
        case 27:
            respondNode.innerText = "";
            // responseTyped = "";
            break;
        default:
            // responseTyped += letter;
            if (letter == currentWord[respondNode.childElementCount]) {
                writeLetter('green',letter);
            } else {
                writeLetter('red',letter);
            }
            if (currentWord.length == respondNode.childElementCount && respondNode.getElementsByClassName('red').length == 0){
                alert('You are a Winner Baby');
                nextWord();

            }
            break;
    }

    // document.getElementById('respond').innerText = responseTyped;

}

function writeLetter(color, letter) {
    var letterNode = document.createElement("span");
    letterNode.innerText = letter;
    letterNode.classList.add(color);
    respondNode.appendChild(letterNode);
}

function removeLetter(){
    if (respondNode.childElementCount > 0){
        respondNode.removeChild(respondNode.lastChild);
    }
}

function pickWord()
{
    if(tempWords.length == 0)
    {
        tempWords = words.slice(0); // Copy words into tempWords
    }

    // Choose a number between 0 (inclusive) and tempWords.length exclusive
    var index = Math.floor(Math.random() * tempWords.length);

    // Take the element, remove it from the tempWords array and return it
    return tempWords.splice(index, 1)[0];
}