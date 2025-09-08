const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let player = { x: 180, y: 370, w: 40, h: 20 };
let objects = [];
let score = 0;

document.addEventListener("keydown", move);

function move(e) {
  if (e.key === "ArrowLeft" && player.x > 0) player.x -= 20;
  if (e.key === "ArrowRight" && player.x < canvas.width - player.w)
    player.x += 20;
}

function drawPlayer() {
  ctx.fillStyle = "cyan";
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

function drawObjects() {
  ctx.fillStyle = "red";
  objects.forEach((o) => ctx.fillRect(o.x, o.y, o.w, o.h));
}

function updateObjects() {
  objects.forEach((o) => (o.y += 5));
  if (Math.random() < 0.05) {
    objects.push({ x: Math.random() * 360, y: 0, w: 20, h: 20 });
  }
  objects = objects.filter((o) => o.y < 400);
}

function checkCollision() {
  for (let o of objects) {
    if (
      player.x < o.x + o.w &&
      player.x + player.w > o.x &&
      player.y < o.y + o.h &&
      player.y + player.h > o.y
    ) {
      alert("Game Over! Skor: " + score);
      score = 0;
      objects = [];
    }
  }
}

function gameLoop() {
  ctx.clearRect(0, 0, 400, 400);
  drawPlayer();
  drawObjects();
  updateObjects();
  checkCollision();
  score++;
  document.getElementById("score").textContent = score;
  requestAnimationFrame(gameLoop);
}

gameLoop();
