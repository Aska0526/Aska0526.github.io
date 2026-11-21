// Keep the footer year current without adding a build step.
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// A small, keyboard-friendly photo stack for the portrait, cats, and travel map.
const carousel = document.getElementById("profile-carousel");
if (carousel) {
  const slides = [...carousel.querySelectorAll(".photo-slide")];
  const buttons = [...carousel.querySelectorAll("[data-slide-to]")];
  const stepButtons = [...carousel.querySelectorAll("[data-slide-step]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let active = 0;
  let timer;

  function showSlide(index) {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === active);
      slide.setAttribute("aria-hidden", String(i !== active));
    });
    buttons.forEach((button, i) => button.setAttribute("aria-pressed", String(i === active)));
  }

  function stopRotation() {
    window.clearInterval(timer);
    timer = undefined;
  }

  function startRotation() {
    if (reducedMotion || timer || document.hidden) return;
    timer = window.setInterval(() => showSlide(active + 1), 6000);
  }

  function chooseSlide(index) {
    showSlide(index);
    stopRotation();
    startRotation();
  }

  buttons.forEach((button) => {
    button.addEventListener("click", () => chooseSlide(Number(button.dataset.slideTo)));
  });
  stepButtons.forEach((button) => {
    button.addEventListener("click", () => chooseSlide(active + Number(button.dataset.slideStep)));
  });

  carousel.addEventListener("mouseenter", stopRotation);
  carousel.addEventListener("mouseleave", startRotation);
  carousel.addEventListener("focusin", stopRotation);
  carousel.addEventListener("focusout", (event) => {
    if (!carousel.contains(event.relatedTarget)) startRotation();
  });
  document.addEventListener("visibilitychange", () => document.hidden ? stopRotation() : startRotation());
  showSlide(0);
  startRotation();
}

// Follow the device appearance by default; keep an explicit choice for next time.
const themeToggle = document.getElementById("theme-toggle");
const root = document.documentElement;
const themeColor = document.querySelector('meta[name="theme-color"]');
if (themeToggle) {
  function setTheme(theme, save = false) {
    root.dataset.theme = theme;
    const dark = theme === "dark";
    themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.setAttribute("title", dark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.setAttribute("aria-pressed", String(dark));
    if (themeColor) themeColor.setAttribute("content", dark ? "#171a17" : "#f8f7f2");
    if (save) {
      try { localStorage.setItem("theme", theme); } catch {}
    }
  }
  setTheme(root.dataset.theme || "light");
  themeToggle.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
  });
}
