const fs = require('fs')
const path = require('path')

file_path = process.env.NODE_ENV === 'test' ? "../data/texts_testing.json" : "../data/texts.json"

// @desc read the data from a json file and return the equivalent js object
const readData = (relativePath = file_path) => {
    let buffer = fs.readFileSync(path.resolve(__dirname, relativePath));
    let texts = JSON.parse(buffer);
    return texts
}

module.exports = readData