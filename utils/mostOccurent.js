const wordOccurence = require('./wordOccurence')

// @desc calculate the most occurent word in a given text 
const mostOccurent = (text) => {
    var wordsAlredyParsed = {words: []}
    var tempOccurence = 0
    var mostOccurrentWord = { word: "", occurence: 0}
    var word = ""
    const allWords = text.split(" ")

    for(var i = 0; i < allWords.length; i++){
        word = allWords[i]
        if(wordsAlredyParsed.words.indexOf(word) == -1){
            tempOccurence =  wordOccurence(word, text)
            if(tempOccurence > mostOccurrentWord.occurence){
                mostOccurrentWord.word = word
                mostOccurrentWord.occurence = tempOccurence
            }
            wordsAlredyParsed.words.push(word)
        }
    }
    return mostOccurrentWord
}

module.exports = mostOccurent