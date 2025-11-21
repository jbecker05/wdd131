// main.js
// WDD 131 - Recipe Book Part 2

import recipes from "./recipes.mjs";

// Get random whole number between 0 and num - 1
function random(num) {
  return Math.floor(Math.random() * num);
}

// Get one random recipe object from recipes array
function getRandomListEntry(list) {
  return list[random(list.length)];
}

// Generate HTML for tags
function tagsTemplate(tags) {
  return `
    <ul class="recipe-tags">
      ${tags.map(tag => `<li>${tag}</li>`).join("")}
    </ul>
  `;
}

// Generate HTML for rating stars
function ratingTemplate(rating) {
  let stars = "";
  for (let i = 0; i < 5; i++) {
    stars += i < rating ? "★" : "☆";
  }
  return `<span class="rating" role="img" aria-label="Rating: ${rating} out of 5">${stars}</span>`;
}

// Generate HTML template for a single recipe
function recipeTemplate(recipe) {
  return `
    <section class="recipe">
      <figure class="recipe-image">
        <img src="${recipe.image}" alt="${recipe.name}" />
      </figure>
      <article class="recipe-content">
        <header>
          <h2>${recipe.name}</h2>
          <p class="recipe-meta">Prep: ${recipe.prepTime} • Cook: ${recipe.cookTime} • Serves: ${recipe.servings}</p>
          ${ratingTemplate(recipe.rating)}
        </header>
        <p class="recipe-description">${recipe.description}</p>
        ${tagsTemplate(recipe.tags)}
        <section class="recipe-details">
          <h3>Ingredients</h3>
          <ul>
            ${recipe.ingredients.map(item => `<li>${item}</li>`).join("")}
          </ul>
          <h3>Directions</h3>
          <ol>
            ${recipe.directions.map(step => `<li>${step}</li>`).join("")}
          </ol>
        </section>
      </article>
    </section>
  `;
}

// Render the recipe list to the page
function renderRecipes(recipeList) {
  const container = document.querySelector("#recipes");
  container.innerHTML = recipeList.map(recipe => recipeTemplate(recipe)).join("");
}

// Filter recipes based on search term
function filterRecipes(query) {
  const lowerCaseQuery = query.toLowerCase();
  return recipes
    .filter(recipe =>
      recipe.name.toLowerCase().includes(lowerCaseQuery) ||
      recipe.description.toLowerCase().includes(lowerCaseQuery) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery)) ||
      recipe.ingredients.some(ing => ing.toLowerCase().includes(lowerCaseQuery))
    )
    .sort((a, b) => a.name.localeCompare(b.name));
}

// Handle search form submission
function searchHandler(event) {
  event.preventDefault();
  const searchTerm = document.querySelector("#search").value.trim();
  const filtered = filterRecipes(searchTerm);
  renderRecipes(filtered);
}

// Initialize on page load
function init() {
  const randomRecipe = getRandomListEntry(recipes);
  renderRecipes([randomRecipe]);

  // Attach event listener to search form
  const searchForm = document.querySelector("#search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", searchHandler);
  }
}

document.addEventListener("DOMContentLoaded", init);