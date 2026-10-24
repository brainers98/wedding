const cover = document.getElementById("cover");
const invite = document.getElementById("invite");
const passport = document.getElementById("passport");
const petalBurst = document.getElementById("petalBurst");
const rsvpForm = document.getElementById("rsvpForm");
const rsvpNote = document.getElementById("rsvpNote");
const rsvpSuccess = document.getElementById("rsvpSuccess");

const isMobile =
  window.matchMedia("(max-width: 768px)").matches ||
  window.matchMedia("(pointer: coarse)").matches;

const PETAL_COUNT = isMobile ? 800 : 1000;

let opening = false;

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function spawnPetals(count = PETAL_COUNT) {
  petalBurst.innerHTML = "";
  petalBurst.classList.add("is-active");

  const canvas = document.createElement("canvas");
  canvas.className = "petal-canvas";
  petalBurst.appendChild(canvas);

  const ctx = canvas.getContext("2d", { alpha: true });
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  const w = petalBurst.clientWidth || window.innerWidth;
  const h = petalBurst.clientHeight || window.innerHeight;
  canvas.width = Math.floor(w * dpr);
  canvas.height = Math.floor(h * dpr);
  canvas.style.width = `${w}px`;
  canvas.style.height = `${h}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const colors = [
    "rgba(240, 228, 250, 0.92)",
    "rgba(180, 143, 212, 0.9)",
    "rgba(143, 99, 181, 0.88)",
    "rgba(107, 74, 138, 0.9)",
  ];

  const petals = new Array(count);
  for (let i = 0; i < count; i += 1) {
    petals[i] = {
      x: Math.random() * w,
      y: -30 - Math.random() * h,
      size: 5 + Math.random() * 12,
      speed: 140 + Math.random() * 260,
      drift: -70 + Math.random() * 140,
      rot: Math.random() * Math.PI * 2,
      spin: -2.5 + Math.random() * 5,
      color: colors[(Math.random() * colors.length) | 0],
      delay: Math.random() * 0.55,
    };
  }

  let start = null;
  let frameId = 0;

  function tick(ts) {
    if (!start) start = ts;
    const elapsed = (ts - start) / 1000;
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < count; i += 1) {
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
      ctx.ellipse(0, 0, p.size * 0.5, p.size, 0, 0, Math.PI * 2);
      ctx.fill();
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
  cover.style.pointerEvents = "none";

  await wait(30);
  spawnPetals(PETAL_COUNT);
  await wait(isMobile ? 2000 : 2800);

  cover.classList.add("is-gone");
  invite.hidden = false;
  document.body.style.overflow = "";

  window.requestAnimationFrame(() => {
    passport.classList.add("is-open");
  });
}

document.body.style.overflow = "hidden";

// Tap / press ANYWHERE on the cover screen
function onCoverActivate(event) {
  if (opening) return;
  event.preventDefault();
  event.stopPropagation();
  openInvitation();
}

cover.addEventListener("touchstart", onCoverActivate, { passive: false });
cover.addEventListener("click", onCoverActivate);
cover.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    openInvitation();
  }
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
