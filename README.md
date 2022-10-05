# Install
```
npm i heic

# install globally
npm i heic -g
```

# CLI
```
# Convert one file
heic [file.HEIC]

# Convert two or more files
heic [file1.HEIC] [file2.HEIC]

# Convert all files in current directory
heic *
```

# Usage
Convert a .HEIC file/Buffer to .JPG file/Buffer

## Await
```
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
```

## Promises
```
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
    convert
        .cli(filePath)
        .then(file => console.log(`${file} - Done`))
        .catch(([err, file]) => {
            console.error(err)
            console.log(file)
        })

    // .HEIC FILE -> .JPG FILE
    convert
        .fileToFile(filePath)
        .then(file => console.log(`${file} - Done`))
        .catch(err => console.error(err))

    // .HEIC FILE -> .JPG BUFFER
    convert
        .fileToBuffer(filePath)
        .then(buffer => console.log(buffer))
        .catch(err => console.error(err))

    // .HEIC BUFFER -> .JPG BUFFER
    convert
        .bufferToBuffer(buffer)
        .then(buffer => console.log(buffer))
        .catch(err => console.error(err))

    // .HEIC BUFFER -> .JPG FILE
    convert
        .bufferToFile(buffer, filePath)
        .then(file => console.log(`${file} - Done`))
        .catch(err => console.log(err))
}
func()
```