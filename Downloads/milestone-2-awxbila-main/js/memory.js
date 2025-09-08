const grid = document.getElementById("grid");
const icons = ["🍎", "🍌", "🍇", "🍉", "🍎", "🍌", "🍇", "🍉"];
let shuffled = icons.sort(() => 0.5 - Math.random());
let flipped = [];
let matched = [];

shuffled.forEach((icon, i) => {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.value = icon;
  card.textContent = "?";
  card.addEventListener("click", () => flipCard(card));
  grid.appendChild(card);
});

function flipCard(card) {
  if (
    flipped.length < 2 &&
    !flipped.includes(card) &&
    !matched.includes(card)
  ) {
    card.textContent = card.dataset.value;
    card.classList.add("flipped");
    flipped.push(card);
  }
  if (flipped.length === 2) {
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [c1, c2] = flipped;
  if (c1.dataset.value === c2.dataset.value) {
    matched.push(c1, c2);
  } else {
    c1.textContent = "?";
    c1.classList.remove("flipped");
    c2.textContent = "?";
    c2.classList.remove("flipped");
  }
  flipped = [];
}
