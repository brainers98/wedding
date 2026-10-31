/**
 * SETUP
 * 1. Paste into: Sheet → Extensions → Apps Script
 * 2. Edit INVITEES below to match guests.js / guests-test.txt
 * 3. Save, then run seedInvitees once (Run ▶) — creates RSVPs tab with everyone
 * 4. Deploy → Manage deployments → Edit (pencil) → New version → Deploy
 *    (or New deployment if first time)
 *    Execute as: Me | Who has access: Anyone
 *
 * Guest ID = guest_0x*** letter-hex (same as link param), e.g. guest_0xacf
 * Columns: Guest ID | Invitee | Response | Party Size | Message | Last Updated
 * Response values: Pending | Yes | No
 * Replies OVERWRITE the matching invitee row (no duplicate lines).
 */

const INVITEES = [
  { id: "guest_0xbba", name: "Mr. Udara Kavinda" },
  { id: "guest_0xbbb", name: "Miss. Shainy Tharushika" },
  { id: "guest_0xbbc", name: "Mr. Ruchira Maduranga" },
  { id: "guest_0xbbd", name: "Mr. Kapila Indrajith" },
  { id: "guest_0xbbe", name: "Mrs. Harshi Nimali" },
  { id: "guest_0xbbf", name: "Mrs. Dharshika Nilochani" },
  { id: "guest_0xbca", name: "Mr. Manjula Prabhath" },
  { id: "guest_0xbcb", name: "Mr. & Mrs. Ruwan Nandana" },
  { id: "guest_0xbcc", name: "Mr. & Mrs. Chalindu Sankalpa" },
  { id: "guest_0xbcd", name: "Mr. Madawa Dilshan" },
  { id: "guest_0xbce", name: "Mr. Lahiru Chamara" },
  { id: "guest_0xbcf", name: "Mrs. Udari Pabodini" },
  { id: "guest_0xbda", name: "Mr. Naveen Wickramathunga" },
  { id: "guest_0xbdb", name: "Miss. Chanuri Saneesha" },
  { id: "guest_0xbdc", name: "Miss. Sapna Gamage" },
  { id: "guest_0xbdd", name: "Mr. Sameera Dananjaya" },
  { id: "guest_0xbde", name: "Mr. Pasindu Kodippili" },
  { id: "guest_0xbdf", name: "Mr. Aditha Rajakaruna" },
  { id: "guest_0xbea", name: "Mr. Ashan Thirimanne" },
  { id: "guest_0xbeb", name: "Mr. Lakshitha Madushan" },
  { id: "guest_0xbec", name: "Mr. Thimila Ranaweera" },
  { id: "guest_0xbed", name: "Miss. Manodya Dimanthi" },
  { id: "guest_0xbee", name: "Mr. Kaushan Ranasinghe" },
  { id: "guest_0xbef", name: "Mr. Venthiram kathircamalan" },
  { id: "guest_0xbfa", name: "Mr. Ravindu Harshana" },
  { id: "guest_0xbfb", name: "Mr. Ashan Serasinghe" },
  { id: "guest_0xbfc", name: "Mr. Rishan Rasdeen" },
  { id: "guest_0xbfd", name: "Miss. Kumudu Kalpani" },
  { id: "guest_0xbfe", name: "Mr. Isuru Jayashankha" },
  { id: "guest_0xbff", name: "Mr. Kasun Sandakelum" },
  { id: "guest_0xcaa", name: "Mr. Kasun Madushan" },
  { id: "guest_0xcab", name: "Mr. Ashan Sampath" },
  { id: "guest_0xcac", name: "Mr. Osanda Sandaruwan" },
  { id: "guest_0xcad", name: "Mr. Hasara Jayanath" },
  { id: "guest_0xcae", name: "Mr. Hashara Piyumal" },
  { id: "guest_0xcaf", name: "Mr. Gihantha Wijesekara" },
  { id: "guest_0xcba", name: "Mr. Sudeepa Madubhashitha" },
  { id: "guest_0xcbb", name: "Mr. Dulshan Dhanajaya" },
  { id: "guest_0xcbc", name: "Mr. Sadeep Shyamal" },
  { id: "guest_0xcbd", name: "Mr. Lasindu Nisalka" },
  { id: "guest_0xcbe", name: "Mr. Tharinda Uthpala" },
  { id: "guest_0xcbf", name: "Mr. Dilan Nissanka" },
  { id: "guest_0xcca", name: "Mr. Amila Gunawickrama" },
  { id: "guest_0xccb", name: "Mr. Sahan Peris" },
  { id: "guest_0xccc", name: "Mr. Malith Mavinda" },
  { id: "guest_0xccd", name: "Mr. Thimira Keerthisena" },
  { id: "guest_0xcce", name: "Mr. Hasitha Madushan" },
  { id: "guest_0xccf", name: "Mr. Dhanuka Sankalpa" },
  { id: "guest_0xcda", name: "Mr. Santhushta Kariyawasam" },
  { id: "guest_0xcdb", name: "Mr. Supun Dassanayake" },
  { id: "guest_0xcdc", name: "Mr. Aruna Edirimanne" },
  { id: "guest_0xcdd", name: "Mr. Lakshitha Konara" },
  { id: "guest_0xcde", name: "Dr. Sachith Nishshanka" },
  { id: "guest_0xcdf", name: "Dr. P. Thushantha" },
  { id: "guest_0xcea", name: "Dr. Akila Rathnayaka & Mrs. Sarangie Anuththara" },
  { id: "guest_0xceb", name: "Dr. Sandun Senanayaka" },
  { id: "guest_0xcec", name: "Dr. Omesha wedagedara" },
  { id: "guest_0xced", name: "Dr. Nishani Chathurika" },
  { id: "guest_0xcee", name: "Dr. Jayamini Akuranthilake" },
  { id: "guest_0xcef", name: "Dr. Tharini Vithanage" },
  { id: "guest_0xcfa", name: "Dr. Harini Rupasinghe" },
  { id: "guest_0xcfb", name: "Mr. & Mrs. Rivindu Peris" },
  { id: "guest_0xcfc", name: "Dr. Hiruka Rathnayaka" },
  { id: "guest_0xcfd", name: "Dr. Anupama Bandusena" },
  { id: "guest_0xcfe", name: "Dr. Nishadini Lakshika" },
  { id: "guest_0xcff", name: "Dr. Melindu Daranagama" },
  { id: "guest_0xdaa", name: "Dr. Sudheera Gayan and family" },
  { id: "guest_0xdab", name: "Dr. Methmal pathmasooriya" },
  { id: "guest_0xdac", name: "Dr. Dulanjani Dissanayaka" },
  { id: "guest_0xdad", name: "Dr. Dhyan Nadeera" },
  { id: "guest_0xdae", name: "Dr. Viduni Basnayaka" },
  { id: "guest_0xdaf", name: "Dr. S. Abithan" },
  { id: "guest_0xdba", name: "Dr. M. Sameer" },
  { id: "guest_0xdbb", name: "Dr. Anjelo Joseph" },
  { id: "guest_0xdbc", name: "Dr. S. Inthujan" },
  { id: "guest_0xdbd", name: "Dr. K. Sharanja" },
  { id: "guest_0xdbe", name: "Dr. Ruvin Alawatta" },
  { id: "guest_0xdbf", name: "Dr. Amaya Rosa" },
  { id: "guest_0xdca", name: "Mr. & Mrs. Ravindra Priyalal" },
  { id: "guest_0xdcb", name: "Dr. Naveen Fernando" },
  { id: "guest_0xdcc", name: "Dr. Madhara Jayawardhene" },
  { id: "guest_0xdcd", name: "Dr. Dilu Ashani" },
  { id: "guest_0xdce", name: "Dr. Dulakshi Navanjana" },
  { id: "guest_0xdcf", name: "Dr. Tharuka Perera" },
  { id: "guest_0xdda", name: "Mr. & Mrs. Shilpa Fernando" },
  { id: "guest_0xddb", name: "Mr. & Mrs. Ansala Botheju" },
  { id: "guest_0xddc", name: "Mr. & Mrs. Bawantha Sibera" },
  { id: "guest_0xddd", name: "Mr. & Mrs. Mohommad Usman" },
  { id: "guest_0xdde", name: "Mr. & Mrs. Ravindu Perera" },
  { id: "guest_0xddf", name: "Mr. & Mrs. Nipun Fernando and Family" },
  { id: "guest_0xdea", name: "Mr. & Mrs. Deshan Fernando and Family" },
  { id: "guest_0xdeb", name: "Miss. Menora Sathsarani" },
  { id: "guest_0xdec", name: "Dr. Dayathri Kuruwita" },
  { id: "guest_0xded", name: "Miss. Ravindi Kuruwita" },
  { id: "guest_0xdee", name: "Miss. Venuri Amalya" },
  { id: "guest_0xdef", name: "Miss. Lithmi Hettiarachchi" },
  { id: "guest_0xdfa", name: "Mr. & Mrs. Janaka and Family" },
  { id: "guest_0xdfb", name: "Dr. Weranga Wanniarachchi" },
  { id: "guest_0xdfc", name: "Mr. & Mrs. Dulitha Premathilake" },
  { id: "guest_0xdfd", name: "Mr. & Mrs. Premathilake" },
  { id: "guest_0xdfe", name: "Mr. Anuradhe Jayathilake" },
  { id: "guest_0xdff", name: "Mr. Lahiru Adikari" },
  { id: "guest_0xeaa", name: "Mr. Lahiru Sampath" },
  { id: "guest_0xeab", name: "Dr. Amila Ekanayaka" },
  { id: "guest_0xeac", name: "Mr. Dulmika Ruvishan" },
  { id: "guest_0xead", name: "Mr. Sisith Thushan" },
  { id: "guest_0xeae", name: "Mr. Sachith Madushan" },
  { id: "guest_0xeaf", name: "Mr. Frank Lakshan" },
  { id: "guest_0xeba", name: "Mr. Deshan Randeniya" },
  { id: "guest_0xebb", name: "Mr. Kavindu Rathnayaka" },
  { id: "guest_0xebc", name: "Mr. Hilari Costa" },
  { id: "guest_0xebd", name: "Mr. Lal Fernando" },
  { id: "guest_0xebe", name: "Mr. Priyantha Jayasooriya" },
  { id: "guest_0xebf", name: "Mr. Jude Herman" },
  { id: "guest_0xeca", name: "Mr. Anura Perera" },
  { id: "guest_0xecb", name: "Mr. & Mrs. Fayaz Marikkar" },
  { id: "guest_0xecc", name: "Dr. Nethmi Silva" },
  { id: "guest_0xecd", name: "Dr. Shiney Nayanathara" },
  { id: "guest_0xece", name: "Dr. Aashani" },
  { id: "guest_0xecf", name: "Dr. Diluka Jayasekara" },
];

