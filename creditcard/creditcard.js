
(function () {
  const $ = (id) => document.getElementById(id);

  const form = $("creditCardForm");
  const number = $("cardNumber");
  const holder = $("cardHolder");
  const mm = $("expMM");
  const yy = $("expYY");
  const cvc = $("cvc");

  if (!form) return;

  // Utilities
  const onlyDigits = (s) => (s || "").replace(/\D+/g, "");

  function formatCardNumber(raw) {
    const digits = onlyDigits(raw).slice(0, 16); // cap at 16 digits
    return digits.replace(/(.{4})/g, "$1 ").trim();
  }

  function luhnCheck(num) {
    const s = onlyDigits(num);
    if (s.length !== 16) return false;
    let sum = 0;
    for (let i = 0; i < s.length; i++) {
      let digit = parseInt(s[s.length - 1 - i], 10);
      if (i % 2 === 1) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return sum % 10 === 0;
  }

  function clamp(val, min, max) {
    const n = parseInt(val, 10);
    if (Number.isNaN(n)) return NaN;
    return Math.min(Math.max(n, min), max);
  }

  // CARD NUMBER: format on input & paste
  number.addEventListener("input", (e) => {
    const start = number.selectionStart;
    const before = number.value;
    number.value = formatCardNumber(before);

    // naive caret adjustment: place at end on format change
    if (document.activeElement === number) {
      number.setSelectionRange(number.value.length, number.value.length);
    }

    // auto-advance when complete
    if (onlyDigits(number.value).length === 16) {
      holder.focus();
    }
  });

  number.addEventListener("keypress", (e) => {
    // Allow digits and control keys only
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  });

  // HOLDER: simple trim on blur
  holder.addEventListener("blur", () => {
    holder.value = holder.value.trim().replace(/\s+/g, " ");
  });

  // EXPIRATION: allow only digits, auto-advance
  function twoDigitInput(el) {
    el.addEventListener("input", () => {
      el.value = onlyDigits(el.value).slice(0, 2);
    });
    el.addEventListener("keypress", (e) => {
      if (!/[0-9]/.test(e.key)) e.preventDefault();
    });
  }
  twoDigitInput(mm);
  twoDigitInput(yy);

  // Smart month handling & focus advance
  mm.addEventListener("input", () => {
    // If first digit > 1, prefix 0 automatically (e.g., 9 → 09)
    const d = onlyDigits(mm.value);
    if (d.length === 1 && parseInt(d, 10) > 1) {
      mm.value = "0" + d;
    }
    if (mm.value.length === 2) {
      const m = clamp(mm.value, 1, 12);
      mm.value = String(m).padStart(2, "0");
      yy.focus();
    }
  });

  // Auto-advance to CVC when YY complete
  yy.addEventListener("input", () => {
    if (yy.value.length === 2) cvc.focus();
  });

  // CVC: 3–4 digits only
  cvc.addEventListener("input", () => {
    cvc.value = onlyDigits(cvc.value).slice(0, 4);
  });
  cvc.addEventListener("keypress", (e) => {
    if (!/[0-9]/.test(e.key)) e.preventDefault();
  });

  // SUBMIT VALIDATION
  form.addEventListener("submit", (e) => {
    const problems = [];

    const numDigits = onlyDigits(number.value);
    if (numDigits.length !== 16) {
      problems.push("Card number must be 16 digits.");
    } else if (!luhnCheck(numDigits)) {
      problems.push("Card number is not valid (Luhn check failed).");
    }

    if (!holder.value.trim()) {
      problems.push("Cardholder name is required.");
    }

    const mmVal = parseInt(mm.value, 10);
    const yyVal = parseInt(yy.value, 10);
    if (!(mmVal >= 1 && mmVal <= 12) || Number.isNaN(mmVal)) {
      problems.push("Expiration month must be between 01 and 12.");
    }

    // Interpret YY as 20YY (e.g., 25 → 2025)
    const now = new Date();
    const currentYY = now.getFullYear() % 100;
    const fullYear = Number.isNaN(yyVal) ? NaN : 2000 + yyVal;

    if (Number.isNaN(yyVal)) {
      problems.push("Expiration year is required.");
    } else {
      // Not expired check (end of month)
      const expDate = new Date(fullYear, (mmVal || 1) - 1, 1);
      // set to last day of the month 23:59:59
      expDate.setMonth(expDate.getMonth() + 1);
      expDate.setDate(0);
      expDate.setHours(23, 59, 59, 999);
      if (Date.now() > expDate.getTime()) {
        problems.push("This card is expired.");
      }
      // Optional: disallow absurdly far past 50 years or > 20y in future
      if (yyVal < currentYY - 50) problems.push("Expiration year looks incorrect.");
      if (yyVal > currentYY + 20) problems.push("Expiration year is too far in the future.");
    }

    const cvcDigits = onlyDigits(cvc.value);
    if (!(cvcDigits.length === 3 || cvcDigits.length === 4)) {
      problems.push("CVC must be 3 or 4 digits.");
    }

    if (problems.length) {
      e.preventDefault();
      alert("Please fix the following issues before submitting:\n\n• " + problems.join("\n• "));
      return;
    }
  });
})();
