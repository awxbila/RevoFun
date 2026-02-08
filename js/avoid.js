let player, objects, score;
let ctx, canvas;
let gameRunning = false;
let playerName = "";

function startGame() {
  playerName = document.getElementById("playerNameInput").value.trim();
  if (!playerName) {
    alert("Please enter your name first!");
    return;
  }

  // Tampilkan area game
  document.getElementById("playerName").textContent = playerName;
  document.getElementById("name-section").style.display = "none";
  document.getElementById("game-section").style.display = "block";

  // Siapkan canvas & context
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  // Inisialisasi state
  player = { x: 180, y: 460, w: 40, h: 40, speed: 7 };
  objects = [];
  score = 0;

  // Pastikan elemen UI tersembunyi di awal
  document.getElementById("score-wrap").style.display = "none";
  document.getElementById("gameOver").style.display = "none";

  // Mulai game loop
  gameRunning = true;
  requestAnimationFrame(gameLoop);
}

function gameLoop() {
  if (!gameRunning) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Tampilkan skor setelah frame pertama benar-benar berjalan
  if (document.getElementById("score-wrap").style.display === "none") {
    document.getElementById("score-wrap").style.display = "block";
  }

  // Gambar player (kotak biru ukuran 40x40)
  ctx.fillStyle = "blue";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // Secara acak buat objek jatuh (kotak merah 40x40)
  if (Math.random() < 0.02) {
    objects.push({
      x: Math.random() * (canvas.width - 40),
      y: -40,
      w: 40,
      h: 40,
    });
  }

  ctx.fillStyle = "red";
  for (let o of objects) {
    o.y += 4;
    ctx.fillRect(o.x, o.y, o.w, o.h);

    // Deteksi tabrakan
    if (
      o.x < player.x + player.w &&
      o.x + o.w > player.x &&
      o.y < player.y + player.h &&
      o.y + o.h > player.y
    ) {
      endGame();
      return;
    }
  }

  // Hapus objek yang sudah lewat
  objects = objects.filter((o) => o.y < canvas.height);

  // Update skor
  score++;
  document.getElementById("score").textContent = score;

  requestAnimationFrame(gameLoop);
}

function endGame() {
  gameRunning = false;
  document.getElementById(
    "gameOver"
  ).textContent = `Game Over, ${playerName}! Final Score: ${score}`;
  document.getElementById("gameOver").style.display = "block";
}

// Kontrol pemain (Arrow Left/Right)
document.addEventListener("keydown", (e) => {
  if (!gameRunning) return;
  if (e.key === "ArrowLeft" && player.x > 0) player.x -= player.speed;
  if (e.key === "ArrowRight" && player.x + player.w < canvas.width)
    player.x += player.speed;
});
