//http://www.omdbapi.com/?apikey=92a2e38f&s=${searchQuery} -- ApiKey/Link for Omdb
const apiKey = "fb495745fa6d1d5a8b12ee2b026cbe06"
const defaultImage = "https://via.placeholder.com/300x450"
const searchForm = document.querySelector('.search-form');
const input = document.querySelector('.search-input');

searchForm.addEventListener('submit', event => {
  event.preventDefault();

  const searchQuery = input.value;
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&language=en-US`)
    .then(response => response.json())
    .then(data => {
      if (data.results.length > 0) {
        const movies = data.results;
        // select the first movie from the search results
        const firstMovie = movies[0];
        const movieID = firstMovie.id;
        fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`)
          .then(response => response.json())
          .then(movieData => {
            const movieContainer = document.querySelector('.movie-container');
            movieContainer.innerHTML = "";
            const title = movieData.title;
            const releaseDate = movieData.release_date;
            const runtime = movieData.runtime;
            const genres = movieData.genres;
            const description = movieData.overview;
            const rating = movieData.vote_average;
            const posterUrl = movieData.poster_path !== "N/A" ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` : "";
            let genreNames = [];
            genres.forEach(genres => {
              genreNames.push(genres.name);
            });

            fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}`)
              .then(response => response.json())
              .then(creditsData => {
                let director = "N/A";
                let cast = "N/A";

                if (creditsData.crew) {
                  creditsData.crew.forEach(member => {
                    if (member.job === "Director") {
                      director = member.name;
                      return;
                    }
                  });
                }

                if (creditsData.cast) {
                  cast = creditsData.cast.map(actor => actor.name).join(', ');
                }

                document.querySelector('.movie-cast').innerText = `Starring: ${cast}`;
                document.querySelector('.movie-director').innerText = `Director: ${director}`;
              });

            document.querySelector('.movie-title').innerText = title;
            document.querySelector('.movie-release-date').innerText = `Released: ${releaseDate}`;
            document.querySelector('.movie-runtime').innerText = `Runtime: ${runtime}`;
            document.querySelector('.movie-genre').innerText = `Genre: ${genreNames.join(', ')}`;
            document.querySelector('.movie-description').innerText = description;
            document.querySelector('.movie-rating').innerText = `Rating: ${rating}`;
            document.querySelector('.movie-poster').src = posterUrl;

            const prevButton = document.getElementById("previous-button");
            const nextButton = document.getElementById("next-button");
            const lastPageButton = document.getElementById("last-page-button")
            const firstPageButton = document.getElementById("first-page-button")

            prevButton.style.display = "none";
            nextButton.style.display = "none";
            lastPageButton.style.display = "none";
            firstPageButton.style.display = "none";
          });
      } else {
        console.error(data.Error);
      }
    });
});

let currentPage = 1;
let movies = [];

window.addEventListener('load', (event) => {
  fetchMovies();
});

function fetchMovies() {
  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${currentPage}`)
    .then(response => response.json())
    .then(data => {
      totalPages = data.total_pages;
      data.results.forEach(movie => {
        movies = data.results;
        const movieID = movie.id;

        fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`)
          .then(response => response.json())
          .then(movieData => {
            const movieContainer = document.querySelector('.movie-container');
            const posterUrl = movieData.poster_path !== `${defaultImage}` ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` : "";
            const title = movieData.title;
            const genres = movieData.genres;
            let genreNames = [];
            genres.forEach(genres => {
              genreNames.push(genres.name);
            });

            const movieList = document.createElement('div');
            movieList.setAttribute('id', 'movie-list');
            movieList.classList.add('movie-list');

            const moviePoster = document.createElement('img');
            moviePoster.classList.add('movie-poster');
            moviePoster.setAttribute('src', posterUrl);
            moviePoster.setAttribute('alt', title);

            const movieTitle = document.createElement('h2');
            movieTitle.classList.add('movie-title');
            movieTitle.innerText = title;

            const movieGenre = document.createElement('p');
            movieGenre.classList.add('movie-genre');
            movieGenre.innerText = `Genre: ${genreNames.join(', ')}`;

            movieList.appendChild(moviePoster);
            movieList.appendChild(movieTitle);
            movieList.appendChild(movieGenre);

            movieContainer.appendChild(movieList);

            const prevButton = document.getElementById("previous-button");
            const nextButton = document.getElementById("next-button");
            const lastPageButton = document.getElementById("last-page-button")
            const firstPageButton = document.getElementById("first-page-button")

            if (currentPage > totalPages) {
              currentPage = totalPages;
            }

            if (currentPage === 1 && totalPages === 1) {
              prevButton.style.display = "none";
              nextButton.style.display = "none";
              lastPageButton.style.display = "none";
              firstPageButton.style.display = "none";
            } else if (currentPage === 1) {
              prevButton.style.display = "none";
              firstPageButton.style.display = "none";
              nextButton.style.display = "block";
              lastPageButton.style.display = "block";
            } else if (currentPage === totalPages) {
              prevButton.style.display = "block";
              firstPageButton.style.display = "block";
              nextButton.style.display = "none";
              lastPageButton.style.display = "none";
            } else {
              prevButton.style.display = "block";
              nextButton.style.display = "block";
              firstPageButton.style.display = "block";
              lastPageButton.style.display = "block";
            }
          })
      });
    });
}

document.querySelector('#previous-button')
  .addEventListener('click', function () {
    if (currentPage > 1) {
      currentPage -= 1;
      const movieContainer = document.querySelector('.movie-container');
      movieContainer.innerHTML = "";
      fetchMovies();
    }
  });

document.querySelector('#next-button')
  .addEventListener('click', function () {
    currentPage += 1;
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = "";
    fetchMovies();
  });

document.querySelector('#first-page-button')
  .addEventListener('click', function () {
    currentPage = 1;
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = "";
    fetchMovies();
  });

document.querySelector('#last-page-button')
  .addEventListener('click', function () {
    currentPage = totalPages;
    const movieContainer = document.querySelector('.movie-container');
    movieContainer.innerHTML = "";
    fetchMovies();
  });