let levels = document.querySelectorAll(".menu__level-list li");
levels.forEach((item) =>
  item.addEventListener("click", function () {
    for (let i = 0; i < levels.length; i++) {
      levels[i].classList.remove("active");
      item.classList.add("active");
    }
  })
);

const button = document.querySelector(".start__button");
const menu = document.querySelector(".menu");
const cardContainer = document.querySelector(".card-container");

function createCards(value) {
  for (let j = 0; j < value; j++) {
    let div = document.createElement("div");
    div.classList.add("playing-card");
    cardContainer.append(div);
  }
}

function flipCard() {
  this.classList.add("flip");
}

function flipBugCard() {
  this.classList.add("bugFlip");
  this.classList.remove("flip");
}

function disableCards(cards, bugCard) {
  cards.forEach((item) => item.removeEventListener("click", flipCard));
  bugCard.removeEventListener("click", flipBugCard);
  cards.forEach((item) => item.classList.remove("hover-three"));
  cards.forEach((item) => item.classList.remove("hover-many"));
}

button.addEventListener("click", function () {
  for (let e = 0; e < levels.length; e++) {
    if (levels[e].classList.contains("active")) {
      menu.style.display = "none";
      cardContainer.style.display = "flex";
      let value = parseInt(levels[e].dataset.value, 10);
      createCards(value);
      if (value === 10) {
        cardContainer.classList.add("container-ten");
      }

      let cards = document.querySelectorAll(".playing-card");

      if (value === 3) {
        cards.forEach((item) => item.classList.add("hover-three"));
        cardContainer.classList.add("container-three");
      }
      if (value === 6) {
        cardContainer.classList.add("container-six");
     }
      else {
        cards.forEach((item) => item.classList.add("hover-many"));
      }

      cards.forEach((item) => item.addEventListener("click", flipCard));
      let bugCard = cards[Math.floor(Math.random() * value)];

      bugCard.addEventListener("click", flipBugCard);

      let clickCounter = 0;

      cards.forEach((item) =>
        item.addEventListener("click", () => {
          disableCards(cards, bugCard);
          clickCounter++;
          if (clickCounter === 2) {
            setTimeout(() => {
              cardContainer.innerHTML = "";
              cardContainer.className = "card-container";
              cardContainer.style.display = "none";
              menu.style.display = "block";
              levels.forEach((item) => item.classList.remove("active"));
            },700);
          }
        })
      );
    }
  }
});
