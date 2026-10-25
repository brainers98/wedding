// Guest personalization — use ?guest=id in the URL
// Example: index.html?guest=udara-kavinda
//
// Keep in sync with guests-test.txt
// Format: 1. Name | TableCode   (S, U2, U3, U4, U5, U6, …)

const GUESTS = [
  { id: "udara-kavinda", name: "Mr. Udara Kavinda", table: "S" },
  { id: "shainy-tharushika", name: "Miss. Shainy Tharushika", table: "S" },
  { id: "isuru-jayashankha", name: "Mr. Isuru Jayashankha", table: "U5" },
  { id: "aditha-rajakaruna", name: "Mr. Aditha Rajakaruna", table: "U4" },
  { id: "ashan-thirimanne", name: "Mr. Ashan Thirimanne", table: "U4" },
  { id: "lakshitha-madushan", name: "Mr. Lakshitha Madushan", table: "U4" },
  { id: "thimila-ranaweera", name: "Mr. Thimila Ranaweera", table: "U4" },
  { id: "manodya-dimanthi", name: "Miss. Manodya Dimanthi", table: "U4" },
  { id: "kaushan-ranasinghe", name: "Mr. Kaushan Ranasinghe", table: "U4" },
  { id: "venthiram-kathircamalan", name: "Mr. Venthiram kathircamalan", table: "U4" },
  { id: "ravindu-harshana", name: "Mr. Ravindu Harshana", table: "U4" },
  { id: "ashan-serasinghe", name: "Mr. Ashan Serasinghe", table: "U4" },
  { id: "rishan-rasdeen", name: "Mr. Rishan Rasdeen", table: "U4" },
  { id: "kumudu-kalpani", name: "Miss. Kumudu Kalpani", table: "U4" },
  { id: "tharinda-uthpala", name: "Mr. Tharinda Uthpala", table: "U6" },
  { id: "dilan-nissanka", name: "Mr. Dilan Nissanka", table: "U6" },
  { id: "amila-gunawickrama", name: "Mr. Amila Gunawickrama", table: "U6" },
  { id: "sahan-peris", name: "Mr. Sahan Peris", table: "U6" },
  { id: "malith-mavinda", name: "Mr. Malith Mavinda", table: "U6" },
  { id: "thimira-keerthisena", name: "Mr. Thimira Keerthisena", table: "U6" },
  { id: "hasitha-madushan", name: "Mr. Hasitha Madushan", table: "U6" },
  { id: "dhanuka-sankalpa", name: "Mr. Dhanuka Sankalpa", table: "U6" },
  { id: "santhushta-kariyawasam", name: "Mr. Santhushta Kariyawasam", table: "U6" },
  { id: "supun-dassanayake", name: "Mr. Supun Dassanayake", table: "U6" },
  { id: "aruna-edirimanne", name: "Mr. Aruna Edirimanne", table: "U6" },
  { id: "lakshitha-konara", name: "Mr. Lakshitha Konara", table: "U6" },
  { id: "kasun-sandakelum", name: "Mr. Kasun Sandakelum", table: "U5" },
  { id: "kasun-madushan", name: "Mr. Kasun Madushan", table: "U5" },
  { id: "ashan-sampath", name: "Mr. Ashan Sampath", table: "U5" },
  { id: "osanda-sandaruwan", name: "Mr. Osanda Sandaruwan", table: "U5" },
  { id: "hasara-jayanath", name: "Mr. Hasara Jayanath", table: "U5" },
  { id: "hashara-piyumal", name: "Mr. Hashara Piyumal", table: "U5" },
  { id: "gihantha-wijesekara", name: "Mr. Gihantha Wijesekara", table: "U5" },
  { id: "sudeepa-madubhashitha", name: "Mr. Sudeepa Madubhashitha", table: "U5" },
  { id: "dulshan-dhanajaya", name: "Mr. Dulshan Dhanajaya", table: "U5" },
  { id: "sadeep-shyamal", name: "Mr. Sadeep Shyamal", table: "U5" },
  { id: "lasindu-nisalka", name: "Mr. Lasindu Nisalka", table: "U5" },
  { id: "ruwan-nandana", name: "Mr. & Mrs. Ruwan Nandana", table: "U3" },
  { id: "chalindu-sankalpa", name: "Mr. & Mrs. Chalindu Sankalpa", table: "U3" },
  { id: "madawa-dilshan", name: "Mr. Madawa Dilshan", table: "U3" },
  { id: "lahiru-chamara", name: "Mr. Lahiru Chamara", table: "U3" },
  { id: "udari-pabodini", name: "Mrs. Udari Pabodini", table: "U3" },
  { id: "naveen-wickramathunga", name: "Mr. Naveen Wickramathunga", table: "U3" },
  { id: "chanuri-saneesha", name: "Miss. Chanuri Saneesha", table: "U3" },
  { id: "sapna-gamage", name: "Miss. Sapna Gamage", table: "U3" },
  { id: "sameera-dananjaya", name: "Mr. Sameera Dananjaya", table: "U3" },
  { id: "pasindu-kodippili", name: "Mr. Pasindu Kodippili", table: "U3" },
  { id: "ruchira-maduranga", name: "Mr. Ruchira Maduranga", table: "U2" },
  { id: "kapila-indrajith", name: "Mr. Kapila Indrajith", table: "U2" },
  { id: "harshi-nimali", name: "Mrs. Harshi Nimali", table: "U2" },
  { id: "dharshika-nilochani", name: "Mrs. Dharshika Nilochani", table: "U2" },
  { id: "manjula-prabhath", name: "Mr. Manjula Prabhath", table: "U2" },
];

// Tables drawn on the seating map (order matters)
const TABLE_LABELS = ["S", "U2", "U3", "U4", "U5", "U6"];

const SITE_URL = "https://udara75.github.io/wedding/";

const RSVP_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx19BZ3IEICQu4u9wmkgE_7YI8p6kagOYgi2TDLtvFqMKT5UhayzkXrwdwz64gjp42_/exec";
