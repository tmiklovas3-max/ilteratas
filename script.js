window.onload = async function() {

const container = document.getElementById("names");
const slot = document.getElementById("slot");

// CSV
const response = await fetch("data.csv");
const text = await response.text();
const rows = text.split("\n");

// headers
const headers = rows[0].split(",");

const nameIndex = headers.findIndex(h => h.includes("Vardas") && !h.includes("(2)"));
const surnameIndex = headers.findIndex(h => h.includes("Pavard") && !h.includes("(2)"));

const name2Index = headers.findIndex(h => h.includes("Vardas (2)"));
const surname2Index = headers.findIndex(h => h.includes("Pavardė (2)"));

// names
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

// loop (daug kartų kad gražiai suktųsi)
let loop = [];
for (let i = 0; i < 30; i++) {
  loop = loop.concat(names);
}

// render
container.innerHTML = "";
loop.forEach(name => {
  const div = document.createElement("div");
  div.className = "name";
  div.innerText = name;
  container.appendChild(div);
});

// 👉 REALUS aukštis (FIX bug)
const firstItem = document.querySelector(".name");
const itemHeight = firstItem.offsetHeight;

const visibleCenter = slot.offsetHeight / 2;

let spinning = false;

// 🎯 winner
const winnerName = "Angelė Urbonaitė";

function spin() {
  if (spinning) return;
  spinning = true;

  const all = document.querySelectorAll(".name");

  // randam visas Angelės pozicijas
  let matches = [];
  for (let i = 0; i < all.length; i++) {
    if (all[i].innerText === winnerName) {
      matches.push(i);
    }
  }

  // imam tą, kuri per vidurį
  const targetIndex = matches[Math.floor(matches.length / 2)];

  const finalPosition =
    targetIndex * itemHeight - visibleCenter + (itemHeight / 2);

  // reset transition
  container.style.transition = "none";

  let position = 0;
  let speed = 40;

  // 👉 sukimas (MATOMAS)
  const interval = setInterval(() => {
    position += speed;
    container.style.transform = `translateY(-${position}px)`;
  }, 16);

  // 👉 sustabdymas
  setTimeout(() => {

    clearInterval(interval);

    container.style.transition = "transform 2s ease-out";
    container.style.transform = `translateY(-${finalPosition}px)`;

    document.getElementById("winner").innerText =
      "🎉 Laimėjo: " + winnerName;

    spinning = false;

  }, 5000); // 👈 reguliuok sukimą (pvz 6000, 7000)

}

document.getElementById("spinBtn").addEventListener("click", spin);

};
