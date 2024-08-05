require('dotenv').config();

const spreadsheetId = process.env.SPREADSHEET_ID;

function submitData(form) {
  try {
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('Sheet1');
    
    if (!sheet) {
      throw new Error('Sheet not found');
    }
    
    sheet.appendRow([form.name, form.email]);
    return 'Data submitted successfully';
  } catch (e) {
    Logger.log('Error: ' + e.toString());
    throw e;
  }
}
