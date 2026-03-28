window.onload = async function() {
  const container = document.getElementById("names");

  // Nuskaityti failą
  const response = await fetch("data.csv");
  const text = await response.text();

  // Padalinti į eilutes ir išvalyti tarpus/naujus simbolius
  const rows = text.split("\n").map(r => r.trim()).filter(r => r.length > 0);

  // names array
  let names = [];

  // Filtruojame tik vardus + pavardes
  for (let i = 0; i < rows.length - 1; i++) {
    const first = rows[i];
    const second = rows[i + 1];

    // jei eilutės atrodo kaip vardas + pavardė (tikros raidės, nėra @, nėra skaičių)
    const combined = first + " " + second;
    if (
      !combined.includes("@") && 
      combined.replace(/\s/g,'').match(/^[a-zA-ZĄČĘĖĮŠŲŪŽąčęėįšųūž\s]+$/)
    ) {
      names.push(combined);
      i++; // praleidžiam kitą eilutę, nes jau paėmėme pavardę
    }
  }

  if (names.length === 0) {
    container.innerText = "Nėra vardų sąraše!";
    return;
  }

  // suformuojam ilgą sąrašą
  let loop = [];
  for (let i = 0; i < 30; i++) {
    loop = loop.concat(names);
  }

  // render vardus
  loop.forEach(name => {
    const div = document.createElement("div");
    div.className = "name";
    div.style.height = "90px";
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.fontSize = "24px";
    div.style.borderBottom = "1px solid #ccc";
    div.innerText = name;
    container.appendChild(div);
  });

  // container CSS
  container.style.height = "360px";
  container.style.overflow = "hidden";
  container.style.position = "relative";

  const itemHeight = 90;
  const visibleCenter = 180;

  let position = 0;
  let spinning = false;

  const winnerName = "Angelė Urbonaitė";

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

    const matches = Array.from(all)
      .map((el, i) => normalize(el.innerText) === targetNormalized ? i : -1)
      .filter(i => i !== -1);

    if (matches.length === 0) {
      alert("Angelė Urbonaitė nerasta sąraše!");
      spinning = false;
      return;
    }

    const targetIndex = matches[Math.floor(matches.length / 2)];
    const finalPosition = targetIndex * itemHeight - visibleCenter;

    container.style.transition = "none";
    container.style.transform = `translateY(0px)`;
    position = 0;

    let speed = 40;
    const interval = setInterval(() => {
      position += speed;
      container.style.transform = `translateY(-${position}px)`;
    }, 16);

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
