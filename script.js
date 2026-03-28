const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const names = window.names;

const segments = names.length;
const arc = 2 * Math.PI / segments;

let angle = 0;

function draw(rotation = 0) {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = canvas.width / 2 - 10;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < segments; i++) {
    const start = i * arc + rotation;
    const end = start + arc;

    // segmentas
    ctx.beginPath();
    ctx.fillStyle = i % 2 ? "#f2f2f2" : "#d6d6d6";
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, start, end);
    ctx.fill();

    // 🔥 TEKSTAS (FIX)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + arc / 2);

    ctx.fillStyle = "#000";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";

    // PIEŠIAM ARČIAU CENTRO → kad tikrai matytųsi
    ctx.fillText(names[i], radius / 1.8, 0);

    ctx.restore();
  }

  // rodyklė
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(cx, 5);
  ctx.lineTo(cx - 10, 25);
  ctx.lineTo(cx + 10, 25);
  ctx.fill();
}

draw();

function spin() {
  const targetName = "Angelė Urbonaitė";
  const targetIndex = names.indexOf(targetName);

  let targetAngle = (2 * Math.PI) - (targetIndex * arc) - arc / 2;

  let spins = 8;
  let final = spins * 2 * Math.PI + targetAngle;

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
      alert("Laimėjo: " + targetName);
    }
  }

  requestAnimationFrame(animate);
}

document.getElementById("spinBtn").addEventListener("click", spin);
