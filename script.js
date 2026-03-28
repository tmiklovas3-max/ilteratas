window.onload = async function() {
  const container = document.getElementById("names");

  // CSV nuskaitymas
  const response = await fetch("data.csv");
  const text = await response.text();
  const rows = text.split("\n").map(r => r.trim()).filter(r => r.length > 0);

  // names array
  let names = [];

  // Kiekvienas įrašas – 5 eilutės: vardas, pavardė, profesija, sutikimas, email
  for (let i = 0; i < rows.length; i += 5) {
    const n = rows[i];
    const s = rows[i + 1];
    if (n && s) names.push(n + " " + s);
  }

  // suformuojam ilgą sąrašą, kad ratas atrodytų „ilgai sukasi“
  let loop = [];
  for (let i = 0; i < 30; i++) {
    loop = loop.concat(names);
  }

  // render name divs
  loop.forEach(name => {
    const div = document.createElement("div");
    div.className = "name";
    div.innerText = name;
    container.appendChild(div);
  });

  const itemHeight = 90;      // aukštis vienam vardui
  const visibleCenter = 180;  // kur rodome vidurį

  let position = 0;
  let spinning = false;

  const winnerName = "Angelė Urbonaitė";

  // normalizuojam vardus, kad diakritika nesutrukdytų
  function normalize(str) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase();
  }

  function spin() {
    if (spinning) return;
    spinning = true;

    const all = document.querySelectorAll(".name");
    const targetNormalized = normalize(winnerName);

    // randam visas Angelės pozicijas
    const matches = Array.from(all)
      .map((el, i) => normalize(el.innerText) === targetNormalized ? i : -1)
      .filter(i => i !== -1);

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

    // sukimo animacija
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
