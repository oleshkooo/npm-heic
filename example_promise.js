const Convert = require('heic-jpg-convert')
const { promisify } = require('util')
const fs = require('fs')


const func = async () => {
    // create a class instance
    const convert = new Convert()

    // path to the file to convert
    const filePath = 'someFile.HEIC'

    // create a buffer from buffer
    const buffer = await promisify(fs.readFile)(filePath);


    // .HEIC FILE -> .JPG FILE (with progress bar in terminal)
    convert.cli(filePath)
        .then(file => console.log(`${file} - Done`))
        .catch(([ err, file ]) => {
            console.error(err)
            console.log(file)
        })

    // .HEIC FILE -> .JPG FILE
    convert.fileToFile(filePath)
        .then(file => console.log(`${file} - Done`))
        .catch(err => console.error(err))

    // .HEIC FILE -> .JPG BUFFER
    convert.fileToBuffer(filePath)
        .then(buffer => console.log(buffer))
        .catch(err => console.error(err))

    // .HEIC BUFFER -> .JPG BUFFER
    convert.bufferToBuffer(buffer)
        .then(buffer => console.log(buffer))
        .catch(err => console.error(err))

    // .HEIC BUFFER -> .JPG FILE
    convert.bufferToFile(buffer, filePath)
        .then(file => console.log(`${file} - Done`))
        .catch(err => console.log(err))
}
func()