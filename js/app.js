const draw = document.querySelector("[data-draw]");
const info = document.querySelector("[data-info]");
const contacts = document.querySelector("[data-contacts]");

info.addEventListener("click", () => {
  infoModal = createModalController({
    title: "Information",
    text: [
      "Небольшой  бестиарий,посвященный творчеству Говарда Лавкрафта",
      "Динамическое построение HTML,модалки"
    ]
  });
  infoModal.open();
});

contacts.addEventListener("click", () => {
  contactModal = createModalController({
    title: "Contacts",
    text: [
      "Портфолио: https://zloybatarejka.github.io/portofolio/",
      "Email: zshon@yandex.ru",
      "Telegram: https://t.me/zloyshon"
    ]
  });
  contactModal.open();
});
draw.addEventListener("click", () => {
  if (document.querySelector(`[data-choise="main"]`)) {
    undrawMainChoise();
    setTimeout(() => {
      drawMain();
    }, ANIMATION_SPEED);
  } else {
    drawMain();
  }
});
window.onload = drawMain;
