const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let segments = names.length;
let angle = 0;

function resize() {
  canvas.width = Math.min(window.innerWidth, window.innerHeight) * 0.8;
  canvas.height = canvas.width;
  draw(angle);
}

window.addEventListener("resize", resize);
resize();

const arc = 2 * Math.PI / segments;

function draw(rotation = 0) {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = canvas.width / 2 - 10;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < segments; i++) {
    ctx.beginPath();
    ctx.fillStyle = i % 2 ? "#ddd" : "#bbb";
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, i * arc + rotation, (i + 1) * arc + rotation);
    ctx.fill();

    // tekstas
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(i * arc + arc / 2 + rotation);
    ctx.fillStyle = "black";
    ctx.font = `${Math.floor(radius / 14)}px Arial`;

    const text = names[i];
    ctx.fillText(text, radius - 120, 5);

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
  // SURANDAM "Angelė Urbonaitė"
  const targetName = "Angelė Urbonaitė";
  const targetIndex = names.indexOf(targetName);

  if (targetIndex === -1) {
    alert("Nerastas vardas!");
    return;
  }

  // kampas į tą segmentą
  let targetAngle = (2 * Math.PI) - (targetIndex * arc) - arc / 2;

  // daug apsisukimų (slot efektas)
  let spins = 10;
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
      alert("Laimėjo: " + targetName + " 🎉");
    }
  }

  requestAnimationFrame(animate);
}

document.getElementById("spinBtn").addEventListener("click", spin);
