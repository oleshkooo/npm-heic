const { promisify } = require('util')
const fs = require('fs')

const Convert = require('heic')

const func = async () => {
    // create a class instance
    const convert = new Convert()

    // path to the file to convert
    const filePath = 'someFile.HEIC'

    // create a buffer from buffer
    const buffer = await promisify(fs.readFile)(filePath)

    // .HEIC FILE -> .JPG FILE (with progress bar in terminal)
    const newFile1 = await convert.cli(filePath)
    console.log(`${newFile1} - Done`)

    // .HEIC FILE -> .JPG FILE
    const newFile2 = await convert.fileToFile(filePath)
    console.log(`${newFile2} - Done`)

    // .HEIC FILE -> .JPG BUFFER
    const outputBuffer1 = await convert.fileToBuffer(filePath)
    console.log(outputBuffer1)

    // .HEIC BUFFER -> .JPG BUFFER
    const outputBuffer2 = await convert.bufferToBuffer(buffer)
    console.log(outputBuffer2)

    // .HEIC BUFFER -> .JPG FILE
    const fileName3 = await convert.bufferToFile(buffer, filePath)
    console.log(`${fileName3} - Done`)
}
func()
