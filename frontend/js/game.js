const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 400;

let can = { x: 280, y: 200, size: 40 };
let player = { x: 100, y: 200, size: 20 };
let stone = null;
let score = 0;

// Draw can
function drawCan() {
  ctx.fillStyle = "brown";
  ctx.fillRect(can.x, can.y, can.size, can.size);
}

// Draw player
function drawPlayer() {
  ctx.fillStyle = "blue";
  ctx.beginPath();
  ctx.arc(player.x, player.y, player.size, 0, Math.PI * 2);
  ctx.fill();
}

// Draw stone
function drawStone() {
  if (stone) {
    ctx.fillStyle = "gray";
    ctx.beginPath();
    ctx.arc(stone.x, stone.y, 10, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawCan();
  drawPlayer();
  drawStone();

  if (stone) {
    stone.x += stone.vx;
    stone.y += stone.vy;

    // Check collision with can
    if (stone.x > can.x && stone.x < can.x + can.size &&
        stone.y > can.y && stone.y < can.y + can.size) {
      score++;
      alert(`You hit the can! 🎉 Score: ${score}`);
      saveScore("Player", score);
      stone = null;
    }

    // Remove if out of bounds
    if (stone.x > canvas.width || stone.y > canvas.height ||
        stone.x < 0 || stone.y < 0) {
      stone = null;
    }
  }

  requestAnimationFrame(gameLoop);
}
gameLoop();

// Throw stone on click
canvas.addEventListener("click", (e) => {
  const angle = Math.atan2(e.offsetY - player.y, e.offsetX - player.x);
  stone = {
    x: player.x,
    y: player.y,
    vx: Math.cos(angle) * 5,
    vy: Math.sin(angle) * 5
  };
});

// Save score to backend
async function saveScore(player, score) {
  await fetch('/api/game/scores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ player, score })
  });
  loadScores();
}

// Load high scores
async function loadScores() {
  const res = await fetch('/api/game/scores');
  const scores = await res.json();
  const scoresList = document.getElementById("scoresList");
  scoresList.innerHTML = "";
  scores.forEach(s => {
    let li = document.createElement("li");
    li.textContent = `${s.player}: ${s.score}`;
    scoresList.appendChild(li);
  });
}
loadScores();
