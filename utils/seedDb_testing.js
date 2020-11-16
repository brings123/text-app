const writeData = require('./writeData')

// @desc to seed the testing db with 2 texts
const seedDb_testing = () => {
    const test_text ={
        texts:[
            {
                _id:1,
                en:"This is a legal test text text",
                fr:"Ceci est un texte légale pour les tests",
                ar:"هذا نص قانوني لغرض التجريب"
            },
            {
                _id:2,
                en:"This is a second legal test text text",
                fr:"Ceci est le deuxième texte légale pour les tests",
                ar:"هذا نص قانوني ثاني لغرض التجريب"
            }
        ]
    } 
    writeData("../data/texts_testing.json", test_text)
}


module.exports = seedDb_testing