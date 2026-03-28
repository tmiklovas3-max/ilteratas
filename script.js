const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

let segments = 100;
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
    ctx.arc(cx, cy, radius, i*arc+rotation, (i+1)*arc+rotation);
    ctx.fill();

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(i*arc + arc/2 + rotation);
    ctx.fillStyle = "black";
    ctx.font = `${Math.floor(radius/12)}px Arial`;
    ctx.fillText(i+1, radius - 30, 5);
    ctx.restore();
  }

  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.moveTo(cx, 10);
  ctx.lineTo(cx - 15, 40);
  ctx.lineTo(cx + 15, 40);
  ctx.fill();
}

draw();

function spin() {
  let targetIndex = 19;
  let targetAngle = (2*Math.PI) - (targetIndex * arc) - arc/2;

  let final = 10 * 2*Math.PI + targetAngle;

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
      alert("Laimėjai: 20 🎉");
    }
  }

  requestAnimationFrame(animate);
}

document.getElementById("spinBtn").addEventListener("click", spin);
