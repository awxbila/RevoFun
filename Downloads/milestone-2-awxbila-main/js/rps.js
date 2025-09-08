let score = localStorage.getItem("rpsScore") || 0;
document.getElementById("score").textContent = score;

function play(playerChoice) {
  const choices = ["batu", "gunting", "kertas"];
  const compChoice = choices[Math.floor(Math.random() * choices.length)];
  let result = "";

  if (playerChoice === compChoice) {
    result = "Seri! Komputer juga pilih " + compChoice;
  } else if (
    (playerChoice === "batu" && compChoice === "gunting") ||
    (playerChoice === "gunting" && compChoice === "kertas") ||
    (playerChoice === "kertas" && compChoice === "batu")
  ) {
    result = "Kamu Menang! Komputer pilih " + compChoice;
    score++;
  } else {
    result = "Kamu Kalah! Komputer pilih " + compChoice;
    if (score > 0) score--;
  }

  document.getElementById("result").textContent = result;
  document.getElementById("score").textContent = score;
  localStorage.setItem("rpsScore", score);
}
