const readData = require("../utils/readData.js")

// @desc paginate the results middleware
const paginatedResults = (req, res, next) => {
        const results = {}

        const totalResults = readData()

        if(req.query.page != undefined && req.query.limit != undefined){
            const page = parseInt(req.query.page)
            const limit = parseInt(req.query.limit)

            const startIndex = (page - 1) * limit
            const endIndex = page * limit
        
            if(startIndex > 0){
                results.previous = {
                    page: page - 1,
                    limit
                }
            }

            if(endIndex < totalResults.texts.length){
                results.next = {
                    page: page + 1,
                    limit
                }
            }

            results.results = totalResults.texts.slice(startIndex, endIndex)
        }else{
            results.results = totalResults.texts
        }
        res.paginatedResults = results
        next()
        
    }

module.exports = paginatedResults 