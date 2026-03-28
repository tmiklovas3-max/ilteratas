window.onload = function() {

const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

// 👉 VISI vardai (iš tavo CSV)
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
"Petras Petraitis",
"Lukas Kazlauskas",
"Marius Jankauskas",
"Asta Petrauskiene",
"Rokas Vaitkus",
"Egle Sabaliauskaite",
"Karolis Stankevicius",
"Simona Paulauskaite",
"Tadas Urbonas",
"Gintare Zukauskaite",
"Paulius Mockus",
"Inga Balciunaite",
"Mindaugas Grigas",
"Edita Vasiliauskaite",
"Deividas Petrauskas",
"Viktorija Navickaite",
"Arturas Kazlauskas",
"Raimonda Jankauskiene",
"Justas Bielskis",
"Ieva Petrauskaite",
"Arnas Vaitkus",
"Kotryna Stankeviciute",
"Saulius Kazlauskas",
"Neringa Paulauskaite",
"Vytautas Mockus",
"Jolanta Balciuniene",
"Antanas Grigas",
"Laura Vasiliauskaite",
"Darius Petrauskas",
"Lina Navickaite",
"Mantas Kazlauskas",
"Rasa Jankauskiene",
"Domantas Bielskis",
"Aiste Petrauskaite",
"Gabrielius Vaitkus",
"Ugne Stankeviciute",
"Algirdas Kazlauskas",
"Sigita Paulauskaite",
"Rolandas Mockus",
"Daiva Balciuniene",
"Kestutis Grigas",
"Zivile Vasiliauskaite",
"Saulius Petrauskas",
"Ramune Navickaite",

// 👉 SVARBUS – LAIMĖTOJAS
"Angelė Urbonaitė"
];

let angle = 0;
let spinning = false;

canvas.width = 600;
canvas.height = 600;

function draw(rotation = 0) {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = canvas.width / 2 - 20;
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
    ctx.font = `${Math.max(8, 250 / segments.length)}px Arial`;
    ctx.textAlign = "right";

    ctx.fillText(segments[i], radius - 10, 5);
    ctx.restore();
  }

  // rodyklė
  ctx.fillStyle = "#FF3D00";
  ctx.beginPath();
  ctx.moveTo(cx, 10);
  ctx.lineTo(cx - 20, 60);
  ctx.lineTo(cx + 20, 60);
  ctx.fill();
}

// 🎯 surandam Angelę
const winnerName = "Angelė Urbonaitė";
const winnerIndex = segments.indexOf(winnerName);

function spin() {
  if (spinning) return;
  spinning = true;

  const arc = (2 * Math.PI) / segments.length;

  const targetAngle = (2 * Math.PI) - (winnerIndex * arc) - arc / 2;

  const spins = 8;
  const final = spins * 2 * Math.PI + targetAngle;

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
      alert("🎉 Laimėjo: " + winnerName);
    }
  }

  requestAnimationFrame(animate);
}

draw();
document.getElementById("spinBtn").addEventListener("click", spin);

};
