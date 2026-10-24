// Guest personalization — use ?guest=id in the URL
// Example: index.html?guest=udara-kavinda
//
// Keep this list in sync with google-sheet-rsvp.gs → INVITEES
// and guests-test.txt

const GUESTS = [
  { id: "udara-kavinda", name: "Mr. Udara Kavinda" },
  { id: "shainy-tharushika", name: "Miss. Shainy Tharushika" },
  { id: "isuru-jayashankha", name: "Mr. Isuru Jayashankha" },
  { id: "ashan-thirimanne", name: "Ashan Thirimanne" },
  { id: "lakshitha-madushan", name: "Mr. Lakshitha Madushan" },
  { id: "thimila-ranaweera", name: "Mr. Thimila Ranaweera" },
  { id: "manodya-dimanthi", name: "Miss. Manodya Dimanthi" },
  { id: "kaushan-ranasinghe", name: "Mr. Kaushan Ranasinghe" },
  { id: "ravindu-harshana", name: "Mr. Ravindu Harshana" },
  { id: "ashan-serasinghe", name: "Mr. Ashan Serasinghe" },
  { id: "rishan-rasdeen", name: "Mr. Rishan Rasdeen" },
  { id: "kumudu-kalpani", name: "Miss. Kumudu Kalpani" },
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
  { id: "kasun-sandakelum", name: "Mr. Kasun Sandakelum" },
  { id: "kasun-madushan", name: "Mr. Kasun Madushan" },
  { id: "ashan-sampath", name: "Mr. Ashan Sampath" },
  { id: "osanda-sandaruwan", name: "Mr. Osanda Sandaruwan" },
  { id: "hasara-jayanath", name: "Mr. Hasara Jayanath" },
  { id: "hashara-piyumal", name: "Mr. Hashara Piyumal" },
  { id: "gihantha-wijeselkara", name: "Mr. Gihantha Wijeselkara" },
  { id: "sudeepa-madubhashitha", name: "Mr. Sudeepa Madubhashitha" },
  { id: "dulshan-dhanajaya", name: "Mr. Dulshan Dhanajaya" },
  { id: "sadeep-shyamal", name: "Mr. Sadeep Shyamal" },
  { id: "lasindu-nisalka", name: "Mr. Lasindu Nisalka" },
  { id: "ruwan-nandana", name: "Mr. Ruwan Nandana" },
  { id: "chalindu-sankalpa", name: "Mr. Chalindu Sankalpa" },
  { id: "madawa-dilshan", name: "Mr. Madawa Dilshan" },
  { id: "lahiru-chamara", name: "Mr. Lahiru Chamara" },
  { id: "udari-pabodini", name: "Mrs. Udari Pabodini" },
  { id: "naveen-wckramathunga", name: "Mr. Naveen Wckramathunga" },
  { id: "chanuru-saneesha", name: "Miss. Chanuru Saneesha" },
  { id: "sapna-gamage", name: "Miss. Sapna Gamage" },
  { id: "sameera-dananjaya", name: "Mr. Sameera Dananjaya" },
  { id: "pasindu-kodippili", name: "Mr. Pasindu Kodippili" },
  { id: "ruchira-maduranga", name: "Mr. Ruchira Maduranga" },
  { id: "kapila-indrajith", name: "Mr. Kapila Indrajith" },
  { id: "harshi-nimali", name: "Mrs. Harshi Nimali" },
  { id: "dharshika-nilochani", name: "Mrs. Dharshika Nilochani" },
  { id: "manjula-prabhath", name: "Mr. Manjula Prabhath" },
];

// Your live site root
const SITE_URL = "https://udara75.github.io/wedding/";

// Google Apps Script Web App URL
const RSVP_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx19BZ3IEICQu4u9wmkgE_7YI8p6kagOYgi2TDLtvFqMKT5UhayzkXrwdwz64gjp42_/exec";