const HEADERS = [
  "Guest ID",
  "Invitee",
  "Response",
  "Party Size",
  "Message",
  "Last Updated",
];

function getRsvpSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("RSVPs");
  if (!sheet) sheet = ss.insertSheet("RSVPs");
  return sheet;
}

function normalize_(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

/** Run this ONCE to put all invitees into the sheet (Pending). */
function seedInvitees() {
  const sheet = getRsvpSheet_();
  sheet.clear();
  sheet.appendRow(HEADERS);

  INVITEES.forEach((guest) => {
    sheet.appendRow([guest.id, guest.name, "Pending", "", "", ""]);
  });
}

function findInviteeRow_(sheet, guestId, name) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return -1;

  const values = sheet.getRange(2, 1, lastRow, 2).getValues();
  const idKey = normalize_(guestId);
  const nameKey = normalize_(name);

  for (let i = 0; i < values.length; i++) {
    const rowId = normalize_(values[i][0]);
    const rowName = normalize_(values[i][1]);
    if (idKey && rowId === idKey) return i + 2;
    if (nameKey && (rowName === nameKey || rowName.includes(nameKey) || nameKey.includes(rowName))) {
      return i + 2;
    }
  }
  return -1;
}

function responseLabel_(value) {
  const v = normalize_(value);
  if (v === "yes" || v === "joyfully accepts") return "Yes";
  if (v === "no" || v === "regretfully declines") return "No";
  return value || "Pending";
}

function doPost(e) {
  try {
    const sheet = getRsvpSheet_();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    const data =
      e.postData && e.postData.contents
        ? JSON.parse(e.postData.contents)
        : e.parameter;

    const guestId = data.guestId || "";
    const inviteeName = data.guestFromLink || data.name || "";
    const response = responseLabel_(data.response);
    const partySize = data.guests || "";
    const message = data.message || "";
    const updated = new Date();

    let row = findInviteeRow_(sheet, guestId, inviteeName);

    // Fallback: match by typed form name
    if (row < 0 && data.name) {
      row = findInviteeRow_(sheet, "", data.name);
    }

    if (row > 0) {
      // Overwrite existing invitee row
      sheet.getRange(row, 3, 1, 4).setValues([[response, partySize, message, updated]]);
      if (guestId) sheet.getRange(row, 1).setValue(guestId);
    } else {
      // Unknown guest — add once (still no duplicates on later replies)
      sheet.appendRow([
        guestId || "",
        inviteeName || data.name || "Unknown",
        response,
        partySize,
        message,
        updated,
      ]);
    }

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
