window.onload = async function() {

const container = document.getElementById("names");
const slot = document.getElementById("slot");

// 👉 nuskaitom CSV
const response = await fetch("data.csv");
const text = await response.text();
const rows = text.split("\n");

// 👉 randam stulpelius
const headers = rows[0].split(",");

const nameIndex = headers.findIndex(h => h.includes("Vardas") && !h.includes("(2)"));
const surnameIndex = headers.findIndex(h => h.includes("Pavard") && !h.includes("(2)"));

const name2Index = headers.findIndex(h => h.includes("Vardas (2)"));
const surname2Index = headers.findIndex(h => h.includes("Pavardė (2)"));

// 👉 surenkam vardus
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

// 👉 cleanup
names = names.filter(n => 
  n &&
  !n.includes("@") &&
  !n.includes("true") &&
  n.length > 3
);

// 👉 padauginam listą (kad būtų ilgas scroll)
let loop = [];
for (let i = 0; i < 20; i++) {
  loop = loop.concat(names);
}

// 👉 renderinam
loop.forEach(name => {
  const div = document.createElement("div");
  div.className = "name";
  div.innerText = name;
  container.appendChild(div);
});

let position = 0;
let spinning = false;

// 🎯 LAIMĖTOJAS
const winnerName = "Angelė Urbonaitė";

function spin() {
  if (spinning) return;
  spinning = true;

  const all = document.querySelectorAll(".name");

  // 👉 randam visas Angelės vietas
  let matches = [];
  for (let i = 0; i < all.length; i++) {
    if (all[i].innerText === winnerName) {
      matches.push(i);
    }
  }

  // 👉 imam tą, kuri arčiausiai vidurio (gražiausia)
  const middle = Math.floor(all.length / 2);

  let targetIndex = matches.reduce((prev, curr) =>
    Math.abs(curr - middle) < Math.abs(prev - middle) ? curr : prev
  );

  let speed = 40;

  const interval = setInterval(() => {
    position += speed;
    container.style.transform = `translateY(-${position}px)`;
  }, 16);

  // 👉 kiek sukasi (reguliuok čia)
  setTimeout(() => {

    clearInterval(interval);

    const targetElement = all[targetIndex];

    // 👉 tikras centras (pixel-perfect)
    const slotRect = slot.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    const offset =
      targetRect.top - slotRect.top -
      (slot.clientHeight / 2) +
      (targetElement.clientHeight / 2);

    const finalPosition = position + offset;

    // 👉 smooth stop
    container.style.transition = "transform 2s ease-out";
    container.style.transform = `translateY(-${finalPosition}px)`;

    document.getElementById("winner").innerText =
      "🎉 Laimėjo: " + winnerName;

    position = finalPosition; // kad kitą kartą nuo čia tęstų

    spinning = false;

  }, 5000); // 👈 ilgiau sukasi (keisk jei nori)

}

document.getElementById("spinBtn").addEventListener("click", spin);

};
