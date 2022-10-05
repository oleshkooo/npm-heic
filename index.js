const path = require('path')
const fs = require('fs')

const { promisify } = require('util')

const heicConvert = require('heic-convert')
const ProgressBar = require('progress')

class Convert {
    /**
     * @param {String} file
     * @description remove file extension
     * @return {String} file without extension
     * @example
     * const file = './directory/file.exe'
     * const noExt = this.removeExtension(file)
     * // ./directory/file
     */
    #removeExtension = file => {
        const lastDotPosition = file.lastIndexOf('.')
        if (lastDotPosition === -1) return file
        else return file.substr(0, lastDotPosition)
    }

    /**
     * @param {String} filePath path to your file
     * @description convert .heic to .jpg file with progress bar in terminal
     * @return {Promise<String>} Promise with file name string
     * @error returns [error, fileName]
     * @example
     * const convert = new Convert()
     * convert.cli('someFile.HEIC')
     */
    cli = async filePath =>
        new Promise(async (resolve, reject) => {
            let fileName
            let progressBar

            try {
                // if (path.parse(filePath).ext.toLocaleLowerCase() != '.heic')
                //     throw err()
                fileName = path.parse(filePath).name
                progressBar = new ProgressBar(`${fileName} |:bar| :percent :elapseds`, {
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

                resolve(fileName)
            } catch (err) {
                progressBar.terminate()
                reject([err, fileName])
            }
        })

    /**
     * @param {String} filePath path to your file
     * @description convert .heic to .jpg file
     * @return {Promise<void>} Promise with file name string
     * @example
     * const convert = new Convert()
     * convert.fileToFile('someFile.HEIC')
     */
    fileToFile = async filePath =>
        new Promise(async (resolve, reject) => {
            try {
                const fileName = path.parse(filePath).name
                const filePathNoExt = this.#removeExtension(filePath)
                const inputBuffer = await promisify(fs.readFile)(filePath)
                const outputBuffer = await heicConvert({
                    buffer: inputBuffer,
                    format: 'JPEG',
                })
                await promisify(fs.writeFile)(`${filePathNoExt}.jpg`, outputBuffer)
                resolve(fileName)
            } catch (err) {
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
    fileToBuffer = async filePath =>
        new Promise(async (resolve, reject) => {
            try {
                const inputBuffer = await promisify(fs.readFile)(filePath)
                const outputBuffer = await heicConvert({
                    buffer: inputBuffer,
                    format: 'JPEG',
                })
                resolve(outputBuffer)
            } catch (err) {
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
    bufferToBuffer = async buffer =>
        new Promise(async (resolve, reject) => {
            try {
                const outputBuffer = await heicConvert({
                    buffer: buffer,
                    format: 'JPEG',
                })
                resolve(outputBuffer)
            } catch (err) {
                reject(err)
            }
        })

    /**
     * @param {Buffer} buffer
     * @param {String} filePath
     * @description convert .heic to .jpg file
     * @return {Promise<void>} Promise with file name string
     * @example
     * let someBuffer = ...
     * const convert = new Convert()
     * convert.bufferToFile(someBuffer)
     */
    bufferToFile = async (buffer, filePath) =>
        new Promise(async (resolve, reject) => {
            try {
                const fileName = path.parse(filePath).name
                const outputBuffer = await heicConvert({
                    buffer: buffer,
                    format: 'JPEG',
                })
                await promisify(fs.writeFile)(`${filePath}.jpg`, outputBuffer)
                resolve(fileName)
            } catch (err) {
                reject(err)
            }
        })
}
module.exports = Convert
