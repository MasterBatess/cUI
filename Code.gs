function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function submitData(form) {
  try {
    const spreadsheetId = '1_u9Wh7StJeydoyo9r6m8DEIPQEfV56a-vM8J3Z5vZAk';
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