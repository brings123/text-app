const readData = require('../utils/readData')
const writeData = require('../utils/writeData')
const combineTexts = require('../utils/combineTexts')
const mostOccurent = require('../utils/mostOccurent')
const { v4: uuidv4 } = require('uuid')
const Fuse = require('fuse.js')

const textController = {}

// @desc Fetch list of text with the support of pagination 
textController.index = (req, res) => {
    res.json(res.paginatedResults)
}

// @desc Upload and store text with unique Id to database 
textController.store = (req, res) => {
    let text = {}
    if(process.env.NODE_ENV === 'test'){
        text = {
            _id:3,
            en:req.body.en,
            fr:req.body.fr,
            ar:req.body.ar
        }
    }else{
         text = {
            _id: uuidv4(),
            en:req.body.en,
            fr:req.body.fr,
            ar:req.body.ar
        }
    }
    
    // Read data
    const texts = readData()
    // insert new text to the texts array and create the new object  
    const array = texts.texts
    array.push(text)
    const newTexts = {texts: array}
    // write the new object that contain the new text added on the json file
    path = process.env.NODE_ENV === 'test' ? "../data/texts_testing.json" : "../data/texts.json"
    writeData(path, newTexts)
    res.json(newTexts)
}

// @desc Update text content
textController.update = ( req, res ) => {
    let texts = readData()
    const array = texts.texts
    array.forEach((text) => {
        if(text._id == req.params.textId){
            text._id = text._id
            text.ar = req.body.ar ? req.body.ar : text.ar
            text.fr = req.body.fr ? req.body.fr : text.fr
            text.en = req.body.en ? req.body.en : text.en
        }
    })
    const newTexts = {texts: array}
    path = process.env.NODE_ENV === 'test' ? "../data/texts_testing.json" : "../data/texts.json"
    writeData(path, newTexts)
    res.status(200).json({message:"Text updated successfully"})
}

// @desc Fetch total word number of given a text
textController.countInText = (req, res) => {
    const text = readData()
    var countAr = 0
    var countEn = 0
    var countFr = 0
    const texts = text.texts
    texts.map((text) => {
        if(text._id == req.params.textId){
            countAr = text.ar ? text.ar.split(" ").length  : 0
            countFr = text.fr ? text.fr.split(" ").length  : 0
            countEn = text.en ? text.en.split(" ").length  : 0
        }
    })
    res.json({
        ar: countAr,
        fr: countFr,
        en: countEn,
        total: countAr + countFr + countEn
    })
}

// @desc Fetch total word number based on given text for specific languages ex: fr, ar, en
textController.countInTextForLanguage = (req, res) => {
    const text = readData()
    var count = 0
    const texts = text.texts
    texts.map((text) => {
        if(text._id == req.params.textId){
            
            count = text[req.params.language] ? text[req.params.language].split(" ").length : 0
        }
    })
    res.json({
        count
    })

}

/* 
    @logic 
        1 - combine all texts for each language of the db
        2 - then for each language (fr, en , ar):
            2.1 - get the most occurent word on that language
            2.2 - get the most occurent word on all languages and return it
    @desc Get the most recurrent word in the whole text database
*/
textController.mostOccurent = (req, res) => {
    var mostOccurrentAll = { 
        occurence: 0,
        word: "",
        language: ""
    }

    const languages = ["fr", "en", "ar"]
    var mostOccurentTemp = null

    const texts = readData()
    // @result one big text for each language (en, fr ,ar)
    const allText = combineTexts(texts.texts)
    // @desc calculate the most occurent word for each language
    languages.forEach(language => {

        mostOccurentTemp = mostOccurent(allText[language])

        if(mostOccurentTemp.occurence > mostOccurrentAll.occurence){
            mostOccurrentAll.occurence = mostOccurentTemp.occurence
            mostOccurrentAll.word = mostOccurentTemp.word
            mostOccurrentAll.language = language
        }
    })

    res.json(mostOccurrentAll)
}

// @desc fuzzy search based on query q on all the db
textController.fuzzySearch = (req, res) => {
    const results = {}
    const allText = readData().texts
    if(req.query.q != undefined){
        const options = {
            includeScore: process.env.NODE_ENV === 'test' ? false : true,
            // Search in all three languages
            keys: ['fr', 'en', 'ar']
          }
    
          const fuse = new Fuse(allText, options)
          results.results = fuse.search(req.query.q)
          res.json(results)
    }else{
        res.status(404).json({message: "No query found!"})
    }
}

module.exports = textController