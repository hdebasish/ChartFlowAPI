import ExcelJS from "exceljs"

export default class DataUtils {

    static async getDataFromExcel(resource) {
        try {
            const clients = []
            const workbook = new ExcelJS.Workbook();
            await workbook.xlsx.readFile(resource);
            const worksheet = workbook.getWorksheet(1);
            worksheet.eachRow({ includeEmpty: false }, function (row, rowNumber) {
                const rowObject = {};
                if (rowNumber === 1) {
                    return;
                }
                row.eachCell({ includeEmpty: false }, function (cell, colNumber) {
                    switch (colNumber) {
                        case 1:
                            rowObject["Day"] = cell.value.result || cell.value;
                            break;
                        case 2:
                            rowObject["Age"] = cell.value.result || cell.value;
                            break;
                        case 3:
                            rowObject["Gender"] = cell.value.result || cell.value;
                            break;
                        case 4:
                            rowObject["A"] = cell.value.result || 0;
                            break;
                        case 5:
                            rowObject["B"] = cell.value.result || 0;
                            break;
                        case 6:
                            rowObject["C"] = cell.value.result || 0;
                            break;
                        case 7:
                            rowObject["D"] = cell.value.result || 0;
                            break;
                        case 8:
                            rowObject["E"] = cell.value.result || 0;
                            break;
                        case 9:
                            rowObject["F"] = cell.value.result || 0;
                            break;
                        default:
                            break;
                    }
                });
                clients.push(rowObject);
            });

            return clients;

        } catch (error) {
            throw error;
        }

    }

    static randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}