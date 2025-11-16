// main.js
// WDD 131 - Recipe Book
// Handles basic UI behavior for the Recipe Book page (Part 1)

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#search");
  const categorySelect = document.querySelector("#category");

  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const searchTerm = searchInput ? searchInput.value.trim() : "";
      const category = categorySelect ? categorySelect.value : "";

      // For Part 1 we’re just capturing the values.
      // In a later part you’ll import recipes from recipes.mjs
      // and filter them based on this data.
      console.log("Search submitted:", {
        searchTerm,
        category,
      });

      // TODO (later): Filter and display recipes using data from recipes.mjs
    });
  }
});