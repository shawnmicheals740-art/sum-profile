const tabs = [...document.querySelectorAll(".tab")];
const stations = [...document.querySelectorAll(".station")];
const badge = document.getElementById("panelBadge");
const title = document.getElementById("panelTitle");
const pinned = document.getElementById("pinnedLabel");

const badgeText = {
  "Station Master / Welcome": "WELCOME · OVERVIEW",
  "The Train Schedule": "SCHEDULE · EXPERIENCE",
  "The Engine Room": "SKILLS · SYSTEMS",
  "The Freight Car": "PROJECTS · ASSETS",
  "The Journey Log": "EDUCATION · CERTS",
  "Ticket Counter": "CONTACT · FINAL STOP",
};

// dot order is: [RED, YELLOW, GREEN]
function setTabSignal(tab, state) {
  const dots = tab.querySelectorAll(".dot");

  // reset all to OFF first
  dots.forEach(d => d.classList.remove("on-red", "on-yellow", "on-green"));

  if (state === "red") dots[0].classList.add("on-red");
  if (state === "yellow") dots[1].classList.add("on-yellow");
  if (state === "green") dots[2].classList.add("on-green");
}

function setBadgeGlow(state) {
  badge.classList.remove("glow-red", "glow-yellow", "glow-green");
  if (state === "red") badge.classList.add("glow-red");
  if (state === "yellow") badge.classList.add("glow-yellow");
  if (state === "green") badge.classList.add("glow-green");
}

// RULES YOU ASKED:
// - First visit: all tabs green
// - When activeIndex changes:
//   - active: green
//   - active-1: red
//   - active-2: yellow
//   - others: green
function applyTrackSignals(activeIndex) {
  tabs.forEach((tab, i) => {
    let state = "green";

    if (activeIndex === 0) {
      state = "green";
    } else {
      if (i === activeIndex) state = "green";
      else if (i === activeIndex - 1) state = "red";
      else if (i === activeIndex - 2) state = "yellow";
      else state = "green";
    }

    setTabSignal(tab, state);
  });
}

function openStationByIndex(activeIndex) {
  // left active pop effect
  tabs.forEach(t => t.classList.remove("is-active"));
  tabs[activeIndex].classList.add("is-active");

  const section = tabs[activeIndex].dataset.section;

  // right content
  stations.forEach(s => s.classList.toggle("is-open", s.dataset.station === section));

  // header
  title.textContent = section;
  pinned.textContent = section;
  badge.textContent = badgeText[section] || "";

  // glow matches CURRENT state (always green in your logic)
  setBadgeGlow("green");

  // apply signal states across all tabs
  applyTrackSignals(activeIndex);
}

// INIT (first visit): all green, open first section
openStationByIndex(0);

// clicks
tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => openStationByIndex(index));
});
