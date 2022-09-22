# Install
```
npm i @oleshkooo/heic

# to use in terminal
npm i @oleshkooo/heic -g

# to run in terminal use
heic [image.HEIC]
```

# Usage
Convert a .HEIC file/Buffer to .JPG file/Buffer

## Await
```
const Convert = require('@oleshkooo/heic')
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
```

## Promises
```
const Convert = require('@oleshkooo/heic')
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
```