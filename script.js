const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

const namesList = window.names;

const segments = namesList.length;
const arc = 2 * Math.PI / segments;

let angle = 0;

function draw(rotation = 0) {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = canvas.width / 2 - 20;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < segments; i++) {
    // segmentas
    ctx.beginPath();
    ctx.fillStyle = i % 2 ? "#eee" : "#ccc";
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, i * arc + rotation, (i + 1) * arc + rotation);
    ctx.fill();

    // tekstas (DIDELIS IR AIŠKUS)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(i * arc + arc / 2 + rotation);

    ctx.fillStyle = "black";
    ctx.font = "18px Arial";
    ctx.textAlign = "right";

    ctx.fillText(namesList[i], radius - 30, 5);

    ctx.restore();
  }

  // rodyklė
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(cx, 10);
  ctx.lineTo(cx - 10, 30);
  ctx.lineTo(cx + 10, 30);
  ctx.fill();
}

draw();

function spin() {
  const targetName = "Angelė Urbonaitė";
  const targetIndex = namesList.indexOf(targetName);

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
