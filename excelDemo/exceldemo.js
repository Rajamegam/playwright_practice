const excelJs = require('exceljs')

async function excelTest() {
    let output = { row: -1, col: -1 }
    const workBook = new excelJs.Workbook()
    await workBook.xlsx.readFile("C:/Users/rajamegam.govindaraj/Downloads/download.xlsx")
    const sheet = workBook.getWorksheet('Sheet1')
    sheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === 'Banana') {
                console.log(rowNumber)
                console.log(colNumber)
                output.row = rowNumber
                output.col = colNumber
            }

        })

    })
    const cell = sheet.getCell(output.row, output.col)
    cell.value = "Iphone"
    await workBook.xlsx.writeFile("C:/Users/rajamegam.govindaraj/Downloads/download.xlsx")

}
excelTest();