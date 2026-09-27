/**
 * Al Ashfaz — order log
 * =====================
 *
 * Writes every order placed on the website into this spreadsheet, so there
 * is a record that outlives the WhatsApp thread: searchable, sortable, and
 * you can total a month in one click.
 *
 * This is NOT where orders arrive. Orders arrive on WhatsApp, the same as
 * always — this is the carbon copy. If this script breaks, is deleted, or
 * you never set it up at all, ordering carries on working exactly as it
 * does now. Nothing on the website waits for it.
 *
 * SETTING IT UP  (SETUP.md step 2 has this with screenshots-worth of detail)
 * -------------------------------------------------------------------------
 *  1. Make a new Google Sheet.
 *  2. Extensions → Apps Script. Delete whatever is in the editor.
 *  3. Paste this whole file in and Save.
 *  4. Deploy → New deployment → type "Web app".
 *       Execute as ............ Me
 *       Who has access ........ Anyone
 *     Google will warn you about permissions. That is expected: you are
 *     giving YOUR OWN script permission to write to YOUR OWN sheet.
 *  5. Copy the web-app URL it gives you (it ends in /exec).
 *  6. Paste it into src/data/site.js → ordering.logUrl, then push.
 *
 * A NOTE ON PRIVACY AND JUNK
 * -------------------------------------------------------------------------
 * The URL has to be open for the website to post to it, which means someone
 * who obtained the URL could add junk rows. They cannot READ anything — that
 * needs access to the sheet itself. Treat the URL as semi-private: do not
 * publish it. If junk ever appears, delete the rows and redeploy to get a
 * fresh URL.
 *
 * The rows hold customer names, phone numbers and delivery addresses. That
 * is real personal data sitting in your Google account. Keep the sheet
 * private, share it with staff only if they need it, and delete old rows
 * once you no longer need them.
 */

var SHEET_NAME = 'Orders';

var HEADERS = [
  'When', 'Language', 'Name', 'Phone', 'Collection or delivery',
  'Address', 'Notes', 'Items', 'Item count', 'Total (SAR)'
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    // Ignore anything that is not shaped like one of our orders. Cheap, and
    // it keeps a stray bot from filling the sheet with blank rows.
    if (!data || !data.items || !data.items.length || !data.phone) {
      return ok('ignored');
    }

    var sheet = sheetWithHeaders();

    var items = data.items.map(function (it) {
      return it.qty + ' x ' + it.name + ' — ' + it.line;
    }).join('\n');

    sheet.appendRow([
      // Written as a real date in Riyadh time so the sheet can sort and
      // group by it, rather than as a string that only looks like one.
      riyadhDate(data.at),
      data.lang === 'ar' ? 'Arabic' : 'English',
      data.name || '',
      // Leading apostrophe keeps 0551234567 from becoming 551234567.
      "'" + (data.phone || ''),
      data.fulfilment === 'delivery' ? 'Delivery' : 'Collection',
      data.address || '',
      data.notes || '',
      items,
      data.count || 0,
      data.total || 0
    ]);

    return ok('logged');
  } catch (err) {
    // Never throw. A failure here must not become the customer's problem,
    // and they are already on their way to WhatsApp.
    return ok('error: ' + err);
  }
}

/** Visiting the URL in a browser should say something friendly, not 404. */
function doGet() {
  return ok('Al Ashfaz order log is running. Orders are posted here by the website.');
}

function sheetWithHeaders() {
  var book = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 150);  // When
    sheet.setColumnWidth(8, 320);  // Items
  }
  return sheet;
}

function riyadhDate(iso) {
  var d = iso ? new Date(iso) : new Date();
  if (isNaN(d.getTime())) d = new Date();
  return Utilities.formatDate(d, 'Asia/Riyadh', 'yyyy-MM-dd HH:mm');
}

function ok(message) {
  return ContentService
    .createTextOutput(JSON.stringify({ result: message }))
    .setMimeType(ContentService.MimeType.JSON);
}
