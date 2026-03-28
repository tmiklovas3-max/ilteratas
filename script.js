window.onload = async function() {
  const container = document.getElementById("names");

  // CSV nuskaitymas
  const response = await fetch("data.csv");
  const text = await response.text();
  const rows = text.split("\n").map(r => r.trim()).filter(r => r.length > 0);

  // CSV parseris su kabutėmis
  function parseCSVLine(line) {
    const result = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === '"') inQuotes = !inQuotes;
      else if (c === "," && !inQuotes) {
        result.push(cur);
        cur = "";
      } else cur += c;
    }
    result.push(cur);
    return result.map(s => s.trim());
  }

  // headers
  const headers = parseCSVLine(rows[0]);
  const nameIndex = headers.findIndex(h => h.includes("Vardas") && !h.includes("(2)"));
  const surnameIndex = headers.findIndex(h => h.includes("Pavard") && !h.includes("(2)"));
  const name2Index = headers.findIndex(h => h.includes("Vardas (2)"));
  const surname2Index = headers.findIndex(h => h.includes("Pavardė (2)"));

  // names array
  let names = [];
  for (let i = 1; i < rows.length; i++) {
    const cols = parseCSVLine(rows[i]);
    const n1 = cols[nameIndex];
    const s1 = cols[surnameIndex];
    const n2 = name2Index !== -1 ? cols[name2Index] : null;
    const s2 = surname2Index !== -1 ? cols[surname2Index] : null;
    if (n1 && s1) names.push(n1 + " " + s1);
    if (n2 && s2) names.push(n2 + " " + s2);
  }

  names = names.filter(n => n && !n.includes("@") && n.trim().length > 1);

  if (names.length === 0) {
    container.innerText = "Nėra vardų sąraše!";
    return;
  }

  // ilgai sąrašas sukimuisi
  let loop = [];
  for (let i = 0; i < 30; i++) loop = loop.concat(names);

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

  container.style.height = "360px";
  container.style.overflow = "hidden";
  container.style.position = "relative";

  const itemHeight = 90;
  const visibleCenter = 180;
  const winnerName = "Angelė Urbonaitė";
  let spinning = false;

  function normalize(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g,"").trim().toLowerCase();
  }

  function spin() {
    if (spinning) return;
    spinning = true;

    const all = document.querySelectorAll(".name");
    const targetNormalized = normalize(winnerName);

    const matches = Array.from(all)
      .map((el,i) => normalize(el.innerText)===targetNormalized ? i : -1)
      .filter(i=>i!==-1);

    if(matches.length===0){
      alert("Angelė Urbonaitė nerasta!");
      spinning=false;
      return;
    }

    const targetIndex = matches[Math.floor(matches.length/2)];
    const finalPosition = targetIndex*itemHeight - visibleCenter;

    let position = 0;
    let speed = 20; // pradinis greitis

    function animate() {
      // artėjant prie tikslo, lėtiname
      const distance = finalPosition - position;
      const deceleration = 0.05; // lėtėjimo faktorius
      speed = Math.max(distance * deceleration, 1);
      position += speed;

      container.style.transform = `translateY(-${position}px)`;

      if(distance>1){
        requestAnimationFrame(animate);
      } else {
        container.style.transform = `translateY(-${finalPosition}px)`;
        document.getElementById("winner").innerText = "🎉 Laimėjo: " + winnerName;
        spinning=false;
      }
    }

    requestAnimationFrame(animate);
  }

  document.getElementById("spinBtn").addEventListener("click", spin);
};
