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

button.addEventListener("click", function () {
  for (let e = 0; e < levels.length; e++) {
    if (levels[e].classList.contains("active")) {
      menu.style.display = "none";
      cardContainer.style.display = "flex";
      let value = parseInt(levels[e].dataset.value, 10);
      createCards(value);
      if (value === 10) {
        cardContainer.style.width = "90vw";
      }

      let cards = document.querySelectorAll(".playing-card");

      value === 3
        ? cards.forEach((item) => item.classList.add("hover-three"))
        : cards.forEach((item) => item.classList.add("hover-many")); // в макете разные ховеры для экранов на 3 карты и н 6-10 карт

      function flipCard() {
        this.classList.add("flip");
      };
      cards.forEach((item) => item.addEventListener("click", flipCard));
      let bugCard = cards[Math.floor(Math.random() * value)];
      function flipBugCard () {
        bugCard.classList.add("bugFlip");
        bugCard.classList.remove("flip");
      };

      bugCard.addEventListener("click", flipBugCard);

      function disableCards() {
        cards.forEach((item) => item.removeEventListener("click", flipCard));
        bugCard.removeEventListener("click", flipBugCard);
        cards.forEach((item) => item.classList.remove("hover-three"));
        cards.forEach((item) => item.classList.remove("hover-many"));
      };

      let clickCounter = 0;

      cards.forEach((item) => item.addEventListener("click", () => {
        disableCards();
        clickCounter++;
        if (clickCounter === 2) {
          setTimeout(() => window.location.reload(), 700);
        };
      }));
    };
  };
});
