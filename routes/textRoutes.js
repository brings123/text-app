const express = require('express')
const textController = require('../controllers/textController')
const paginatedResults = require('../middlewares/paginatedResults')

const router = express.Router()


// @route GET /text/
// @desc Fetch list of text with the support of pagination 
// @access Public
router.get('/',paginatedResults,textController.index)

// @route POST /text/
// @desc Upload and store text with unique Id to database 
// @access Public
router.post('/', textController.store)

// @route PUT /text/:textId
// @desc Update text content
// @access Public
router.put('/:textId', textController.update)

// @route GET /text/:textId/count
// @desc Fetch total word number of given a text
// @access Public
router.get('/:textId/count', textController.countInText)

// @route GET /text/:textId/count/:language
// @desc Fetch total word number based on given text for specific languages ex: fr, ar, en
// @access Public
router.get('/:textId/count/:language', textController.countInTextForLanguage)

// @route GET /text/mostOccurent
// @desc Get the most recurrent word in the whole text database
// @access Public
router.get('/mostOccurent', textController.mostOccurent)

// @route GET /text/search?q=
// @desc Fetch text based on fuzzy search using query q
// @access Public
router.get('/search', textController.fuzzySearch)


module.exports = router