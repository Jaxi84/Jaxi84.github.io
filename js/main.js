document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".nav-links");
  const navigationLinks = navigation.querySelectorAll("a");
  const currentYear = document.querySelector("#current-year");
  
  // Aseta nykyinen vuosi footeriin
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
  
  // Mobiilivalikon avaus / sulku
  if (navToggle && navigation) {
    navToggle.addEventListener("click", () => {
      const isOpen = navigation.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.textContent = isOpen ? "Close" : "Menu";
    });
    
    // Sulje valikko kun linkkiä klikataan
    navigationLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navigation.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.textContent = "Menu";
      });
    });
  }
});
