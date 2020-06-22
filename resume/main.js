let links = document.querySelectorAll(".links a");
let content = document.querySelector(".content");
let fill = document.querySelector(".fill");

for (let link of links) {
  link.addEventListener("click", (e) => {
    fill.style.width =
      ((e.target.getBoundingClientRect().width / 2 +
        e.target.getBoundingClientRect().x) *
        100) /
        document.documentElement.clientWidth +
      "%";

    switch (e.target.classList.value) {
      case "b1":
        content.style.transform = "translateX(0%)";
        break;
      case "b2":
        content.style.transform = "translateX(-100%)";
        break;
      case "b3":
        content.style.transform = "translateX(-200%)";
        break;
      case "b4":
        content.style.transform = "translateX(-300%)";
        break;
      case "b5":
        content.style.transform = "translateX(-400%)";
        break;
      case "b6":
        content.style.transform = "translateX(-500%)";
        break;
      default:
        content.style.transform = "translateX(0%)";
    }
  });
}
