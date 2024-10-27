document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".section");
  const arrows = document.querySelectorAll(".scroll-arrow");
  let previousSectionId = "title";

  function hideAllSections() {
    sections.forEach((section) => {
      section.style.display = "none";
    });
  }

  function showSection(section, direction) {
    section.style.display = "flex";
    section.classList.add("active");

    if (direction === "next") {
      section.classList.add("slide-in-bottom");
    } else if (direction === "previous") {
      section.classList.add("slide-in-top");
    }

    section.addEventListener(
      "animationend",
      () => {
        section.classList.remove("slide-in-bottom", "slide-in-top");
      },
      { once: true }
    );
  }

  // Initialize visibility
  hideAllSections();
  showSection(document.getElementById("title"), "next");

  // Event listeners for arrows
  arrows.forEach((arrow) => {
    arrow.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = arrow.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      const direction = previousSectionId < targetId ? "next" : "previous";
      previousSectionId = targetId;

      hideAllSections();
      showSection(targetSection, direction);
      updateArrowVisibility(targetId);
    });
  });

  // Event listeners for game buttons
  document.getElementById("startDyslexiaGame").addEventListener("click", () => {
    fadeTransition("dyslexia-game");
  });

  document
    .getElementById("startDyscalculiaGame")
    .addEventListener("click", () => {
      fadeTransition("dyscalculia-game");
    });

  // Fade transition function
  function fadeTransition(targetId) {
    hideAllSections();
    const targetSection = document.getElementById(targetId);
    targetSection.style.opacity = "0";
    targetSection.style.display = "flex";

    setTimeout(() => {
      targetSection.style.opacity = "1";
    }, 100);
  }

  function updateArrowVisibility(activeSectionId) {
    arrows.forEach((arrow) => {
      const targetId = arrow.getAttribute("href").substring(1);
      if (activeSectionId === "title" && arrow.classList.contains("previous")) {
        arrow.style.display = "none";
      } else if (
        activeSectionId === "dyscalculia-game" &&
        arrow.classList.contains("next")
      ) {
        arrow.style.display = "none";
      } else {
        arrow.style.display = "";
      }
    });
  }

  updateArrowVisibility("title");
});
