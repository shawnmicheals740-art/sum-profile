(() => {
  const navItems = Array.from(document.querySelectorAll(".nav-item"));
  const panels = Array.from(document.querySelectorAll(".panel"));
  const pinLabel = document.getElementById("pinLabel");

  let pinnedIndex = null;   // click-to-pin
  let hoverIndex = null;    // hover temporary

  // Apply “signal states” to nav items (prev / current / next)
  function paintSignals(activeIndex) {
    navItems.forEach((btn, i) => {
      btn.classList.remove("state-prev", "state-current", "state-next");
      const lamps = btn.querySelectorAll(".lamp");
      lamps.forEach(l => l.classList.remove("on"));

      if (activeIndex === null || activeIndex === undefined) return;

      if (i === activeIndex) {
        btn.classList.add("state-current");
        btn.querySelector(".lamp.amber").classList.add("on");
      } else if (i === activeIndex - 1) {
        btn.classList.add("state-prev");
        btn.querySelector(".lamp.red").classList.add("on");
      } else if (i === activeIndex + 1) {
        btn.classList.add("state-next");
        btn.querySelector(".lamp.green").classList.add("on");
      }
    });

    // pinned outline
    navItems.forEach((btn, i) => {
      btn.classList.toggle("is-pinned", pinnedIndex === i);
    });
  }

  // Show panels cumulatively from 0..activeIndex with a nice stagger slide-in
  function showPanels(activeIndex) {
    panels.forEach((p, i) => {
      p.classList.remove("is-visible");
      p.style.transitionDelay = "0ms";
    });

    if (activeIndex === null || activeIndex === undefined) return;

    // reveal 0..activeIndex
    let delay = 0;
    for (let i = 0; i <= activeIndex; i++) {
      const p = panels[i];
      if (!p) continue;
      p.classList.add("is-visible");
      p.style.transitionDelay = `${delay}ms`;
      delay += 70; // stagger amount
    }
  }

  function setActive(index, source = "hover") {
    if (source === "hover") hoverIndex = index;
    const active = (hoverIndex !== null && hoverIndex !== undefined) ? hoverIndex : pinnedIndex;
    paintSignals(active);
    showPanels(active);
  }

  function clearHover() {
    hoverIndex = null;
    const active = pinnedIndex;
    paintSignals(active);
    showPanels(active);
  }

  function setPinned(index) {
    if (pinnedIndex === index) {
      pinnedIndex = null;
      pinLabel.textContent = "none";
    } else {
      pinnedIndex = index;
      pinLabel.textContent = navItems[index]?.innerText?.trim() || `Station ${index + 1}`;
    }
    // after pin action, hover is cleared so pinned takes effect
    hoverIndex = null;
    paintSignals(pinnedIndex);
    showPanels(pinnedIndex);
  }

  // Events
  navItems.forEach((btn) => {
    const index = Number(btn.dataset.index);

    btn.addEventListener("mouseenter", () => setActive(index, "hover"));
    btn.addEventListener("mouseleave", () => {
      // If user moves from one button to another quickly, mouseleave fires often.
      // We'll clear hover only if the new hovered button doesn't immediately replace it.
      // (Small timeout keeps it smooth.)
      setTimeout(() => {
        // if nothing else hovered, revert to pinned
        if (!navItems.some(b => b.matches(":hover"))) clearHover();
      }, 20);
    });

    // Click to pin (also great for mobile where hover doesn't exist)
    btn.addEventListener("click", () => setPinned(index));

    // Keyboard access
    btn.addEventListener("focus", () => setActive(index, "hover"));
    btn.addEventListener("blur", () => {
      setTimeout(() => {
        if (!navItems.some(b => b.matches(":focus"))) clearHover();
      }, 20);
    });
  });

  // Initial state: show first panel (or none if you prefer)
  // If you want NOTHING visible until hover/click, setPinned(null) and clearHover().
  setPinned(0); // default pinned “Welcome”
})();
