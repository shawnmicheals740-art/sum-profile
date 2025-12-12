(() => {
  const nav = document.getElementById("nav");
  const items = Array.from(nav.querySelectorAll(".nav-item"));

  const stage = document.getElementById("stage");
  const stations = Array.from(stage.querySelectorAll(".station"));

  const plate = document.getElementById("plate");
  const rightTitle = document.getElementById("rightTitle");
  const pinnedText = document.getElementById("pinnedText");

  // helper: clear classes
  function clearSignals() {
    items.forEach(btn => {
      btn.classList.remove("is-current","is-next","is-prev","is-pinned");
    });
  }

  function showStation(targetId) {
    stations.forEach(s => {
      const isMatch = s.getAttribute("data-id") === targetId;
      s.classList.toggle("active", isMatch);
    });
  }

  function setPlateMode(mode) {
    plate.classList.remove("mode-yellow","mode-green","mode-red");
    plate.classList.add(mode);
  }

  function setPinned(index) {
    clearSignals();

    const prev = index - 1;
    const next = index + 1;

    // current
    items[index].classList.add("is-current","is-pinned");

    // prev/next
    if (prev >= 0) items[prev].classList.add("is-prev");
    if (next < items.length) items[next].classList.add("is-next");

    // plate text and illumination follow CURRENT = yellow
    const plateText = items[index].dataset.plate || "WELCOME • OVERVIEW";
    plate.textContent = plateText;
    setPlateMode("mode-yellow");

    // right title from label
    const label = items[index].querySelector(".nav-label")?.textContent?.trim() || "Station";
    rightTitle.textContent = label.includes("/") ? label.split("/")[0].trim() : label;

    // pinned tip text
    pinnedText.textContent = `Pinned: ${label}`;

    // show correct section
    const target = items[index].dataset.target;
    showStation(target);
  }

  // init
  let activeIndex = 0;
  setPinned(activeIndex);

  // click behavior (pin)
  nav.addEventListener("click", (e) => {
    const btn = e.target.closest(".nav-item");
    if (!btn) return;

    const idx = items.indexOf(btn);
    if (idx === -1) return;

    activeIndex = idx;
    setPinned(activeIndex);
  });

  // Optional: hover preview without losing pinned state
  nav.addEventListener("mouseover", (e) => {
    const btn = e.target.closest(".nav-item");
    if (!btn) return;
    const idx = items.indexOf(btn);
    if (idx === -1) return;

    // keep pinned, but give subtle preview on hover by temporarily marking signals
    clearSignals();

    const prev = idx - 1;
    const next = idx + 1;

    items[idx].classList.add("is-current");
    if (prev >= 0) items[prev].classList.add("is-prev");
    if (next < items.length) items[next].classList.add("is-next");

    // keep pinned pop on the pinned tab always
    items[activeIndex].classList.add("is-pinned");

    // plate shows hover section text but stays “yellow” futuristic
    const plateText = btn.dataset.plate || "WELCOME • OVERVIEW";
    plate.textContent = plateText;
    setPlateMode("mode-yellow");
  });

  nav.addEventListener("mouseleave", () => {
    // restore pinned signals and plate
    setPinned(activeIndex);
  });
})();
