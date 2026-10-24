const cover = document.getElementById("cover");
const openBtn = document.getElementById("openBtn");
const invite = document.getElementById("invite");
const passport = document.getElementById("passport");
const petalBurst = document.getElementById("petalBurst");
const guestNameEl = document.getElementById("guestName");
const rsvpForm = document.getElementById("rsvpForm");
const rsvpNote = document.getElementById("rsvpNote");
const rsvpSuccess = document.getElementById("rsvpSuccess");

const isMobile =
  window.matchMedia("(max-width: 768px)").matches ||
  window.matchMedia("(pointer: coarse)").matches;

const PETAL_COUNT = isMobile ? 200 : 400;

let opening = false;
let currentGuest = null;

function normalizeGuestKey(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}

function guestId(guest) {
  if (guest.id) return normalizeGuestKey(guest.id);
  return normalizeGuestKey(guest.name)
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function getGuestFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const raw = params.get("guest") || params.get("name") || params.get("to");
  if (!raw) return null;

  const requested = normalizeGuestKey(raw);
  const guests = typeof GUESTS !== "undefined" ? GUESTS : [];

  return (
    guests.find((guest) => guestId(guest) === requested) ||
    guests.find((guest) => normalizeGuestKey(guest.name) === requested) ||
    null
  );
}

function personalizeInvitation() {
  currentGuest = getGuestFromUrl();
  const displayName = currentGuest ? currentGuest.name : "Guest";

  if (guestNameEl) guestNameEl.textContent = displayName;

  if (currentGuest) {
    document.title = `${currentGuest.name} — Udara & Shainy Wedding`;
    const nameInput = rsvpForm?.querySelector('input[name="name"]');
    if (nameInput && !nameInput.value) nameInput.value = currentGuest.name;
  }
}

personalizeInvitation();

// Ceremony countdown — Dec 16, 2026 · 3:30 PM Sri Lanka time
const CEREMONY_AT = new Date("2026-12-16T15:30:00+05:30").getTime();
const cdDays = document.getElementById("cdDays");
const cdHours = document.getElementById("cdHours");
const cdMinutes = document.getElementById("cdMinutes");
const cdSeconds = document.getElementById("cdSeconds");

function padCount(value) {
  return String(Math.max(0, value)).padStart(2, "0");
}

function updateCountdown() {
  if (!cdDays || !cdHours || !cdMinutes || !cdSeconds) return;

  const diff = Math.max(0, CEREMONY_AT - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  cdDays.textContent = String(days);
  cdHours.textContent = padCount(hours);
  cdMinutes.textContent = padCount(minutes);
  cdSeconds.textContent = padCount(seconds);
}

updateCountdown();
window.setInterval(updateCountdown, 1000);

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function drawPetalShape(ctx, w, h) {
  // Pointed lavender-style petal (works on older mobile browsers too)
  ctx.moveTo(0, -h);
  ctx.bezierCurveTo(w * 0.95, -h * 0.55, w * 0.95, h * 0.25, 0, h);
  ctx.bezierCurveTo(-w * 0.95, h * 0.25, -w * 0.95, -h * 0.55, 0, -h);
  ctx.closePath();
}

function spawnPetals(count = PETAL_COUNT) {
  if (!petalBurst) return;

  petalBurst.innerHTML = "";
  petalBurst.classList.add("is-active");

  const canvas = document.createElement("canvas");
  canvas.className = "petal-canvas";
  petalBurst.appendChild(canvas);

  const ctx = canvas.getContext("2d", { alpha: true });
  if (!ctx) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = petalBurst.clientWidth || window.innerWidth || 360;
  const h = petalBurst.clientHeight || window.innerHeight || 640;

  canvas.width = Math.max(1, Math.floor(w * dpr));
  canvas.height = Math.max(1, Math.floor(h * dpr));
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const colors = [
    "rgba(240, 228, 250, 0.92)",
    "rgba(180, 143, 212, 0.9)",
    "rgba(143, 99, 181, 0.88)",
    "rgba(107, 74, 138, 0.9)",
  ];

  const safeCount = Math.max(0, Number(count) || 0);
  const petals = new Array(safeCount);

  for (let i = 0; i < safeCount; i += 1) {
    petals[i] = {
      x: Math.random() * w,
      y: -30 - Math.random() * h,
      size: 7 + Math.random() * 16,
      speed: 140 + Math.random() * 260,
      drift: -70 + Math.random() * 140,
      rot: Math.random() * Math.PI * 2,
      spin: -2.5 + Math.random() * 5,
      color: colors[(Math.random() * colors.length) | 0],
      delay: Math.random() * 0.45,
    };
  }

  let start = null;
  let frameId = 0;

  function tick(ts) {
    if (!start) start = ts;
    const elapsed = (ts - start) / 1000;
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < safeCount; i += 1) {
      const p = petals[i];
      const local = elapsed - p.delay;
      if (local < 0) continue;

      const y = p.y + p.speed * local;
      if (y > h + 50) continue;

      ctx.save();
      ctx.translate(p.x + p.drift * local * 0.35, y);
      ctx.rotate(p.rot + p.spin * local);
      ctx.fillStyle = p.color;
      ctx.beginPath();
      drawPetalShape(ctx, p.size * 0.42, p.size);
      ctx.fill();

      // Soft center vein for a more petal-like look
      ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
      ctx.lineWidth = Math.max(0.6, p.size * 0.06);
      ctx.beginPath();
      ctx.moveTo(0, -p.size * 0.72);
      ctx.quadraticCurveTo(p.size * 0.04, 0, 0, p.size * 0.78);
      ctx.stroke();
      ctx.restore();
    }

    frameId = window.requestAnimationFrame(tick);
  }

  frameId = window.requestAnimationFrame(tick);
  window.setTimeout(() => window.cancelAnimationFrame(frameId), 5000);
}

