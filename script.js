window.onload = async function() {

const response = await fetch("data.csv");
const text = await response.text();

const rows = text.split("\n");

let names = [];

for (let i = 1; i < rows.length; i++) {
  const cols = rows[i].split(",");

  if (cols[2] && cols[3]) {
    names.push(cols[2] + " " + cols[3]);
  }

  if (cols[7] && cols[8]) {
    names.push(cols[7] + " " + cols[8]);
  }
}

names = names.filter(x => x && x.length > 3);

// 👉 DOM
const container = document.getElementById("names");

// sukuriam listą (pakartojam daug kartų, kad gražiai suktųsi)
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

    // surandam Angelę
    const index = names.indexOf(winnerName);
    const finalPos = index * 80;

    container.style.transition = "transform 1s ease-out";
    container.style.transform = `translateY(-${finalPos}px)`;

    document.getElementById("winner").innerText = "🎉 " + winnerName;

    spinning = false;

  }, 3000);
}

document.getElementById("spinBtn").addEventListener("click", spin);

};
