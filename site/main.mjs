// main.mjs
// Simple sales objection flashcard trainer + shared footer year

// -----------------------------
// Data: objection flashcards
// -----------------------------
const objectionCards = [
  {
    id: 1,
    category: "Money & price",
    objection: "I need to talk to my wife first.",
    response:
      "Totally understand. A lot of my customers like to talk it over with their spouse first. So we make the most of your time here, what questions do you think your wife will ask so you can walk out with all the answers ready?"
  },
  {
    id: 2,
    category: "Money & price",
    objection: "It’s too expensive.",
    response:
      "I hear you. Nobody wants to overpay. If we look past the upfront price for a second, this actually saves you money if something goes wrong. For example, if your screen cracked just once, the repair alone would cost more than this whole protection plan."
  },
  {
    id: 3,
    category: "Money & price",
    objection: "Let me think about it.",
    response:
      "For sure, it’s an important decision. When people tell me they want to think about it, it’s usually because they’re unsure about one or two things. If you had to pick, what’s the biggest question still in your mind so I can clear that up before you go?"
  },
  {
    id: 4,
    category: "Trust & timing",
    objection: "I don’t really need that.",
    response:
      "You might be right, and I never want to push anything you don’t need. Most people who choose this didn’t think they’d need it either—they just wanted to be covered if something happened. Would it be okay if I showed you the top two things this protects you from?"
  },
  {
    id: 5,
    category: "Trust & timing",
    objection: "Can I come back later?",
    response:
      "You’re always welcome to come back. The only reason people usually handle it now is because they’re already here and it saves them an extra trip. If we could make this quick and simple, would there be any other reason not to get it taken care of today?"
  },
  {
    id: 6,
    category: "Money & price",
    objection: "I can probably find it cheaper online.",
    response:
      "You might be able to, and I always respect people who want to save money. The main difference here is that you’re getting it set up correctly today, with someone you can come back to if there’s an issue. If the price were close and the service was better here, would it still make sense to go online?"
  },
  {
    id: 7,
    category: "Need & fit",
    objection: "I’m really careful with my phone, I don’t break them.",
    response:
      "That’s awesome, and it already puts you ahead of most people. The plan isn’t really for what you expect to happen—it’s for the one time something random happens, like a drop in the parking lot or a kid grabbing it. If that worst-case scenario did happen once in the next couple of years, would you rather pay out of pocket or have it covered?"
  },
  {
    id: 8,
    category: "Need & fit",
    objection: "I’ve never needed this kind of thing before.",
    response:
      "Totally fair. A lot of people who get this have never needed it before either—they just like knowing that if this is the one time they do, they’re covered. If this turns out to be the one device that does have an issue, would you want that backup in place or not really?"
  },
  {
    id: 9,
    category: "Trust & timing",
    objection: "I don’t like making decisions on the spot.",
    response:
      "I get that. Nobody wants to feel rushed. My goal isn’t to pressure you, it’s to make sure you’ve got all the info so whatever decision you make feels solid. What would you need to know right now to feel comfortable either saying yes or no today?"
  },
  {
    id: 10,
    category: "Trust & timing",
    objection: "Can you just give me a brochure or something?",
    response:
      "I can definitely give you info to take with you. The tricky part is most people don’t come back, even when they mean to, and then if something happens they wish they’d just handled it while they were here. If we walked through the key points together now and answered your questions, would that help you decide today instead of pushing it off?"
  }
];

// Example array method usage (for WDD 131 requirement):
// Build a list of unique categories from the objections.
const objectionCategories = [...new Set(objectionCards.map(card => card.category))];
// (We could log this or use it later if needed.)
console.log("Objection categories:", objectionCategories);

// -----------------------------
// State
// -----------------------------
let currentIndex = 0;

// Track how many cards are marked as “Got it” vs “Needs work”
const stats = {
  easy: 0,
  review: 0
};

// Track per-card status so we don’t double-count
// Map<cardId, "easy" | "review">
const statusById = new Map();

// -----------------------------
// DOM lookups (index.html only)
// -----------------------------
const cardElement = document.querySelector("#card");
const cardInner = cardElement?.querySelector(".card-inner");
const cardFront = cardElement?.querySelector(".card-front");
const cardBack = cardElement?.querySelector(".card-back");
const cardFrontText = cardElement?.querySelector(".card-front .card-text");
const cardBackText = cardElement?.querySelector(".card-back .card-text");

const prevButton = document.querySelector("#prevCard");
const nextButton = document.querySelector("#nextCard");
const flipButton = document.querySelector("#flipCard");

const markEasyButton = document.querySelector("#markEasy");
const markReviewButton = document.querySelector("#markReview");
const progressMessage = document.querySelector("#progressMessage");
const themeToggle = document.querySelector("#themeToggle");

// -----------------------------
// Helpers
// -----------------------------

