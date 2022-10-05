#!/usr/bin/env node

const path = require('path')
const fs = require('fs')

const chalk = require('chalk') // chalk@4.1.2

const Convert = require('../index.js')

const packageName = 'heic'
const prefix = `[${packageName}]`
const blue = chalk.rgb(101, 155, 211)
const red = chalk.rgb(255, 0, 0).bold

const args = process.argv.slice(2)
const currentDirectory = process.cwd()
const allFlag = args.includes('*')
const helpFlag = args.includes('-h') || args.includes('--help')

const convert = new Convert()

const start = () => {
    console.log(blue(`${prefix} Starting...`))
}

const help = () => {
    const tab = '  '

    console.log(blue(`\n${tab}${packageName} is used to convert .HEIC files to .JPG`))

    console.log(blue(`\n\n${tab}Options:`))
    console.log(blue(`${tab}    [file.HEIC] ............. Convert one file`))
    console.log(blue(`${tab}    [file1.HEIC] [file2.HEIC] ..... Convert two or more files`))
    console.log(blue(`${tab}    * ......................... Convert all files in current directory`))

    console.log(blue(`\n\n${tab}Examples:`))
    console.log(blue(`${tab}    heic [file.HEIC]`))
    console.log(blue(`${tab}    heic [file1.HEIC] [file2.HEIC]`))
    console.log(blue(`${tab}    heic *`))

    process.exit()
}

const noArgs = () => {
    console.log(red(`${prefix} Error: no file name passed`))
}

const oneArg = () => {
    start()
    convert
        .cli(args[0])
        .then(file => console.log(blue(`${file} - Done`)))
        .catch(([err, file]) => console.log(red(`${file} - Error`)))
}

const moreArgs = async () => {
    start()
    for (let i = 0; i < args.length; i++) {
        await convert
            .cli(args[i])
            .then(file => console.log(blue(`${file} - Done`)))
            .catch(([err, file]) => console.log(red(`${file} - Error`)))
    }
}

const allFiles = () => {
    start()
    fs.readdir(currentDirectory, async (err, files) => {
        if (err) return console.log(red('Unable to scan directory'))

        for (const file of files) {
            const fileExt = path.parse(file).ext.toLowerCase()
            const fileBase = path.parse(file).base

            if (fileExt == '.heic') {
                await convert
                    .cli(fileBase)
                    .then(file => console.log(blue(`${file} - Done`)))
                    .catch(([err, file]) => console.log(red(`${file} - Error`)))
            }
        }
    })
}

if (helpFlag) help()
else if (args.length == 0) noArgs()
else if (allFlag) allFiles()
else if (args.length == 1 && !allFlag) oneArg()
else moreArgs()
