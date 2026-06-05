const ExcelJS = require("exceljs");
const path = require("path");

async function readExcel(filePath) {
  const json = [];
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.worksheets[0]; // Assuming data is in the first sheet
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // Skip header row
    const rowData = {};
    row.eachCell((cell, colNumber) => {
      const headerCell = worksheet.getRow(1).getCell(colNumber);
      const headerValue = headerCell.value;
      rowData[headerValue] = cell.value;
    });
    json.push(rowData);
  });
  return json;
}

module.exports = {
  readExcel,
};
