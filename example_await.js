const Convert = require('heic')
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
    const newFile_1 = await convert.cli(filePath)
    console.log(`${newFile_1} - Done`)

    // .HEIC FILE -> .JPG FILE
    const newFile_2 = await convert.fileToFile(filePath)
    console.log(`${newFile_2} - Done`)

    // .HEIC FILE -> .JPG BUFFER
    const outputBuffer_1 = await convert.fileToBuffer(filePath)
    console.log(outputBuffer_1)

    // .HEIC BUFFER -> .JPG BUFFER
    const outputBuffer_2 = await convert.bufferToBuffer(buffer)
    console.log(outputBuffer_2)

    // .HEIC BUFFER -> .JPG FILE
    const fileName_3 = await convert.bufferToFile(buffer, filePath)
    console.log(`${fileName_3} - Done`)
}
func()