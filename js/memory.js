function startGame() {
  const name = document.getElementById("playerNameInput").value.trim();
  if (!name) {
    alert("Please enter your name first!");
    return;
  }

  localStorage.setItem("playerName", name);
  document.getElementById("playerName").textContent = name;
  document.getElementById("name-section").style.display = "none";
  document.getElementById("game-section").style.display = "block";

  initGame();
}

function initGame() {
  const grid = document.getElementById("grid");
  grid.innerHTML = ""; // clear if replay
  const icons = ["🍎", "🍌", "🍇", "🍉", "🍎", "🍌", "🍇", "🍉"];
  const shuffled = icons.sort(() => 0.5 - Math.random());
  let openCards = [];
  let matchedCards = [];

  shuffled.forEach((icon) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.value = icon;
    card.textContent = "?";
    card.addEventListener("click", () => flipCard(card));
    grid.appendChild(card);
  });

  function flipCard(card) {
    if (
      openCards.length < 2 &&
      !openCards.includes(card) &&
      !matchedCards.includes(card)
    ) {
      card.textContent = card.dataset.value;
      card.classList.add("flipped");
      openCards.push(card);
    }
    if (openCards.length === 2) setTimeout(checkMatch, 600);
  }

  function checkMatch() {
    const [c1, c2] = openCards;
    if (c1.dataset.value === c2.dataset.value) {
      matchedCards.push(c1, c2);
      // ✅ CEK: semua kartu sudah cocok?
      if (matchedCards.length === shuffled.length) {
        const playerName = localStorage.getItem("playerName") || "Player";
        document.getElementById(
          "congrats"
        ).textContent = `Congratulations ${playerName}, you matched all pairs!`;
        document.getElementById("congrats").style.display = "block";
      }
    } else {
      c1.textContent = "?";
      c1.classList.remove("flipped");
      c2.textContent = "?";
      c2.classList.remove("flipped");
    }
    openCards = [];
  }
}
