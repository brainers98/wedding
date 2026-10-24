// Guest personalization — use ?guest=id in the URL
// Example: index.html?guest=udara-kavinda
//
// Keep this list in sync with google-sheet-rsvp.gs → INVITEES
// and guests-test.txt

const GUESTS = [
  { id: "udara-kavinda", name: "Mr Udara Kavinda" },
  { id: "shainy-tharushika", name: "Miss Shainy Tharushika" },
];

// Your live site root
const SITE_URL = "https://brainers98.github.io/wedding/";

// Google Apps Script Web App URL
const RSVP_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbx19BZ3IEICQu4u9wmkgE_7YI8p6kagOYgi2TDLtvFqMKT5UhayzkXrwdwz64gjp42_/exec";
