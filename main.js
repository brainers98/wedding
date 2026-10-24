const cover = document.getElementById("cover");
const openBtn = document.getElementById("openBtn");
const invite = document.getElementById("invite");
const passport = document.getElementById("passport");
const rsvpForm = document.getElementById("rsvpForm");
const rsvpNote = document.getElementById("rsvpNote");
const rsvpSuccess = document.getElementById("rsvpSuccess");

function openInvitation() {
  cover.classList.add("is-gone");
  invite.hidden = false;
  document.body.style.overflow = "";

  // Small delay so the passport open animation is visible
  window.requestAnimationFrame(() => {
    passport.classList.add("is-open");
  });
}

document.body.style.overflow = "hidden";
openBtn.addEventListener("click", openInvitation);

// Temporary RSVP handler — replace with Google Sheet later
rsvpForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = Object.fromEntries(new FormData(rsvpForm).entries());
  console.log("RSVP data:", data);

  rsvpForm.querySelectorAll("input, select, textarea, button").forEach((el) => {
    el.disabled = true;
  });
  rsvpNote.hidden = true;
  rsvpSuccess.hidden = false;
});
