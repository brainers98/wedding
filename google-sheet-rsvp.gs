/**
 * SETUP
 * 1. Paste into: Sheet → Extensions → Apps Script
 * 2. Edit INVITEES below to match guests.js / guests-test.txt
 * 3. Save, then run seedInvitees once (Run ▶) — creates RSVPs tab with everyone
 * 4. Deploy → Manage deployments → Edit (pencil) → New version → Deploy
 *    (or New deployment if first time)
 *    Execute as: Me | Who has access: Anyone
 *
 * Columns: Guest ID | Invitee | Response | Party Size | Message | Last Updated
 * Response values: Pending | Yes | No
 * Replies OVERWRITE the matching invitee row (no duplicate lines).
 */

const INVITEES = [
  { id: "udara-kavinda", name: "Mr. Udara Kavinda" },
  { id: "shainy-tharushika", name: "Miss. Shainy Tharushika" },
  { id: "ruchira-maduranga", name: "Mr. Ruchira Maduranga" },
  { id: "kapila-indrajith", name: "Mr. Kapila Indrajith" },
  { id: "harshi-nimali", name: "Mrs. Harshi Nimali" },
  { id: "dharshika-nilochani", name: "Mrs. Dharshika Nilochani" },
  { id: "manjula-prabhath", name: "Mr. Manjula Prabhath" },
  { id: "ruwan-nandana", name: "Mr. & Mrs. Ruwan Nandana" },
  { id: "chalindu-sankalpa", name: "Mr. & Mrs. Chalindu Sankalpa" },
  { id: "madawa-dilshan", name: "Mr. Madawa Dilshan" },
  { id: "lahiru-chamara", name: "Mr. Lahiru Chamara" },
  { id: "udari-pabodini", name: "Mrs. Udari Pabodini" },
  { id: "naveen-wickramathunga", name: "Mr. Naveen Wickramathunga" },
  { id: "chanuri-saneesha", name: "Miss. Chanuri Saneesha" },
  { id: "sapna-gamage", name: "Miss. Sapna Gamage" },
  { id: "sameera-dananjaya", name: "Mr. Sameera Dananjaya" },
  { id: "pasindu-kodippili", name: "Mr. Pasindu Kodippili" },
  { id: "aditha-rajakaruna", name: "Mr. Aditha Rajakaruna" },
  { id: "ashan-thirimanne", name: "Mr. Ashan Thirimanne" },
  { id: "lakshitha-madushan", name: "Mr. Lakshitha Madushan" },
  { id: "thimila-ranaweera", name: "Mr. Thimila Ranaweera" },
  { id: "manodya-dimanthi", name: "Miss. Manodya Dimanthi" },
  { id: "kaushan-ranasinghe", name: "Mr. Kaushan Ranasinghe" },
  { id: "venthiram-kathircamalan", name: "Mr. Venthiram kathircamalan" },
  { id: "ravindu-harshana", name: "Mr. Ravindu Harshana" },
  { id: "ashan-serasinghe", name: "Mr. Ashan Serasinghe" },
  { id: "rishan-rasdeen", name: "Mr. Rishan Rasdeen" },
  { id: "kumudu-kalpani", name: "Miss. Kumudu Kalpani" },
  { id: "isuru-jayashankha", name: "Mr. Isuru Jayashankha" },
  { id: "kasun-sandakelum", name: "Mr. Kasun Sandakelum" },
  { id: "kasun-madushan", name: "Mr. Kasun Madushan" },
  { id: "ashan-sampath", name: "Mr. Ashan Sampath" },
  { id: "osanda-sandaruwan", name: "Mr. Osanda Sandaruwan" },
  { id: "hasara-jayanath", name: "Mr. Hasara Jayanath" },
  { id: "hashara-piyumal", name: "Mr. Hashara Piyumal" },
  { id: "gihantha-wijesekara", name: "Mr. Gihantha Wijesekara" },
  { id: "sudeepa-madubhashitha", name: "Mr. Sudeepa Madubhashitha" },
  { id: "dulshan-dhanajaya", name: "Mr. Dulshan Dhanajaya" },
  { id: "sadeep-shyamal", name: "Mr. Sadeep Shyamal" },
  { id: "lasindu-nisalka", name: "Mr. Lasindu Nisalka" },
  { id: "tharinda-uthpala", name: "Mr. Tharinda Uthpala" },
  { id: "dilan-nissanka", name: "Mr. Dilan Nissanka" },
  { id: "amila-gunawickrama", name: "Mr. Amila Gunawickrama" },
  { id: "sahan-peris", name: "Mr. Sahan Peris" },
  { id: "malith-mavinda", name: "Mr. Malith Mavinda" },
  { id: "thimira-keerthisena", name: "Mr. Thimira Keerthisena" },
  { id: "hasitha-madushan", name: "Mr. Hasitha Madushan" },
  { id: "dhanuka-sankalpa", name: "Mr. Dhanuka Sankalpa" },
  { id: "santhushta-kariyawasam", name: "Mr. Santhushta Kariyawasam" },
  { id: "supun-dassanayake", name: "Mr. Supun Dassanayake" },
  { id: "aruna-edirimanne", name: "Mr. Aruna Edirimanne" },
  { id: "lakshitha-konara", name: "Mr. Lakshitha Konara" },
  { id: "sachith-nishshanka", name: "Dr. Sachith Nishshanka" },
  { id: "p-thushantha", name: "Dr. P. Thushantha" },
  { id: "akila-rathnayaka-mrs-sarangie-anuththara", name: "Dr. Akila Rathnayaka & Mrs. Sarangie Anuththara" },
  { id: "sandun-senanayaka", name: "Dr. Sandun Senanayaka" },
  { id: "omesha-wedagedara", name: "Dr. Omesha wedagedara" },
  { id: "nishani-chathurika", name: "Dr. Nishani Chathurika" },
  { id: "jayamini-akuranthilake", name: "Dr. Jayamini Akuranthilake" },
  { id: "tharini-vithanage", name: "Dr. Tharini Vithanage" },
  { id: "harini-rupasinghe", name: "Dr. Harini Rupasinghe" },
  { id: "savindi-uduwana", name: "Dr. Savindi Uduwana" },
  { id: "hiruka-rathnayaka", name: "Dr. Hiruka Rathnayaka" },
  { id: "anupama-bandusena", name: "Dr. Anupama Bandusena" },
  { id: "nishadini-lakshika", name: "Dr. Nishadini Lakshika" },
  { id: "melindu-daranagama", name: "Dr. Melindu Daranagama" },
  { id: "sudheera-gayan-and-family", name: "Dr. Sudheera Gayan and family" },
  { id: "methmal-pathmasooriya", name: "Dr. Methmal pathmasooriya" },
  { id: "dulanjani-dissanayaka", name: "Dr. Dulanjani Dissanayaka" },
  { id: "dhyan-nadeera", name: "Dr. Dhyan Nadeera" },
  { id: "viduni-basnayaka", name: "Dr. Viduni Basnayaka" },
  { id: "s-abithan", name: "Dr. S. Abithan" },
  { id: "m-sameer", name: "Dr. M. Sameer" },
  { id: "anjelo-joseph", name: "Dr. Anjelo Joseph" },
  { id: "s-inthujan", name: "Dr. S. Inthujan" },
  { id: "k-sharanja", name: "Dr. K. Sharanja" },
  { id: "ruvin-alawatta", name: "Dr. Ruvin Alawatta" },
  { id: "amaya-rosa", name: "Dr. Amaya Rosa" },
  { id: "ravindra-priyalal", name: "Mr. & Mrs. Ravindra Priyalal" },
  { id: "naveen-fernando", name: "Dr. Naveen Fernando" },
  { id: "madhara-jayawardhene", name: "Dr. Madhara Jayawardhene" },
  { id: "dilu-ashani", name: "Dr. Dilu Ashani" },
  { id: "dulakshi-navanjana", name: "Dr. Dulakshi Navanjana" },
  { id: "tharuka-perera", name: "Dr. Tharuka Perera" },
  { id: "shilpa-fernando", name: "Mr. & Mrs. Shilpa Fernando" },
  { id: "ansala-botheju", name: "Mr. & Mrs. Ansala Botheju" },
  { id: "bawantha-sibera", name: "Mr. & Mrs. Bawantha Sibera" },
  { id: "mohommad-usman", name: "Mr. & Mrs. Mohommad Usman" },
  { id: "ravindu-perera", name: "Mr. & Mrs. Ravindu Perera" },
  { id: "nipun-fernando-and-family", name: "Mr. & Mrs. Nipun Fernando and Family" },
  { id: "deshan-fernando-and-family", name: "Mr. & Mrs. Deshan Fernando and Family" },
  { id: "menora-sathsarani", name: "Miss. Menora Sathsarani" },
  { id: "dayathri-kuruwita", name: "Dr. Dayathri Kuruwita" },
  { id: "ravindi-kuruwita", name: "Miss. Ravindi Kuruwita" },
  { id: "venuri-amalya", name: "Miss. Venuri Amalya" },
  { id: "lithmi-hettiarachchi", name: "Miss. Lithmi Hettiarachchi" },
  { id: "janaka-and-family", name: "Mr. & Mrs. Janaka and Family" },
  { id: "rivindu-peiris", name: "Mr. & Mrs. Rivindu Peiris" },
  { id: "weranga-wanniarachchi", name: "Dr. Weranga Wanniarachchi" },
  { id: "dulitha-premathilake", name: "Mr. & Mrs. Dulitha Premathilake" },
  { id: "premathilake", name: "Mr. & Mrs. Premathilake" },
  { id: "anuradhe-jayathilake", name: "Mr. Anuradhe Jayathilake" },
  { id: "lahiru-adikari", name: "Mr. Lahiru Adikari" },
  { id: "lahiru-sampath", name: "Mr. Lahiru Sampath" },
  { id: "amila-ekanayaka", name: "Dr. Amila Ekanayaka" },
  { id: "dulmika-ruvishan", name: "Mr. Dulmika Ruvishan" },
  { id: "sisith-thushan", name: "Mr. Sisith Thushan" },
  { id: "sachith-madushan", name: "Mr. Sachith Madushan" },
  { id: "frank-lakshan", name: "Mr. Frank Lakshan" },
  { id: "deshan-randeniya", name: "Mr. Deshan Randeniya" },
  { id: "kavindu-rathnayaka", name: "Mr. Kavindu Rathnayaka" },
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
