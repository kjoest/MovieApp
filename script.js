const defaultImage = "https://via.placeholder.com/300x450"
const searchForm = document.querySelector('#search-form');
const input = document.querySelector('#search-input');

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const searchQuery = input.value;
  fetch(`http://www.omdbapi.com/?apikey=92a2e38f&s=${searchQuery}`)
    .then(response => response.json())
    .then(data => {
      if (data.Response === "True") {
        const movies = data.Search;
        // select the first movie from the search results
        const firstMovie = movies[0];
        const imdbID = firstMovie.imdbID;
        fetch(`http://www.omdbapi.com/?apikey=92a2e38f&i=${imdbID}&plot=full`)
          .then(response => response.json())
          .then(movieData => {
            const title = movieData.Title;
            const releaseDate = movieData.Released;
            const runtime = movieData.Runtime;
            const genre = movieData.Genre;
            const movieRated = movieData.Rated
            const director = movieData.Director;
            const cast = movieData.Actors;
            const description = movieData.Plot;
            const rating = movieData.imdbRating;
            const posterUrl = movieData.Poster !== "N/A" ? movieData.Poster : "";

            document.querySelector('#movie-title').innerText = title;
            document.querySelector('#movie-release-date').innerText = `Released: ${releaseDate}`;
            document.querySelector('#movie-runtime').innerText = `Runtime: ${runtime}`;
            document.querySelector('#movie-genre').innerText = `Genre: ${genre}`;
            document.querySelector('#movie-rated').innerText = `Rated: ${movieRated}`
            document.querySelector('#movie-director').innerText = `Director: ${director}`;
            document.querySelector('#movie-cast').innerText = `Starring: ${cast}`;
            document.querySelector('#movie-description').innerText = description;
            document.querySelector('#movie-rating').innerText = `Rating: ${rating}`;
            if (posterUrl === "N/A") {
              document.querySelector("#movie-poster").src = defaultImage;
            } else {
              document.querySelector('#movie-poster').src = posterUrl;
            }
          });
      } else {
        console.error(data.Error);
      }
    });
});

let today = new Date();
let currentYear = today.getFullYear();

window.onload = function () {
fetch(`http://www.omdbapi.com/?apikey=92a2e38f&type=movie&y=${currentYear}`)
  .then(response => response.json())
  .then(movieData => {
    if (movieData.Response === "True") {
      const movies = movieData.Search;

      movies.forEach(movieData => {
        const imdbID = movieData.imdbID;
        fetch(`http://www.omdbapi.com/?apikey=92a2e38f&i=${imdbID}&plot=full`)
          .then(response => response.json())
          .then(movieData => {
            const posterUrl = movieData.Poster !== "N/A" ? movieData.Poster : "";
            const title = movieData.Title;
            const movieRated = movieData.Rated;
            const genre = movieData.Genre;

            if (posterUrl === "N/A") {
              document.querySelector('#movie-poster').src = defaultImage;
            } else {
              document.querySelector('#movie-poster').src = posterUrl;
            }
            document.querySelector('#movie-title').innerText = title;
            document.querySelector('#movie-rated').innerText = movieRated;
            document.querySelector('#movie-genre').innerText = genre;
          });
      });
    }
  });
}

document.querySelector("#search-bar")
.addEventListener("click", function () {
  data.search();
});



// const movieContainer = document.querySelector("#movie-container");

// searchForm.addEventListener('submit', event => {
//   event.preventDefault();

//   fetch(`http://www.omdbapi.com/?apikey=92a2e38f&s=${searchQuery}`)
//   .then(response => response.json())
//   .then(data => {
//     const popularMovies = data.results;
//     popularMovies.forEach(movie => {
//       const movieElement = documnet.createElement("div");
//       movieElement.classList.add("movie");

//       const posterElement = document.createElement("img");
//       posterElement.src = movie.poster_path;
//       posterElement.alt = `Poster for ${movie.title}`;
//       posterElement.addEventListener("click", () => {

//       });

//       const nameElement = document.createElement("p");
//       nameElement.classList.add("movie-name");
//       nameElement.textContent = movie.title;

//       movieElement.appendChild(posterElement);
//       movieElement.appendChild(nameElement);
//       movieContainer.appendChild(movieElement);
//     });
//   });
//   });