function showCard(index) {
  if (!cardElement || !cardFrontText || !cardBackText || !cardFront || !cardBack) return;

  const card = objectionCards[index];
  if (!card) return;

  cardElement.classList.remove("is-flipped");
  cardElement.classList.remove("slide-next", "slide-prev");

  cardFront.hidden = false;
  cardBack.hidden = true;

  cardFrontText.textContent = card.objection;
  cardBackText.textContent = card.response;

  updateProgressMessage();
}

function triggerSlideAnimation(direction) {
  if (!cardElement) return;

  const className = direction === "prev" ? "slide-prev" : "slide-next";
  cardElement.classList.remove("slide-next", "slide-prev");
  void cardElement.offsetWidth;
  cardElement.classList.add(className);
}

/**
 * Flip the card between front and back.
 */
function flipCard() {
  if (!cardElement) return;

  // If we have 3D structure (card-inner), use class-based flip
  if (cardInner) {
    cardElement.classList.toggle("is-flipped");
    return;
  }

  // Fallback: simple front/back hide-show (current behavior)
  if (!cardFront || !cardBack) return;
  const isFrontVisible = !cardFront.hidden;
  cardFront.hidden = isFrontVisible;
  cardBack.hidden = !isFrontVisible;
}

/**
 * Move to the next card (with wrap-around).
 */
function nextCard() {
  currentIndex = (currentIndex + 1) % objectionCards.length;
  showCard(currentIndex);
  triggerSlideAnimation("next");
}

/**
 * Move to the previous card (with wrap-around).
 */
function prevCardFn() {
  currentIndex =
    (currentIndex - 1 + objectionCards.length) % objectionCards.length;
  showCard(currentIndex);
  triggerSlideAnimation("prev");
}

/**
 * Mark the current card as "easy" or "review"
 * and update the stats.
 */
function markCard(status) {
  if (!cardElement) return;
  const card = objectionCards[currentIndex];
  if (!card) return;

  const previousStatus = statusById.get(card.id);

  // If they click the same status again, do nothing
  if (previousStatus === status) {
    updateProgressMessage();
    return;
  }

  // Adjust counters based on previous status
  if (previousStatus === "easy") {
    stats.easy = Math.max(0, stats.easy - 1);
  } else if (previousStatus === "review") {
    stats.review = Math.max(0, stats.review - 1);
  }

  // Apply new status
  if (status === "easy") {
    stats.easy += 1;
  } else if (status === "review") {
    stats.review += 1;
  }

  statusById.set(card.id, status);
  updateProgressMessage();
}

/**
 * Update the progress message under the buttons.
 */
function updateProgressMessage() {
  if (!progressMessage) return;

  const total = objectionCards.length;
  const { easy, review } = stats;
  const unmarked = Math.max(0, total - (easy + review));

  progressMessage.textContent = `You’ve marked ${easy} as "Got it", ${review} as "Needs work", and have ${unmarked} not marked yet.`;
}

// -----------------------------
// Event listeners (only if on index page)
// -----------------------------
if (cardElement) {
  // Initialize first card
  showCard(currentIndex);

  // Flip button
  flipButton?.addEventListener("click", () => {
    flipCard();
  });

  // Also flip when clicking directly on the card (Quizlet-style)
  cardElement.addEventListener("click", (event) => {
    // Avoid flipping if the user clicked one of the control buttons outside the card
    // (Our buttons are outside, so this is mostly just future-proofing.)
    flipCard();
  });

  // Navigation buttons
  nextButton?.addEventListener("click", () => {
    nextCard();
  });

  prevButton?.addEventListener("click", () => {
    prevCardFn();
  });

  // Progress buttons
  markEasyButton?.addEventListener("click", () => {
    markCard("easy");
  });

  markReviewButton?.addEventListener("click", () => {
    markCard("review");
  });
}

// -----------------------------
// Shared: current year in footer
// -----------------------------
(function updateFooterYear() {
  const yearSpan = document.querySelector("#currentYear");
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }
})();
// -----------------------------
// Theme toggle (light / dark)
// -----------------------------
const THEME_KEY = "salesTrainerTheme";

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark-mode");
  } else {
    document.body.classList.remove("dark-mode");
  }
}

// Initialize theme from localStorage, default to light
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme === "dark" || savedTheme === "light") {
  applyTheme(savedTheme);
} else {
  applyTheme("light");
}

if (themeToggle) {
  const updateToggleUI = () => {
    const isDark = document.body.classList.contains("dark-mode");
    themeToggle.textContent = isDark ? "☀️" : "🌙";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );
  };

  updateToggleUI();

  themeToggle.addEventListener("click", () => {
    const isDarkNow = !document.body.classList.contains("dark-mode");
    applyTheme(isDarkNow ? "dark" : "light");
    localStorage.setItem(THEME_KEY, isDarkNow ? "dark" : "light");
    updateToggleUI();
  });
}

// -----------------------------
// Smooth scrolling for in-page links
// -----------------------------
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});