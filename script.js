window.onload = async function() {
  const container = document.getElementById("names");

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

  // sukuriam ilgą listą, kad Angelė būtų pakankamai kartų
  let loop = [];
  for (let i = 0; i < 30; i++) {
    loop = loop.concat(names);
  }

  // render
  loop.forEach(name => {
    const div = document.createElement("div");
    div.className = "name";
    div.innerText = name;
    container.appendChild(div);
  });

  const itemHeight = 90;
  const visibleCenter = 180;

  let position = 0;
  let spinning = false;

  // 🎯 winner
  const winnerName = "Angelė Urbonaitė";

  function spin() {
    if (spinning) return;
    spinning = true;

    const all = document.querySelectorAll(".name");

    // randam visas Angelės pozicijas
    const matches = Array.from(all).map((el, i) => el.innerText === winnerName ? i : -1).filter(i => i !== -1);

    if (matches.length === 0) {
      alert("Angelė Urbonaitė nerasta sąraše!");
      spinning = false;
      return;
    }

    // imam vidurinę poziciją
    const targetIndex = matches[Math.floor(matches.length / 2)];
    const finalPosition = targetIndex * itemHeight - visibleCenter;

    // RESET transition
    container.style.transition = "none";
    container.style.transform = `translateY(0px)`;
    position = 0;

    // 🌀 animacija
    let speed = 40;
    const interval = setInterval(() => {
      position += speed;
      container.style.transform = `translateY(-${position}px)`;
    }, 16);

    // sustabdymas po 5s
    setTimeout(() => {
      clearInterval(interval);
      container.style.transition = "transform 2s ease-out";
      container.style.transform = `translateY(-${finalPosition}px)`;
      document.getElementById("winner").innerText = "🎉 Laimėjo: " + winnerName;
      position = finalPosition;
      spinning = false;
    }, 5000);
  }

  document.getElementById("spinBtn").addEventListener("click", spin);
};
