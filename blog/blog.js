

(() => {
  'use strict';

  // 1) Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2) Enhance <time datetime> elements with a helpful title for assistive tech
  document.querySelectorAll('time[datetime]').forEach((t) => {
    if (!t.title) {
      const iso = t.getAttribute('datetime');
      const d = new Date(iso);
      if (!Number.isNaN(d.getTime())) {
        t.title = d.toDateString();
      }
    }
  });
})();