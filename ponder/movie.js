const movies = [
  {
    title: 'Spider-Man: Into the Spider-Verse',
    releaseDate: 'Dec 14, 2018',
    recommendedAge: '10+',
    genre: 'Action/Adventure',
    rating: 4.5,
    imgSrc: 'https://wddbyui.github.io/wdd131/images/spiderman.png',
    imgAlt: 'Miles Morales swinging through the city',
    description: 'Miles Morales becomes the Spider-Man of his reality and crosses paths with others from the multiverse.'
  },
  {
    title: 'The Other Side of Heaven',
    releaseDate: 'Dec 14, 2001',
    recommendedAge: '10+',
    genre: 'Drama/Religious',
    rating: 4,
    imgSrc: 'https://wddbyui.github.io/wdd131/images/heaven.png',
    imgAlt: 'A young couple and missionaries in a rowboat on the ocean',
    description: 'Based on the true story of Elder John H. Groberg, a missionary in Tonga in the 1950s, this film tells a powerful story of faith, hardship, and miracles.'
  }
];

// Select the movie list section
const movieList = document.querySelector('#movie-list');

// Function to display movies
function displayMovies(movieArray) {
  movieArray.forEach(movie => {
    const article = document.createElement('article');
    article.classList.add('movie');

    article.innerHTML = `
      <h2>${movie.title}</h2>
      <img src="${movie.imgSrc}" alt="${movie.imgAlt}">
      <p><strong>Release Date:</strong> ${movie.releaseDate}</p>
      <p><strong>Recommended Age:</strong> ${movie.recommendedAge}</p>
      <p><strong>Genre:</strong> ${movie.genre}</p>
      <p><strong>Rating:</strong> <span role="img" aria-label="${movie.rating} out of 5 stars">${'★'.repeat(Math.floor(movie.rating))}${movie.rating % 1 ? '☆' : ''}</span></p>
      <p>${movie.description}</p>
    `;

    movieList.appendChild(article);
  });
}

// Call the function to display movies
if (movieList) {
  displayMovies(movies);
}