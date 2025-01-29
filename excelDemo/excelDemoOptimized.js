const excelJs = require('exceljs')
const { read } = require('fs')

async function writeExcelTest(searchtext, filepath, replacetext) {
    const workBook = new excelJs.Workbook()
    await workBook.xlsx.readFile(filepath)
    const sheet = workBook.getWorksheet('Sheet1')
    const output = await readExcel(sheet, searchtext)
    const cell = sheet.getCell(output.row, output.col)
    cell.value = replacetext
    await workBook.xlsx.writeFile(filepath)

}

async function readExcel(sheet, searchtext) {
    let output = { row: -1, col: -1 }
    sheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchtext) {
                console.log(rowNumber)
                console.log(colNumber)
                
            }

        })

    })
    return output

}
writeExcelTest("Iphone", "C:/Users/rajamegam.govindaraj/Downloads/download.xlsx", "Banana");
