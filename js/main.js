document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const navigation = document.querySelector(".nav-links");
  const currentYear = document.querySelector("#current-year");
  const pageSections = document.querySelectorAll("main section[id]");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  if (navToggle && navigation) {
    const navigationLinks = navigation.querySelectorAll("a");

    const setMenuState = (isOpen) => {
      navigation.classList.toggle("is-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggle.textContent = isOpen ? "Close" : "Menu";

      if (window.innerWidth <= 800) {
        document.body.classList.toggle("menu-open", isOpen);
      } else {
        document.body.classList.remove("menu-open");
      }
    };

    const closeMenu = () => {
      setMenuState(false);
    };

    navToggle.addEventListener("click", () => {
      const isOpen = !navigation.classList.contains("is-open");
      setMenuState(isOpen);
    });

    navigationLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (
        event.key === "Escape" &&
        navigation.classList.contains("is-open")
      ) {
        closeMenu();
        navToggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      const clickedInsideNavigation = navigation.contains(event.target);
      const clickedToggle = navToggle.contains(event.target);

      if (
        navigation.classList.contains("is-open") &&
        !clickedInsideNavigation &&
        !clickedToggle
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 800) {
        closeMenu();
      }
    });
  }

  if ("IntersectionObserver" in window && pageSections.length > 0) {
    const navigationAnchors = document.querySelectorAll(
      '.nav-links a[href^="#"]'
    );

    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const sectionId = entry.target.getAttribute("id");

          navigationAnchors.forEach((anchor) => {
            const targetId = anchor
              .getAttribute("href")
              .replace("#", "");

            if (targetId === sectionId) {
              anchor.setAttribute("aria-current", "true");
            } else {
              anchor.removeAttribute("aria-current");
            }
          });
        });
      },
      {
        root: null,
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0
      }
    );

    pageSections.forEach((section) => {
      sectionObserver.observe(section);
    });
  }
});