async function openInvitation() {
  if (opening) return;
  opening = true;

  cover.classList.add("is-opening");
  cover.setAttribute("aria-busy", "true");

  // Petals must never block opening if they fail
  try {
    await wait(30);
    spawnPetals(PETAL_COUNT);
    await wait(isMobile ? 1600 : 2000);
  } catch (error) {
    console.warn("Petal animation skipped:", error);
  }

  cover.classList.add("is-gone");
  cover.style.pointerEvents = "none";
  invite.hidden = false;
  document.body.style.overflow = "";

  window.requestAnimationFrame(() => {
    passport.classList.add("is-open");
  });
}

document.body.style.overflow = "hidden";

function onOpenActivate(event) {
  if (opening) return;
  event.preventDefault();
  event.stopPropagation();
  openInvitation();
}

openBtn.addEventListener("click", onOpenActivate);
openBtn.addEventListener("touchend", onOpenActivate, { passive: false });
openBtn.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    onOpenActivate(event);
  }
});

rsvpForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const data = Object.fromEntries(new FormData(rsvpForm).entries());
  if (currentGuest) {
    data.guestFromLink = currentGuest.name;
    data.guestId = currentGuest.id || guestId(currentGuest);
  }

  const scriptUrl =
    typeof RSVP_SCRIPT_URL !== "undefined" ? RSVP_SCRIPT_URL.trim() : "";

  const controls = rsvpForm.querySelectorAll("input, select, textarea, button");
  controls.forEach((el) => {
    el.disabled = true;
  });

  if (!scriptUrl) {
    if (rsvpNote) {
      rsvpNote.hidden = false;
      rsvpNote.textContent =
        "RSVP sheet is not connected yet. Add RSVP_SCRIPT_URL in guests.js.";
    }
    controls.forEach((el) => {
      el.disabled = false;
    });
    return;
  }

  try {
    await fetch(scriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(data),
    });

    if (rsvpNote) rsvpNote.hidden = true;
    if (rsvpSuccess) rsvpSuccess.hidden = false;
  } catch (error) {
    console.error("RSVP submit failed:", error);
    controls.forEach((el) => {
      el.disabled = false;
    });
    if (rsvpNote) {
      rsvpNote.hidden = false;
      rsvpNote.textContent = "Could not send RSVP. Please try again.";
    }
  }
});
