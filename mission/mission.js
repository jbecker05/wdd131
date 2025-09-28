const themeSelector = document.querySelector('#theme');
const logo = document.querySelector('#logo');

function changeTheme() {
  const current = themeSelector.value;

  if (current === 'dark') {
    document.body.classList.add('dark');
    if (logo) logo.src = 'images/byui-white.png'; // white logo for dark background
  } else {
    document.body.classList.remove('dark');
    if (logo) logo.src = 'images/byui-blue.png'; // blue logo for light background
  }
}

// Apply theme once on page load
changeTheme();

// Update theme whenever user changes dropdown
themeSelector.addEventListener('change', changeTheme);