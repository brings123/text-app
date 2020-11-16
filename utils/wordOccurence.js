
// @desc calculate the number of occurences of a word in a given text
const wordOccurence = (word, text) => {
    var count = 0
    const wordsInText = text.split(" ")
    wordsInText.forEach(currentWord => {
        if(currentWord == word){
            count++
        }
    })
    return count
}

module.exports = wordOccurence
