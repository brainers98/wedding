const cover = document.getElementById("cover");
const openBtn = document.getElementById("openBtn");
const invite = document.getElementById("invite");
const passport = document.getElementById("passport");
const petalBurst = document.getElementById("petalBurst");
const rsvpForm = document.getElementById("rsvpForm");
const rsvpNote = document.getElementById("rsvpNote");
const rsvpSuccess = document.getElementById("rsvpSuccess");

let opening = false;

function spawnPetals(count = 56) {
  petalBurst.innerHTML = "";
  petalBurst.classList.add("is-active");

  for (let i = 0; i < count; i += 1) {
    const petal = document.createElement("span");
    petal.className = "petal";
    const size = 10 + Math.random() * 22;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.4}px`;
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.setProperty("--x", `${-40 + Math.random() * 80}px`);
    petal.style.setProperty("--rot", `${180 + Math.random() * 280}deg`);
    petal.style.animationDuration = `${1.4 + Math.random() * 1.6}s`;
    petal.style.animationDelay = `${Math.random() * 0.45}s`;
    petalBurst.appendChild(petal);
  }
}

async function openInvitation() {
  if (opening) return;
  opening = true;
  openBtn.disabled = true;
  cover.classList.add("is-opening");

  spawnPetals();

  // Let petals fill the screen, then reveal invitation
  await new Promise((resolve) => setTimeout(resolve, 1600));

  cover.classList.add("is-gone");
  invite.hidden = false;
  document.body.style.overflow = "";

  window.requestAnimationFrame(() => {
    passport.classList.add("is-open");
  });
}

document.body.style.overflow = "hidden";
openBtn.addEventListener("click", openInvitation);

// Also allow tapping the image area (button sits on top; whole cover feel)
cover.addEventListener("click", (event) => {
  if (event.target.closest(".open-btn") || opening) return;
  openInvitation();
});

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
