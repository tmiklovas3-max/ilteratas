const canvas = document.getElementById("wheel");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "red";
ctx.beginPath();
ctx.arc(200, 200, 150, 0, Math.PI * 2);
ctx.fill();
