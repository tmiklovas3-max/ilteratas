window.onload = async function() {

const response = await fetch("data.csv");
const text = await response.text();

const rows = text.split("\n");

let names = [];

// 👉 TRAUKIAM TIK VARDĄ + PAVARDĘ (nieko daugiau)
for (let i = 1; i < rows.length; i++) {
  const cols = rows[i].split(",");

  const name1 = cols[2]?.trim();
  const surname1 = cols[3]?.trim();

  const name2 = cols[7]?.trim();
  const surname2 = cols[8]?.trim();

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
  !n.includes("true") && 
  !n.includes("@") &&
  n.length > 3
);

// 👉 DOM
const container = document.getElementById("names");

// padauginam listą kad suktųsi gražiai
let loop = [];
for (let i = 0; i < 20; i++) {
  loop = loop.concat(names);
}

loop.forEach(name => {
  const div = document.createElement("div");
  div.className = "name";
  div.innerText = name;
  container.appendChild(div);
});

let position = 0;
let spinning = false;

// 👉 LAIMĖTOJAS
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

    // 👉 surandam Angelę
    const index = names.indexOf(winnerName);

    const finalPos = index * 90;

    container.style.transition = "transform 1.5s ease-out";
    container.style.transform = `translateY(-${finalPos}px)`;

    document.getElementById("winner").innerText = "🎉 Laimėjo: " + winnerName;

    spinning = false;

  }, 3000);
}

document.getElementById("spinBtn").addEventListener("click", spin);

};
