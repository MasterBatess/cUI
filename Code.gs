function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index');
}

function submitData(form) {
  try {
    const ip = form.ip;
    const country = getCountryFromIP(ip);

    const spreadsheetId = PropertiesService.getScriptProperties().getProperty('spreadsheetId');
    const apiKey = PropertiesService.getScriptProperties().getProperty('apiKey');

    const mainSheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('Sheet1');
    const ipSheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('IPSheet');

    if (!mainSheet) {
      throw new Error('Main sheet not found');
    }
    if (!ipSheet) {
      throw new Error('IP sheet not found');
    }

    mainSheet.appendRow([form.name, form.email, country]);

    ipSheet.appendRow([form.name, form.email, country, ip]);

    return 'Data submitted successfully';
  } catch (e) {
    Logger.log('Error: ' + e.toString());
    throw e;
  }
}

function getCountryFromIP(ip) {
  const apiKey = PropertiesService.getScriptProperties().getProperty('apiKey');
  const response = UrlFetchApp.fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ip}`);
  const data = JSON.parse(response.getContentText());
  return data.country_name;
}
