window.onload = async function() {
  const container = document.getElementById("namesContainer");

  // CSV failas
  const response = await fetch("data.csv");
  const text = await response.text();
  const rows = text.split("\n").map(r=>r.trim()).filter(r=>r);

  function parseCSV(line){
    const result=[]; let cur=""; let inQuotes=false;
    for(let c of line){
      if(c==='"') inQuotes=!inQuotes;
      else if(c===',' && !inQuotes){result.push(cur); cur="";}
      else cur+=c;
    }
    result.push(cur);
    return result.map(s=>s.trim());
  }

  const headers = parseCSV(rows[0]);
  const nameIndex = headers.findIndex(h=>h.includes("Vardas") && !h.includes("(2)"));
  const surnameIndex = headers.findIndex(h=>h.includes("Pavard") && !h.includes("(2)"));

  let names = [];
  for(let i=1;i<rows.length;i++){
    const cols = parseCSV(rows[i]);
    const n1 = cols[nameIndex], s1 = cols[surnameIndex];
    if(n1 && s1) names.push(n1 + " " + s1);
  }

  if(names.length===0){ container.innerText="Nėra vardų sąraše!"; return; }

  // prailginam sąrašą su keliomis kopijomis
  let loop = [];
  for(let i=0;i<50;i++) loop = loop.concat(names);

  // render vardus po vieną
  loop.forEach(name=>{
    const div = document.createElement("div");
    div.className = "name";
    div.innerText = name;
    container.appendChild(div);
  });

  const itemHeight = 100;
  const winnerName = "Angelė Urbonaitė";
  let spinning = false;

  function normalize(str){ return str.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase().trim(); }

  function spin(){
    if(spinning) return;
    spinning = true;

    const all = document.querySelectorAll(".name");
    const matches = Array.from(all)
      .map((el,i)=>normalize(el.innerText)===normalize(winnerName)?i:-1)
      .filter(i=>i!==-1);

    if(matches.length===0){ alert("Angelė Urbonaitė nerasta!"); spinning=false; return; }

    const targetIndex = matches[Math.floor(matches.length/2)];
    const finalPos = targetIndex * itemHeight;

    let pos = 0;
    let speed = 40; // pradinis greitis

    function animate(){
      const distance = finalPos - pos;
      const decel = 0.05;
      speed = Math.max(distance * decel, 2); // lėtėjimas
      pos += speed;
      container.style.transform = `translateY(-${pos}px)`;

      if(distance>1) requestAnimationFrame(animate);
      else{
        container.style.transform = `translateY(-${finalPos}px)`;
        document.getElementById("winner").innerText = "🎉 Laimėjo: "+winnerName;
        spinning=false;
      }
    }

    requestAnimationFrame(animate);
  }

  document.getElementById("spinBtn").addEventListener("click", spin);
};
