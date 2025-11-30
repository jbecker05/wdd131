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
  }
];

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

// -----------------------------
// Helpers
// -----------------------------

/**
 * Show a card at the given index.
 */
function showCard(index) {
  if (!cardElement || !cardFrontText || !cardBackText) return;

  const card = objectionCards[index];
  if (!card) return;

  // Always show front side when we change cards
  cardFront.hidden = false;
  cardBack.hidden = true;

  cardFrontText.textContent = card.objection;
  cardBackText.textContent = card.response;

  updateProgressMessage();
}

/**
 * Flip the card between front and back.
 */
function flipCard() {
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
}

/**
 * Move to the previous card (with wrap-around).
 */
function prevCardFn() {
  currentIndex =
    (currentIndex - 1 + objectionCards.length) % objectionCards.length;
  showCard(currentIndex);
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

  progressMessage.textContent = `
You’ve marked ${easy} as "Got it",
${review} as "Needs work",
and have ${unmarked} not marked yet.
`.trim();
}

// -----------------------------
// Event listeners (only if on index page)
// -----------------------------
if (cardElement) {
  // Initialize first card
  showCard(currentIndex);

  flipButton?.addEventListener("click", () => {
    flipCard();
  });

  nextButton?.addEventListener("click", () => {
    nextCard();
  });

  prevButton?.addEventListener("click", () => {
    prevCardFn();
  });

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