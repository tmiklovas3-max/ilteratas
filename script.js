window.onload = async function() {

const container = document.getElementById("names");

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

  const name1 = cols[nameIndex]?.trim();
  const surname1 = cols[surnameIndex]?.trim();

  const name2 = cols[name2Index]?.trim();
  const surname2 = cols[surname2Index]?.trim();

  if (name1 && surname1) {
    names.push(name1 + " " + surname1);
  }

  if (name2 && surname2) {
    names.push(name2 + " " + surname2);
  }
}

// 👉 išvalom šiukšles
names = names.filter(n => 
  n &&
  !n.includes("@") &&
  !n.includes("true") &&
  n.length > 3
);

// 👉 padauginam listą
let loop = [];
for (let i = 0; i < 20; i++) {
  loop = loop.concat(names);
}

// 👉 sukuriam DOM
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

  let speed = 50;

  const interval = setInterval(() => {
    position += speed;
    container.style.transform = `translateY(-${position}px)`;
  }, 16);

  setTimeout(() => {
    clearInterval(interval);

    const all = document.querySelectorAll(".name");

    // 👉 surandam visas Angelės vietas
    let matches = [];

    for (let i = 0; i < all.length; i++) {
      if (all[i].innerText === winnerName) {
        matches.push(i);
      }
    }

    // 👉 imam tą, kuri arčiausiai vidurio
    const middle = Math.floor(all.length / 2);

    let winnerIndex = matches.reduce((prev, curr) =>
      Math.abs(curr - middle) < Math.abs(prev - middle) ? curr : prev
    );

    const itemHeight = 90;
    const centerOffset = 180;

    const finalPos = winnerIndex * itemHeight - centerOffset;

    container.style.transition = "transform 1.5s ease-out";
    container.style.transform = `translateY(-${finalPos}px)`;

    document.getElementById("winner").innerText = "🎉 Laimėjo: " + winnerName;

    spinning = false;

  }, 3000);
}

document.getElementById("spinBtn").addEventListener("click", spin);

};
