const path = require('path')
const fs = require('fs')
const Convert = require('./Convert.js')
module.exports = Convert


const main = () => {
    const args = process.argv.slice(2)
    const currentDirectory = process.cwd()
    let allFlag = args.includes('*')

    const convert = new Convert()

    // no args
    if (args.length == 0) {
        console.log('No file passed')
    }

    // *
    else if (allFlag) {
        fs.readdir(currentDirectory, async (err, files) => {
            if (err)
                return console.log('Unable to scan directory')

            for (const file of files) {
                const fileExt = path.parse(file).ext.toLowerCase()
                const fileBase = path.parse(file).base

                if (fileExt == '.heic') {
                    await convert.cli(fileBase)
                    .then(file => console.log(`${file} - Done`))
                    .catch(([err, file]) => console.log(`${file} - Error occured`))
                }
            }
        })
    }

    // 1 arg
    else if (args.length == 1 && !allFlag) {
        convert.cli(args[0])
        .then(file => console.log(`${file} - Done`))
        .catch(([err, file]) => console.log(`${file} - Error occured`))
    }

    // 2+ args
    else {
        const asyncConvert = async () => {
            for (let i = 0; i < args.length; i++) {
                await convert.cli(args[i])
                .then(file => console.log(`${file} - Done`))
                .catch(([err, file]) => console.log(`${file} - Error occured`))
            }
        }
        asyncConvert()
    }
}
if (typeof require !== 'undefined' && require.main === module) main()