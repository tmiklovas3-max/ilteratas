window.onload = async function() {

const container = document.getElementById("names");

// CSV
const response = await fetch("data.csv");
const text = await response.text();
const rows = text.split("\n");

// headeriai
const headers = rows[0].split(",");

const nameIndex = headers.findIndex(h => h.includes("Vardas") && !h.includes("(2)"));
const surnameIndex = headers.findIndex(h => h.includes("Pavard") && !h.includes("(2)"));

const name2Index = headers.findIndex(h => h.includes("Vardas (2)"));
const surname2Index = headers.findIndex(h => h.includes("Pavardė (2)"));

// vardai
let names = [];

for (let i = 1; i < rows.length; i++) {
  const cols = rows[i].split(",");

  const n1 = cols[nameIndex]?.trim();
  const s1 = cols[surnameIndex]?.trim();

  const n2 = cols[name2Index]?.trim();
  const s2 = cols[surname2Index]?.trim();

  if (n1 && s1) names.push(n1 + " " + s1);
  if (n2 && s2) names.push(n2 + " " + s2);
}

// cleanup
names = names.filter(n => n && !n.includes("@") && n.length > 3);

// loop
let loop = [];
for (let i = 0; i < 20; i++) {
  loop = loop.concat(names);
}

// render
loop.forEach(name => {
  const div = document.createElement("div");
  div.className = "name";
  div.innerText = name;
  container.appendChild(div);
});

// config
const itemHeight = 90;
const visibleCenter = 180;

let spinning = false;

// 🎯 winner
const winnerName = "Angelė Urbonaitė";

function spin() {
  if (spinning) return;
  spinning = true;

  const all = document.querySelectorAll(".name");

  // surandam visas Angelės pozicijas
  let matches = [];
  for (let i = 0; i < all.length; i++) {
    if (all[i].innerText === winnerName) {
      matches.push(i);
    }
  }

  // imam vidurinę (geriausia UX)
  const targetIndex = matches[Math.floor(matches.length / 2)];

  const finalPosition = targetIndex * itemHeight - visibleCenter;

  // 👉 pradedam nuo dabartinės pozicijos
  let start = null;
  const duration = 6000; // ilgiau sukasi

  // 👉 kiek suksis papildomai (scroll kiekis)
  const startPos = 0;
  const extraSpin = 3000; // kiek px „prasukti“ prieš sustojant

  function animate(t) {
    if (!start) start = t;

    let progress = (t - start) / duration;
    if (progress > 1) progress = 1;

    // ease out
    const ease = 1 - Math.pow(1 - progress, 3);

    // 👉 nuo greito sukimo į tikslų sustojimą
    const current = startPos + (extraSpin + finalPosition) * ease;

    container.style.transform = `translateY(-${current}px)`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      container.style.transform = `translateY(-${finalPosition}px)`;

      document.getElementById("winner").innerText =
        "🎉 Laimėjo: " + winnerName;

      spinning = false;
    }
  }

  requestAnimationFrame(animate);
}

document.getElementById("spinBtn").addEventListener("click", spin);

};
