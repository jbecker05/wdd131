// --- Mobile menu toggle ---
const menuButton = document.getElementById('menuButton');
const menu = document.getElementById('menu');

function setMenuExpanded(expanded) {
  if (menuButton) menuButton.setAttribute('aria-expanded', String(expanded));
}

function toggleMenu() {
  if (!menu) return;
  menu.classList.toggle('hide');
  setMenuExpanded(!menu.classList.contains('hide'));
}

if (menuButton) menuButton.addEventListener('click', toggleMenu);

// --- Keep menu state in sync with CSS breakpoint (1000px) ---
function handleResize() {
  if (!menu) return;
  if (window.innerWidth > 1000) {
    // Desktop: ensure menu is visible
    menu.classList.remove('hide');
    setMenuExpanded(true);
  } else {
    // Mobile: hide menu by default
    menu.classList.add('hide');
    setMenuExpanded(false);
  }
}
window.addEventListener('resize', handleResize);
document.addEventListener('DOMContentLoaded', handleResize);

// --- Image viewer (modal) ---
// Create a single <dialog> used for viewing images
const modal = document.createElement('dialog');
modal.id = 'viewer';
document.body.appendChild(modal);

function viewerTemplate(src, alt) {
  return `
    <div class="viewer-content">
      <img src="${src}" alt="${alt}">
      <button class="close-viewer" aria-label="Close image viewer">X</button>
    </div>
  `;
}

// Delegate clicks from the gallery
const gallery = document.querySelector('.gallery');
if (gallery) {
  gallery.addEventListener('click', (event) => {
    const img = event.target.closest('img');
    if (!img) return;

    const fullSrc = img.getAttribute('src');
    const alt = img.getAttribute('alt') || '';

    modal.innerHTML = viewerTemplate(fullSrc, alt);
    modal.showModal();

    const closeBtn = modal.querySelector('.close-viewer');
    if (closeBtn) closeBtn.addEventListener('click', () => modal.close());
  });
}

// Close modal when clicking on the backdrop area (outside content)
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});
