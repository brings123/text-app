const fs = require('fs')
const path = require('path')

// @input relativepath: the relative path from the app path to store the json file
// @input data: the js object 
// @desc write a jsobject on a json file
const writeData = (relativePath, data) => {
    const newData = JSON.stringify(data);
    fs.writeFileSync(path.resolve(__dirname, relativePath), newData);
    return newData
}

module.exports = writeData