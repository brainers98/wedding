/**
 * Paste this into Google Apps Script (sheet → Extensions → Apps Script).
 * Then Deploy → New deployment → Web app
 *   Execute as: Me
 *   Who has access: Anyone
 * Copy the Web App URL into guests.js → RSVP_SCRIPT_URL
 *
 * Sheet columns (row 1 headers):
 * Timestamp | Name | Response | Guests | Message | Guest From Link
 */

function doPost(e) {
  try {
    const sheet =
      SpreadsheetApp.getActiveSpreadsheet().getSheetByName("RSVPs") ||
      SpreadsheetApp.getActiveSpreadsheet().insertSheet("RSVPs");

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Name",
        "Response",
        "Guests",
        "Message",
        "Guest From Link",
      ]);
    }

    const data =
      e.postData && e.postData.contents
        ? JSON.parse(e.postData.contents)
        : e.parameter;

    sheet.appendRow([
      new Date(),
      data.name || "",
      data.response || "",
      data.guests || "",
      data.message || "",
      data.guestFromLink || "",
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    "Udara & Shainy RSVP endpoint is ready."
  );
}
