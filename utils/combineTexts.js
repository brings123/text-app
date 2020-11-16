
// @input texts: the texts database that contains all texts in 3 languages
// @output {fr: "...", en:"...", ar:"..."} combined texts of the database for each language
const combineTexts = (texts) => {
    var concatText = {
        ar: "",
        fr: "",
        en: ""
    }
    
    texts.map(text => {
        concatText.ar = (text.ar && concatText.ar != "") ? concatText.ar + " " + text.ar : text.ar ? text.ar : concatText.ar
        concatText.fr = (text.fr && concatText.fr != "") ? concatText.fr + " " + text.fr : text.fr ? text.fr : concatText.fr
        concatText.en = (text.en && concatText.en != "") ? concatText.en + " " + text.en : text.en ? text.en : concatText.en
    })

    return concatText
}

module.exports = combineTexts