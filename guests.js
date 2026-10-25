// Guest personalization — use ?guest=id in the URL
// Example: index.html?guest=udara-kavinda
//
// Keep in sync with guests-test.txt
// Codes: C = Couple, R = Reserved, 1–18 = guest tables

const GUESTS = [
  { id: "udara-kavinda", name: "Mr. Udara Kavinda", table: "C" },
  { id: "shainy-tharushika", name: "Miss. Shainy Tharushika", table: "C" },
  { id: "isuru-jayashankha", name: "Mr. Isuru Jayashankha", table: "5" },
  { id: "aditha-rajakaruna", name: "Mr. Aditha Rajakaruna", table: "4" },
  { id: "ashan-thirimanne", name: "Mr. Ashan Thirimanne", table: "4" },
  { id: "lakshitha-madushan", name: "Mr. Lakshitha Madushan", table: "4" },
  { id: "thimila-ranaweera", name: "Mr. Thimila Ranaweera", table: "4" },
  { id: "manodya-dimanthi", name: "Miss. Manodya Dimanthi", table: "4" },
  { id: "kaushan-ranasinghe", name: "Mr. Kaushan Ranasinghe", table: "4" },
  { id: "venthiram-kathircamalan", name: "Mr. Venthiram kathircamalan", table: "4" },
  { id: "ravindu-harshana", name: "Mr. Ravindu Harshana", table: "4" },
  { id: "ashan-serasinghe", name: "Mr. Ashan Serasinghe", table: "4" },
  { id: "rishan-rasdeen", name: "Mr. Rishan Rasdeen", table: "4" },
  { id: "kumudu-kalpani", name: "Miss. Kumudu Kalpani", table: "4" },
  { id: "tharinda-uthpala", name: "Mr. Tharinda Uthpala", table: "6" },
  { id: "dilan-nissanka", name: "Mr. Dilan Nissanka", table: "6" },
  { id: "amila-gunawickrama", name: "Mr. Amila Gunawickrama", table: "6" },
  { id: "sahan-peris", name: "Mr. Sahan Peris", table: "6" },
  { id: "malith-mavinda", name: "Mr. Malith Mavinda", table: "6" },
  { id: "thimira-keerthisena", name: "Mr. Thimira Keerthisena", table: "6" },
  { id: "hasitha-madushan", name: "Mr. Hasitha Madushan", table: "6" },
  { id: "dhanuka-sankalpa", name: "Mr. Dhanuka Sankalpa", table: "6" },
  { id: "santhushta-kariyawasam", name: "Mr. Santhushta Kariyawasam", table: "6" },
  { id: "supun-dassanayake", name: "Mr. Supun Dassanayake", table: "6" },
  { id: "aruna-edirimanne", name: "Mr. Aruna Edirimanne", table: "6" },
  { id: "lakshitha-konara", name: "Mr. Lakshitha Konara", table: "6" },
  { id: "kasun-sandakelum", name: "Mr. Kasun Sandakelum", table: "5" },
  { id: "kasun-madushan", name: "Mr. Kasun Madushan", table: "5" },
  { id: "ashan-sampath", name: "Mr. Ashan Sampath", table: "5" },
  { id: "osanda-sandaruwan", name: "Mr. Osanda Sandaruwan", table: "5" },
  { id: "hasara-jayanath", name: "Mr. Hasara Jayanath", table: "5" },
  { id: "hashara-piyumal", name: "Mr. Hashara Piyumal", table: "5" },
  { id: "gihantha-wijesekara", name: "Mr. Gihantha Wijesekara", table: "5" },
  { id: "sudeepa-madubhashitha", name: "Mr. Sudeepa Madubhashitha", table: "5" },
  { id: "dulshan-dhanajaya", name: "Mr. Dulshan Dhanajaya", table: "5" },
  { id: "sadeep-shyamal", name: "Mr. Sadeep Shyamal", table: "5" },
  { id: "lasindu-nisalka", name: "Mr. Lasindu Nisalka", table: "5" },
  { id: "ruwan-nandana", name: "Mr. & Mrs. Ruwan Nandana", table: "3" },
  { id: "chalindu-sankalpa", name: "Mr. & Mrs. Chalindu Sankalpa", table: "3" },
  { id: "madawa-dilshan", name: "Mr. Madawa Dilshan", table: "3" },
  { id: "lahiru-chamara", name: "Mr. Lahiru Chamara", table: "3" },
  { id: "udari-pabodini", name: "Mrs. Udari Pabodini", table: "3" },
  { id: "naveen-wickramathunga", name: "Mr. Naveen Wickramathunga", table: "3" },
  { id: "chanuri-saneesha", name: "Miss. Chanuri Saneesha", table: "3" },
  { id: "sapna-gamage", name: "Miss. Sapna Gamage", table: "3" },
  { id: "sameera-dananjaya", name: "Mr. Sameera Dananjaya", table: "3" },
  { id: "pasindu-kodippili", name: "Mr. Pasindu Kodippili", table: "3" },
  { id: "ruchira-maduranga", name: "Mr. Ruchira Maduranga", table: "2" },
  { id: "kapila-indrajith", name: "Mr. Kapila Indrajith", table: "2" },
  { id: "harshi-nimali", name: "Mrs. Harshi Nimali", table: "2" },
  { id: "dharshika-nilochani", name: "Mrs. Dharshika Nilochani", table: "2" },
  { id: "manjula-prabhath", name: "Mr. Manjula Prabhath", table: "2" },
];

const TABLE_LABELS = ["C", "R", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18"];

const SITE_URL = "https://udara75.github.io/wedding/";

const RSVP_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx19BZ3IEICQu4u9wmkgE_7YI8p6kagOYgi2TDLtvFqMKT5UhayzkXrwdwz64gjp42_/exec";
