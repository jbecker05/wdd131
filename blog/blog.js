(() => {
  'use strict';

  // Articles data (provided by assignment)
  const articles = [
    {
      id: 1,
      title: 'Septimus Heap Book One: Magyk',
      date: 'July 5, 2022',
      description:
        'If you enjoy stories about seventh sons of seventh sons and magyk this is the book for you.',
      imgSrc: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Magkycover2.jpg',
      imgAlt: 'Book cover for Septimus Heap 1',
      ages: '10-14',
      genre: 'Fantasy',
      stars: '****'
    },
    {
      id: 2,
      title: 'Magnus Chase Book One: Sword of Summer',
      date: 'December 12, 2021',
      description:
        'The anticipated new novel by Rick Riordan. After Greek mythology (Percy Jackson), Greek/Roman (Heroes of Olympus), and Egyptian (Kane Chronicles), Rick decides to try his hand with Norse Mythology, and the end result is good.',
      imgSrc:
        'https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300',
      imgAlt: 'Book cover for Magnus Chase 1',
      ages: '12-16',
      genre: 'Fantasy',
      stars: '***'
    },
    {
      id: 3,
      title: 'Belgariad Book One: Pawn of Prophecy',
      date: 'Feb 12, 2022',
      description:
        "A fierce dispute among the Gods and the theft of a powerful Orb leaves the World divided into five kingdoms. Young Garion, with his 'Aunt Pol' and an elderly man calling himself Wolf --a father and daughter granted near-immortality by one of the Gods -- set out on a complex mission.",
      imgSrc: 'https://images-na.ssl-images-amazon.com/images/I/41ZxXA+nInL.jpg',
      imgAlt: 'Book cover for Pawn of Prophecy',
      ages: '12-16',
      genre: 'Fantasy',
      stars: '****'
    }
  ];

  // Helper: turn display date into ISO for <time datetime>
  const toISODate = (displayDate) => {
    const d = new Date(displayDate);
    if (!Number.isNaN(d.getTime())) return d.toISOString();
    return displayDate; // fallback if unparseable
  };

  // Render articles dynamically into #articles
  function renderArticles(list) {
    const container = document.querySelector('#articles');
    if (!container) return;

    // Clear any static markup to avoid duplicates (per instructions)
    container.querySelectorAll('.post').forEach((el) => el.remove());

    list.forEach((item) => {
      const article = document.createElement('article');
      article.className = 'post';

      const template = `
        <header class="post-header">
          <div class="post-meta">
            <time datetime="${toISODate(item.date)}">${item.date}</time>
            <ul class="details">
              <li><strong>Ages:</strong> ${item.ages}</li>
              <li><strong>Genre:</strong> ${item.genre}</li>
              <li><strong>Stars:</strong> ${item.stars}</li>
            </ul>
          </div>
          <h3 class="post-title">${item.title}</h3>
        </header>
        <figure class="post-figure">
          <img src="${item.imgSrc}" alt="${item.imgAlt}">
        </figure>
        <p class="post-description">${item.description}</p>
      `;

      article.innerHTML = template.trim();
      container.appendChild(article);
    });
  }

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

  // 3) Build the articles list from data
  renderArticles(articles);
})();