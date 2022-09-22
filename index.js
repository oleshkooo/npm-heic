const path = require('path')
const fs = require('fs')
const { promisify } = require('util')
const heicConvert = require('heic-convert')
const ProgressBar = require('progress')


const args = process.argv.slice(2)
const currentDirectory = process.cwd()
let allFlag = args.includes('*')


class Convert {
    #removeExtension = file => {
        var lastDotPosition = file.lastIndexOf(".");
        if (lastDotPosition === -1) return file;
        else return file.substr(0, lastDotPosition);
    }

    /**
     * @param {String} filePath path to your file
     * @description convert .heic to .jpg file with progress bar in terminal
     * @return {Promise<void>} Promise with no value
     * @example
     * const convert = new Convert()
     * convert.cli('someFile.HEIC')
     */
    cli = async filePath => new Promise(async (resolve, reject) => {
        try {
            const fileName = path.parse(filePath).name

            var progressBar = new ProgressBar(`${fileName} |:bar| :percent :elapseds`, {
                complete: '█',
                incomplete: ' ',
                width: 20,
                total: 5,
                clear: true,
            })
            progressBar.tick()

            const filePathNoExt = this.#removeExtension(filePath)
            progressBar.tick()

            const inputBuffer = await promisify(fs.readFile)(filePath)
            progressBar.tick()

            const outputBuffer = await heicConvert({
                buffer: inputBuffer,
                format: 'JPEG',
            })
            progressBar.tick()

            await promisify(fs.writeFile)(`${filePathNoExt}.jpg`, outputBuffer)
            progressBar.tick()

            console.log(`${fileName} - Done`)
            resolve()
        }
        catch (err) {
            // reject(' - Error occured')
            reject(err)
        }
    })

    /**
     * @param {String} filePath path to your file
     * @description convert .heic to .jpg file
     * @return {Promise<void>} Promise with no value
     * @example
     * const convert = new Convert()
     * convert.fileToFile('someFile.HEIC')
     */
    fileToFile = async filePath => new Promise(async (resolve, reject) => {
        try {
            const filePathNoExt = await this.#removeExtension(filePath)
            const inputBuffer = await promisify(fs.readFile)(filePath)
            const outputBuffer = await heicConvert({
                buffer: inputBuffer,
                format: 'JPEG',
            })
            await promisify(fs.writeFile)(`${filePathNoExt}.jpg`, outputBuffer)
            resolve()
        }
        catch (err) {
            reject(err)
        }
    })

    /**
     * @param {String} filePath path to your file
     * @description convert .heic to .jpg file
     * @return {Promise<Buffer>} Promise with Buffer value
     * @example
     * const convert = new Convert()
     * let buffer = convert.fileToBuffer('someFile.HEIC')
     */
    fileToBuffer = async filePath => new Promise(async (resolve, reject) => {
        try {
            const inputBuffer = await promisify(fs.readFile)(filePath)
            const outputBuffer = await heicConvert({
                buffer: inputBuffer,
                format: 'JPEG',
            })
            resolve(outputBuffer)
        }
        catch (err) {
            reject(err)
        }
    })

    /**
     * @param {Buffer} buffer file buffer
     * @description convert .heic to .jpg file
     * @return {Promise<Buffer>} Promise with Buffer value
     * @example
     * let someBuffer = ...
     * const convert = new Convert()
     * let buffer = convert.bufferToBuffer(someBuffer)
     */
    bufferToBuffer = async buffer => new Promise(async (resolve, reject) => {
        try {
            const outputBuffer = await heicConvert({
                buffer: buffer,
                format: 'JPEG',
            })
            resolve(outputBuffer)
        }
        catch (err) {
            reject(err)
        }
    })

    /**
     * @param {Buffer, String}
     * @description convert .heic to .jpg file
     * @return {Promise<void>} Promise with no value
     * @example
     * let someBuffer = ...
     * const convert = new Convert()
     * convert.bufferToFile(someBuffer)
     */
    bufferToFile = async (buffer, filePath) => new Promise(async (resolve, reject) => {
        this.bufferToFile()
        try {
            const outputBuffer = await heicConvert({
                buffer: buffer,
                format: 'JPEG',
            })
            await promisify(fs.writeFile)(`${filePath}.jpg`, outputBuffer)
            resolve()
        }
        catch (err) {
            reject(err)
        }
    })
}
module.exports = Convert


const convert = new Convert()


if (args.length == 0) {
    console.log('No file passed')
}
else if (allFlag) {
    fs.readdir(currentDirectory, async (err, files) => {
        if (err)
            return console.log('Unable to scan directory')

        for (const file of files) {
            const fileExt = path.parse(file).ext.toLowerCase()
            const fileBase = path.parse(file).base

            if (fileExt == '.heic')
                await convert.cli(fileBase)
                .catch(err => console.log(err))
        }
    })
}
else if (args.length == 1 && !allFlag) {
    convert.cli(args[0])
    .catch(err => console.log(err))
}
else {
    const asyncConvert = async () => {
        for (let i = 0; i < args.length; i++) {
            await convert.cli(args[i])
            .catch(err => console.log(err))
        }
    }
    asyncConvert()
}