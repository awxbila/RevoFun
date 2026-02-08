// Jangan ambil nilai lama dari localStorage untuk tampilan awal.
// Tetap simpan di variabel jika mau, tapi jangan dipakai sebelum main.
let score = Number(localStorage.getItem("rpsScore") || 0);
let firstMove = true;

function startGame() {
  const name = document.getElementById("playerNameInput").value.trim();
  if (!name) {
    alert("Please enter your name first!");
    return;
  }

  localStorage.setItem("playerName", name);
  document.getElementById("playerName").textContent = name;

  // Tampilkan area game, tapi tidak menampilkan score
  document.getElementById("name-section").style.display = "none";
  document.getElementById("game-section").style.display = "block";

  // Pastikan teks skor kosong meskipun ada nilai lama di localStorage
  document.getElementById("score").textContent = "";
}

function play(playerChoice) {
  // Pertama kali user memilih, barulah tampilkan wrapper & nilai awal
  if (firstMove) {
    document.getElementById("score-wrap").style.display = "block";
    // Tampilkan 0 agar memulai dari nol secara visual
    document.getElementById("score").textContent = 0;
    firstMove = false;
    // Mulai perhitungan skor dari nol, bukan dari localStorage lama
    score = 0;
  }

  const choices = ["rock", "scissors", "paper"];
  const computer = choices[Math.floor(Math.random() * choices.length)];
  let result = "";

  if (playerChoice === computer) {
    result = `Draw! Computer also chose ${computer}`;
  } else if (
    (playerChoice === "rock" && computer === "scissors") ||
    (playerChoice === "scissors" && computer === "paper") ||
    (playerChoice === "paper" && computer === "rock")
  ) {
    result = `You Win! Computer chose ${computer}`;
    score++;
  } else {
    result = `You Lose! Computer chose ${computer}`;
    if (score > 0) score--;
  }

  document.getElementById("result").textContent = result;
  document.getElementById("score").textContent = score;
  localStorage.setItem("rpsScore", score);
}
