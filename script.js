const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.querySelector(".sr-only").textContent = isOpen ? "Abrir menú" : "Cerrar menú";
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.querySelector(".sr-only").textContent = "Abrir menú";
      navigation.classList.remove("is-open");
    });
  });
}

const root = document.documentElement;
let ticking = false;

function updateRoute() {
  const scrollable = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
  const progress = Math.min(Math.max(scrollY / scrollable, 0), 1);
  root.style.setProperty("--scroll-route", `${18 + progress * 64}%`);
  root.style.setProperty("--route-width", `${Math.max(10, progress * 100)}%`);
  ticking = false;
}

addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(updateRoute);
    ticking = true;
  }
}, { passive: true });

updateRoute();
