/**
 * SETUP
 * 1. Paste into: Sheet → Extensions → Apps Script
 * 2. Edit INVITEES below to match guests.js / guests-test.txt
 * 3. Save, then run seedInvitees once (Run ▶) — creates RSVPs tab with everyone
 * 4. Deploy → Manage deployments → Edit (pencil) → New version → Deploy
 *    (or New deployment if first time)
 *    Execute as: Me | Who has access: Anyone
 *
 * Guest ID = unique hex invite code (same as ?guest= in the link)
 * Columns: Guest ID | Invitee | Response | Party Size | Message | Last Updated
 * Response values: Pending | Yes | No
 * Replies OVERWRITE the matching invitee row (no duplicate lines).
 */

const INVITEES = [
  { id: "34710c622d750107", name: "Mr. Udara Kavinda" },
  { id: "cac85a6428a60a77", name: "Miss. Shainy Tharushika" },
  { id: "3012ca7dbc9935b9", name: "Mr. Ruchira Maduranga" },
  { id: "ddcf4354e7c585d3", name: "Mr. Kapila Indrajith" },
  { id: "3b877130884bae28", name: "Mrs. Harshi Nimali" },
  { id: "1e7d8cc001b3eaef", name: "Mrs. Dharshika Nilochani" },
  { id: "ff691812a3d3992c", name: "Mr. Manjula Prabhath" },
  { id: "4e086cd08c11f48b", name: "Mr. & Mrs. Ruwan Nandana" },
  { id: "b211eed4b9d1ed03", name: "Mr. & Mrs. Chalindu Sankalpa" },
  { id: "d97c7b5fe2db2d3f", name: "Mr. Madawa Dilshan" },
  { id: "1c52e13977118850", name: "Mr. Lahiru Chamara" },
  { id: "49f2ae4a15043381", name: "Mrs. Udari Pabodini" },
  { id: "27112d6305fc1e21", name: "Mr. Naveen Wickramathunga" },
  { id: "0dc1a61e5c29d7b7", name: "Miss. Chanuri Saneesha" },
  { id: "3e446aef57dd1564", name: "Miss. Sapna Gamage" },
  { id: "f2454e10448ca5d1", name: "Mr. Sameera Dananjaya" },
  { id: "f6bb4757903c647f", name: "Mr. Pasindu Kodippili" },
  { id: "f17209f8dfb4906f", name: "Mr. Aditha Rajakaruna" },
  { id: "39d7561d1c499acd", name: "Mr. Ashan Thirimanne" },
  { id: "7e73d5f0261c4a98", name: "Mr. Lakshitha Madushan" },
  { id: "c62dd68e2212c25e", name: "Mr. Thimila Ranaweera" },
  { id: "8863aae537e6e70c", name: "Miss. Manodya Dimanthi" },
  { id: "40a262f5b494fac7", name: "Mr. Kaushan Ranasinghe" },
  { id: "3dc68c3e53ef32e6", name: "Mr. Venthiram kathircamalan" },
  { id: "8cd6e00f3e30f611", name: "Mr. Ravindu Harshana" },
  { id: "5b580cefda80729d", name: "Mr. Ashan Serasinghe" },
  { id: "79e6e0f30230e8e5", name: "Mr. Rishan Rasdeen" },
  { id: "6928d09deaa7cacf", name: "Miss. Kumudu Kalpani" },
  { id: "63a7261b8a93eedd", name: "Mr. Isuru Jayashankha" },
  { id: "b6035ffbc553e886", name: "Mr. Kasun Sandakelum" },
  { id: "99f3afde38a63a22", name: "Mr. Kasun Madushan" },
  { id: "2dc9d5b46f801c4a", name: "Mr. Ashan Sampath" },
  { id: "98b0cdfe6557c414", name: "Mr. Osanda Sandaruwan" },
  { id: "5d539b4cd1b41d5a", name: "Mr. Hasara Jayanath" },
  { id: "b5134336c327a935", name: "Mr. Hashara Piyumal" },
  { id: "d68d6f3e48a9f6d7", name: "Mr. Gihantha Wijesekara" },
  { id: "304ac1f94fb52fbb", name: "Mr. Sudeepa Madubhashitha" },
  { id: "1e1ebb549552643b", name: "Mr. Dulshan Dhanajaya" },
  { id: "ab52e9ae5407b1d0", name: "Mr. Sadeep Shyamal" },
  { id: "b9702b644c87b6cd", name: "Mr. Lasindu Nisalka" },
  { id: "f816c4517b4a4222", name: "Mr. Tharinda Uthpala" },
  { id: "04db0607d3d15bc3", name: "Mr. Dilan Nissanka" },
  { id: "a6cf09e53befea96", name: "Mr. Amila Gunawickrama" },
  { id: "307f7781a75e1555", name: "Mr. Sahan Peris" },
  { id: "4218e0782b3d46ea", name: "Mr. Malith Mavinda" },
  { id: "6e28fea817a0266e", name: "Mr. Thimira Keerthisena" },
  { id: "24df5e2706f25950", name: "Mr. Hasitha Madushan" },
  { id: "0fda00089d98aec4", name: "Mr. Dhanuka Sankalpa" },
  { id: "46bea9e5fab23b70", name: "Mr. Santhushta Kariyawasam" },
  { id: "f14b4514e596e1e1", name: "Mr. Supun Dassanayake" },
  { id: "5dd1ae89812a814f", name: "Mr. Aruna Edirimanne" },
  { id: "62fa6d39217be166", name: "Mr. Lakshitha Konara" },
  { id: "2514b923035812af", name: "Dr. Sachith Nishshanka" },
  { id: "0a01ada6a8e4808f", name: "Dr. P. Thushantha" },
  { id: "e011032441194156", name: "Dr. Akila Rathnayaka & Mrs. Sarangie Anuththara" },
  { id: "ab4f0106a1968b6a", name: "Dr. Sandun Senanayaka" },
  { id: "03ebaaac6a7f2921", name: "Dr. Omesha wedagedara" },
  { id: "bc4b170feb11da72", name: "Dr. Nishani Chathurika" },
  { id: "d4aeef6dd827fbf1", name: "Dr. Jayamini Akuranthilake" },
  { id: "de183eb8655d7e2c", name: "Dr. Tharini Vithanage" },
  { id: "dc67713fe87b3f98", name: "Dr. Harini Rupasinghe" },
  { id: "db44ab89d9565700", name: "Mr. & Mrs. Rivindu Peris" },
  { id: "793426b25a999632", name: "Dr. Hiruka Rathnayaka" },
  { id: "ccdd8d9ebdd3ac85", name: "Dr. Anupama Bandusena" },
  { id: "a915197ecb3448fe", name: "Dr. Nishadini Lakshika" },
  { id: "1f059f7c5d9b0d51", name: "Dr. Melindu Daranagama" },
  { id: "08b82cdb16d426e3", name: "Dr. Sudheera Gayan and family" },
  { id: "edea7b60bbcefa59", name: "Dr. Methmal pathmasooriya" },
  { id: "6196ff8f7a95d0a6", name: "Dr. Dulanjani Dissanayaka" },
  { id: "0604f918a07eed94", name: "Dr. Dhyan Nadeera" },
  { id: "e712229b827567e6", name: "Dr. Viduni Basnayaka" },
  { id: "905ca6b4f215c364", name: "Dr. S. Abithan" },
  { id: "c2387eaa41f376cd", name: "Dr. M. Sameer" },
  { id: "67091e7031e404d3", name: "Dr. Anjelo Joseph" },
  { id: "5c04524d36d20d39", name: "Dr. S. Inthujan" },
  { id: "78dca21fdebe42b0", name: "Dr. K. Sharanja" },
  { id: "188afdc162b2604f", name: "Dr. Ruvin Alawatta" },
  { id: "cb402883fdb6c837", name: "Dr. Amaya Rosa" },
  { id: "085a6d29c020057d", name: "Mr. & Mrs. Ravindra Priyalal" },
  { id: "71c64dbc9aae8f4a", name: "Dr. Naveen Fernando" },
  { id: "3c91d627bb349075", name: "Dr. Madhara Jayawardhene" },
  { id: "06c8cc24b64c8dba", name: "Dr. Dilu Ashani" },
  { id: "ab4157d128a25326", name: "Dr. Dulakshi Navanjana" },
  { id: "c4671b5684a0398a", name: "Dr. Tharuka Perera" },
  { id: "f17b2b0414cd8c14", name: "Mr. & Mrs. Shilpa Fernando" },
  { id: "efd06aff8969ea31", name: "Mr. & Mrs. Ansala Botheju" },
  { id: "b08ab10c81444093", name: "Mr. & Mrs. Bawantha Sibera" },
  { id: "7bbf9e78ebb52f54", name: "Mr. & Mrs. Mohommad Usman" },
  { id: "999f1fe572593c53", name: "Mr. & Mrs. Ravindu Perera" },
  { id: "099b661c3cb2f3dc", name: "Mr. & Mrs. Nipun Fernando and Family" },
  { id: "5e2eea006b11b25c", name: "Mr. & Mrs. Deshan Fernando and Family" },
  { id: "33a1a8b80ac68b68", name: "Miss. Menora Sathsarani" },
  { id: "50fdaf675ec14bad", name: "Dr. Dayathri Kuruwita" },
  { id: "492997dcd48a95bf", name: "Miss. Ravindi Kuruwita" },
  { id: "19fe189ca674179a", name: "Miss. Venuri Amalya" },
  { id: "6833b37bfc2d1568", name: "Miss. Lithmi Hettiarachchi" },
  { id: "a72c123e940c06b8", name: "Mr. & Mrs. Janaka and Family" },
  { id: "15f4559ccf08b688", name: "Dr. Weranga Wanniarachchi" },
  { id: "83247597a19518fe", name: "Mr. & Mrs. Dulitha Premathilake" },
  { id: "84b52353d1e4504d", name: "Mr. & Mrs. Premathilake" },
  { id: "9a2a412f7dfee191", name: "Mr. Anuradhe Jayathilake" },
  { id: "836323a0bc35dcb2", name: "Mr. Lahiru Adikari" },
  { id: "c705743ee4fb5a6b", name: "Mr. Lahiru Sampath" },
  { id: "c021e796bc88f74f", name: "Dr. Amila Ekanayaka" },
  { id: "88e8e1c6466d472b", name: "Mr. Dulmika Ruvishan" },
  { id: "0bf2d0d6eca7ab1b", name: "Mr. Sisith Thushan" },
  { id: "e89d0a15f0bd601a", name: "Mr. Sachith Madushan" },
  { id: "a3d4252d386d0a44", name: "Mr. Frank Lakshan" },
  { id: "1479fe0f3399d049", name: "Mr. Deshan Randeniya" },
  { id: "2ad8ff967e18c87d", name: "Mr. Kavindu Rathnayaka" },
  { id: "31d67718d76e9eea", name: "Mr. Hilari Costa" },
  { id: "425f2e2dac4107ec", name: "Mr. Lal Fernando" },
  { id: "3751a0f32825cf41", name: "Mr. Priyantha Jayasooriya" },
  { id: "7d624b89bdff84b9", name: "Mr. Jude Herman" },
  { id: "ad3f14d9f66d069f", name: "Mr. Anura Perera" },
  { id: "c6c2b453c167de84", name: "Mr. & Mrs. Fayaz Marikkar" },
  { id: "0ee90d599b280223", name: "Dr. Nethmi Silva" },
  { id: "5a3912be2acbd148", name: "Dr. Shiney Nayanathara" },
  { id: "1ea9cb659e34abe8", name: "Dr. Aashani" },
  { id: "88a0065baf6de2fa", name: "Dr. Diluka Jayasekara" },
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
