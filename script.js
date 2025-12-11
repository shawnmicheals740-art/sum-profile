// Railway signal hover logic
const tabs = Array.from(document.querySelectorAll(".rail-tab"));
const sections = Array.from(document.querySelectorAll(".section"));

// reset all tabs to default state
function resetTabs() {
  tabs.forEach((tab) => {
    tab.classList.remove("current", "next", "previous");
  });
}

// apply signal states around the hovered tab
function setSignalState(index) {
  resetTabs();

  const current = tabs[index];
  if (!current) return;

  current.classList.add("current");

  const previous = tabs[index - 1];
  if (previous) previous.classList.add("previous");

  const next = tabs[index + 1];
  if (next) next.classList.add("next");
}

// attach hover listeners
tabs.forEach((tab, index) => {
  tab.addEventListener("mouseenter", () => {
    setSignalState(index);
  });

  tab.addEventListener("focus", () => {
    setSignalState(index);
  });

  tab.addEventListener("click", () => {
    const targetId = tab.getAttribute("data-target");
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// initial state: highlight first tab
setSignalState(0);
