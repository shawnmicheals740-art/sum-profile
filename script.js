// Signal state rules (exactly as you described):
// - First visit: all GREEN
// - When current = index i:
//    tab i = GREEN
//    tab i-1 = RED
//    tabs < i-1 = YELLOW
//    tabs > i = GREEN

const tabs = Array.from(document.querySelectorAll(".tab"));
const emptyState = document.getElementById("emptyState");
const contentCard = document.getElementById("contentCard");

const panelTitle = document.getElementById("panelTitle");
const panelBadge = document.getElementById("panelBadge");

const stationKicker = document.getElementById("stationKicker");
const stationHeading = document.getElementById("stationHeading");

const welcomeBlock = document.getElementById("welcomeBlock");
const genericBlock = document.getElementById("genericBlock");

// Right-side labels per section
const KICKERS = {
  "Welcome": "WELCOME · OVERVIEW",
  "The Train Schedule": "SCHEDULE · EXPERIENCE",
  "The Engine Room": "ENGINE ROOM · SKILLS",
  "The Freight Car": "FREIGHT CAR · PROJECTS",
  "The Journey Log": "JOURNEY LOG · EDUCATION",
  "Ticket Counter": "TICKET COUNTER · CONTACT"
};

// Turn ALL tabs to GREEN on first load (only green dot ON)
function setAllGreen() {
  tabs.forEach(tab => setSignal(tab, "green"));
}

// Set ONE dot ON per tab (green dot OR yellow dot OR red dot)
function setSignal(tab, color) {
  const g = tab.querySelector(".dot-g");
  const y = tab.querySelector(".dot-y");
  const r = tab.querySelector(".dot-r");

  g.classList.remove("on");
  y.classList.remove("on");
  r.classList.remove("on");

  if (color === "green") g.classList.add("on");
  if (color === "yellow") y.classList.add("on");
  if (color === "red") r.classList.add("on");
}

// Apply dynamic scaling logic based on selected index
function applySignalLogic(currentIndex) {
  tabs.forEach((tab, idx) => {
    if (idx === currentIndex) {
      setSignal(tab, "green");
      return;
    }
    if (idx === currentIndex - 1) {
      setSignal(tab, "red");
      return;
    }
    if (idx < currentIndex - 1) {
      setSignal(tab, "yellow");
      return;
    }
    // future or not visited yet
    setSignal(tab, "green");
  });
}

function openSection(sectionName) {
  const idx = tabs.findIndex(t => t.dataset.section === sectionName);

  // Left active style
  tabs.forEach(t => t.classList.remove("is-active"));
  if (idx >= 0) tabs[idx].classList.add("is-active");

  // Signals
  applySignalLogic(idx);

  // Right: show card (hidden initially)
  emptyState.style.display = "none";
  contentCard.hidden = false;

  // Right: update heading + kicker + badge
  panelTitle.textContent = sectionName;
  stationHeading.textContent = sectionName;
  stationKicker.textContent = KICKERS[sectionName] || "SECTION";

  // badge always “green glow” for the active section (futuristic look)
  panelBadge.textContent = (KICKERS[sectionName] || "READY");
  panelBadge.classList.add("glow-green");

  // If welcome, show welcome copy, else show placeholder until we fill next
  if (sectionName === "Welcome") {
    welcomeBlock.hidden = false;
    genericBlock.hidden = true;
  } else {
    welcomeBlock.hidden = true;
    genericBlock.hidden = false;
  }

  // Re-trigger animation cleanly
  contentCard.style.animation = "none";
  // force reflow
  void contentCard.offsetWidth;
  contentCard.style.animation = "";
}

// INIT
setAllGreen();
panelBadge.classList.add("glow-green");

// Click handlers
tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    openSection(tab.dataset.section);
  });
});
