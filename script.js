const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

// TEST vardai (vėliau pakeisim į tavo CSV)
const segments = [
  "Tomas",
  "Jonas",
  "Petras",
  "Ona",
  "Asta",
  "Marius",
  "Rasa",
  "Lukas"
];

let angle = 0;
let spinning = false;

canvas.width = 400;
canvas.height = 400;

function draw(rotation = 0) {
  const cx = 200;
  const cy = 200;
  const radius = 180;
  const arc = (2 * Math.PI) / segments.length;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < segments.length; i++) {
    const start = i * arc + rotation;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, start + arc);
    ctx.fillStyle = i % 2 ? "#0F4C81" : "#00A6A6";
    ctx.fill();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + arc / 2);

    ctx.fillStyle = "white";
    ctx.font = "14px Arial";
    ctx.textAlign = "right";

    ctx.fillText(segments[i], radius - 10, 5);
    ctx.restore();
  }

  // rodyklė
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(cx, 10);
  ctx.lineTo(cx - 15, 40);
  ctx.lineTo(cx + 15, 40);
  ctx.fill();
}

draw();

function spin() {
  if (spinning) return;
  spinning = true;

  const winnerIndex = Math.floor(Math.random() * segments.length);
  const arc = (2 * Math.PI) / segments.length;

  const targetAngle = (2 * Math.PI) - (winnerIndex * arc) - arc/2;
  const final = 6 * 2 * Math.PI + targetAngle;

  let start = null;

  function animate(t) {
    if (!start) start = t;
    let progress = (t - start) / 3000;
    if (progress > 1) progress = 1;

    let ease = 1 - Math.pow(1 - progress, 3);
    angle = final * ease;

    draw(angle);

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      alert("Laimėjo: " + segments[winnerIndex]);
    }
  }

  requestAnimationFrame(animate);
}

document.getElementById("spinBtn").addEventListener("click", spin);
