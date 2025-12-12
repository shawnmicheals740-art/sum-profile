(() => {
  const nav = document.getElementById("nav");
  const navItems = Array.from(document.querySelectorAll(".nav-item"));
  const sections = Array.from(document.querySelectorAll(".section"));
  const pinnedLabel = document.getElementById("pinnedLabel");
  const year = document.getElementById("year");

  year.textContent = new Date().getFullYear();

  let pinnedIndex = null;
  let hoverIndex = null;

  function setNavSignalStates(index) {
    navItems.forEach((btn, i) => {
      btn.classList.remove("is-current", "is-next", "is-prev");
      if (index === null) return;

      if (i === index) btn.classList.add("is-current");
      if (i === index + 1) btn.classList.add("is-next");
      if (i === index - 1) btn.classList.add("is-prev");
    });
  }

  function setRightStates(index) {
    sections.forEach((sec, i) => {
      sec.classList.remove("state-current", "state-prev", "state-next");
      if (index === null) return;

      if (i === index) sec.classList.add("state-current");
      if (i < index) sec.classList.add("state-prev");
      if (i > index) sec.classList.add("state-next");
    });
  }

  // Reveal sections 0..index with staggered flow from the right
  function revealUpTo(index) {
    sections.forEach((sec, i) => {
      // reset animation
      sec.classList.remove("flow");

      if (index === null) {
        sec.classList.remove("is-visible");
        return;
      }

      if (i <= index) {
        sec.classList.add("is-visible");

        // stagger delay for “flow”
        const delay = Math.min(i, 6) * 70; // ms
        sec.style.transitionDelay = `${delay}ms`;
        sec.style.animationDelay = `${delay}ms`;
        sec.classList.add("flow");
      } else {
        sec.style.transitionDelay = `0ms`;
        sec.style.animationDelay = `0ms`;
        sec.classList.remove("is-visible");
      }
    });
  }

  function activeIndex() {
    if (pinnedIndex !== null) return pinnedIndex;
    return hoverIndex;
  }

  function render() {
    const idx = activeIndex();
    setNavSignalStates(idx);
    setRightStates(idx);
    revealUpTo(idx);
  }

  // Hover behavior (preview)
  navItems.forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      hoverIndex = Number(btn.dataset.index);
      render();
    });

    // Click behavior (pin)
    btn.addEventListener("click", () => {
      const idx = Number(btn.dataset.index);

      if (pinnedIndex === idx) {
        pinnedIndex = null;
        pinnedLabel.textContent = "Pinned: none";
      } else {
        pinnedIndex = idx;
        pinnedLabel.textContent = `Pinned: ${btn.innerText.replace(/\s+/g, " ").trim()}`;
      }
      render();
    });
  });

  // When leaving sidebar:
  // - If pinned, keep pinned visible
  // - If not pinned, hide all sections
  nav.addEventListener("mouseleave", () => {
    hoverIndex = null;
    render();
  });

  // Start with nothing visible (as you requested)
  pinnedLabel.textContent = "Pinned: none";
  render();
})();
