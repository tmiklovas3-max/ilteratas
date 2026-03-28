const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

// 👉 TESTUI (vėliau galėsi įdėti visus 254)
const segments = [
"Tomas Miklovas",
"Juozas Vaiciunas",
"Rasa Dayjotienė",
"Monika Daine",
"Aida Mazikaite",
"Erikas Blynovas",
"Donatas Skubrys",
"Kristina Rainienė",
"Akvilė Kulikauskaitė",
"Jonas Jonaitis",
"Ona Onaite",
"Petras Petraitis"
];

let angle = 0;
let spinning = false;

// resize
function resize() {
  canvas.width = Math.min(window.innerWidth, window.innerHeight) * 0.9;
  canvas.height = canvas.width;
  draw();
}
window.addEventListener("resize", resize);
resize();

const arc = (2 * Math.PI) / segments.length;

function draw(rotation = 0) {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = canvas.width / 2 - 20;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < segments.length; i++) {
    const start = i * arc + rotation;
    const end = start + arc;

    ctx.beginPath();
    ctx.fillStyle = i % 2 ? "#0F4C81" : "#00A6A6";
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, end);
    ctx.fill();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + arc / 2);

    ctx.fillStyle = "#fff";
    ctx.font = "14px Arial";
    ctx.textAlign = "right";

    ctx.fillText(segments[i], radius - 10, 5);
    ctx.restore();
  }

  // rodyklė
  ctx.fillStyle = "#FF3D00";
  ctx.beginPath();
  ctx.moveTo(cx, 10);
  ctx.lineTo(cx - 20, 50);
  ctx.lineTo(cx + 20, 50);
  ctx.fill();
}

function spin() {
  if (spinning) return;
  spinning = true;

  const winnerIndex = Math.floor(Math.random() * segments.length);

  const targetAngle = (2 * Math.PI) - (winnerIndex * arc) - arc/2;
  const final = 8 * 2 * Math.PI + targetAngle;

  let start = null;

  function animate(t) {
    if (!start) start = t;
    let progress = (t - start) / 4000;
    if (progress > 1) progress = 1;

    let ease = 1 - Math.pow(1 - progress, 3);
    angle = final * ease;

    draw(angle);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      showWinner(winnerIndex);
    }
  }

  requestAnimationFrame(animate);
}

function showWinner(index) {
  document.getElementById("winner").innerText = "🎉 " + segments[index];
}

document.getElementById("spinBtn").addEventListener("click", spin);
