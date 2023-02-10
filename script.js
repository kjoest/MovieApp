//http://www.omdbapi.com/?apikey=92a2e38f&s=${searchQuery} -- ApiKey/Link for Omdb
const apiKey = "fb495745fa6d1d5a8b12ee2b026cbe06";
const defaultImage = "https://via.placeholder.com/300x450"
const searchForm = document.querySelector('.search-form');
const input = document.querySelector('.search-bar');

let currentPage = 1;
let movies = [];

window.addEventListener('load', (event) => {
  fetchMovies();
});

function fetchMovies() {
  //const movieList = document.querySelector('.movie-container');
  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${currentPage}`)
    .then(response => response.json())
    .then(data => {
      document.querySelector('.movie-container').style.display = 'block';
      document.querySelector('.movie-container').innerHTML = '';
      totalPages = data.total_pages;
      data.results.forEach(movie => {
        movies = data.results;
        const movieID = movie.id;
        fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`)
          .then(response => response.json())
          .then(movieData => {

            const movieContainer = document.querySelector('.movie-container');
            const movieID = movieData.id;
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

            const movieId = document.createElement('p');
            movieId.classList.add('movie-id');
            movieId.innerText = movieID;

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

            movieList.appendChild(movieId);
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
          });
      });
    });
};

input.addEventListener('input', event => {
  event.preventDefault();
  const searchQuery = input.value;
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&language=en-US`)
    .then(response => response.json())
    .then(data => {
      document.querySelector('.movie-container-info').innerHTML = "";
      document.querySelector('.movie-container').innerHTML = "";
      if (data.results.length > 0) {
        const movies = data.results;
        movies.forEach(movie => {
          const movieID = movie.id;
          fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`)
            .then(response => response.json())
            .then(movieData => {
              const movieContainer = document.querySelector('.movie-container');
              //document.querySelector('.movie-container').style.display = "none";
              const movieID = movieData.id;
              const posterUrl = movieData.posterUrl !== "N/A" ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` : "";
              const title = movieData.title;
              const genres = movieData.genres;
              let genreNames = [];
              genres.forEach(genres => {
                genreNames.push(genres.name);
              });

              const movieList = document.createElement('div');
              movieList.classList.add('movie-list');

              const movieId = document.createElement('div');
              movieId.classList.add('movie-id');
              movieId.innerText = movieID;

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

              movieList.appendChild(movieId);
              movieList.appendChild(moviePoster);
              movieList.appendChild(movieTitle);
              movieList.appendChild(movieGenre);

              movieContainer.appendChild(movieList);

              const prevButton = document.getElementById("previous-button");
              const nextButton = document.getElementById("next-button");
              const lastPageButton = document.getElementById("last-page-button")
              const firstPageButton = document.getElementById("first-page-button")

              prevButton.style.display = "none";
              nextButton.style.display = "none";
              lastPageButton.style.display = "none";
              firstPageButton.style.display = "none";
            });
        });
      };
    });
});

let selectedMovie;

const movieContainers = document.querySelectorAll('.movie-container');
movieContainers.forEach(movie => {
  movie.addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('.search-bar').value = '';
    const movieTitle = event.currentTarget.closest('.movie-container').querySelector('.movie-title').innerText;

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movieTitle}&language=en-US`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        document.querySelector('.movie-container').innerHTML = "";
        if (data.results.length > 0) {
          const selectedMovies = data.results.filter(movie => movie.title === movieTitle);
          if (selectedMovies.length === 0) return;
          selectedMovie = selectedMovies[0];
          const movieID = selectedMovie.id;
          console.log(movieID);

          fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`)
            .then(response => response.json())
            .then(movie => {
              selectedMovie = movie;
              const id = selectedMovie.id;
              const posterUrl = selectedMovie.poster_path !== "N/A" ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}` : "";
              const title = selectedMovie.title;
              const rating = selectedMovie.vote_average;
              const description = selectedMovie.overview;
              const genres = selectedMovie.genres;
              const releaseDate = selectedMovie.release_date;
              const runtime = selectedMovie.runtime;
              let genreNames = [];
              genres.forEach(genres => {
                genreNames.push(genres.name);
              });

              const movieIDInfo = document.createElement('div');
              movieIDInfo.classList.add('movie-id-info');
              movieIDInfo.innerText = id;

              const moviePoster = document.createElement('img');
              moviePoster.classList.add('movie-poster-info');
              moviePoster.src = posterUrl;

              const movieTitle = document.createElement('h2');
              movieTitle.classList.add('movie-title-info');
              movieTitle.innerText = title;


              const movieRating = document.createElement('p');
              movieRating.classList.add('movie-rating-info');
              movieRating.innerText = `Rating: ${rating}`;

              const movieDescription = document.createElement('p');
              movieDescription.classList.add('movie-description-info');
              movieDescription.innerText = description;


              const movieGenre = document.createElement('p');
              movieGenre.classList.add('movie-genre-info');
              movieGenre.innerText = `Genre: ${genreNames.join(', ')}`;

              const movieReleaseDate = document.createElement('p');
              movieReleaseDate.classList.add('movie-release-date-info');
              movieReleaseDate.innerText = `Released: ${releaseDate}`;

              const movieRuntime = document.createElement('p');
              movieRuntime.classList.add('movie-runtime-info');
              movieRuntime.innerText = `Runtime: ${runtime}`;

              fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}`)
              .then(response => response.json())
              .then(creditsData => {
                let director = "N/A";
                let cast = "N/A";

                if(creditsData.crew) {
                  creditsData.crew.forEach(member => {
                    if(member.job === "Director") {
                      director = member.name;
                      return;
                    };
                  });
                };

                if(creditsData.cast) {
                  cast = creditsData.cast.map(actor => actor.name).join(', ');
                };

                const movieDirector = document.createElement('p');
                movieDirector.classList.add('movie-director-info');
                movieDirector.innerText = `Director: ${director}`;

                const movieCast = document.createElement('p');
                movieCast.classList.add('movie-cast-info');
                movieCast.innerText = `Starring: ${cast}`;

                movieContainer.appendChild(movieDirector);
                movieContainer.appendChild(movieCast);
              });

              const movieContainer = document.querySelector('.movie-container-info');
              movieContainer.innerHTML = "";
              movieContainer.appendChild(movieIDInfo);
              movieContainer.appendChild(moviePoster);
              movieContainer.appendChild(movieTitle);
              movieContainer.appendChild(movieRating);
              movieContainer.appendChild(movieDescription);
              movieContainer.appendChild(movieGenre);
              movieContainer.appendChild(movieReleaseDate);
              movieContainer.appendChild(movieRuntime);

              const prevButton = document.getElementById("previous-button");
              const nextButton = document.getElementById("next-button");
              const lastPageButton = document.getElementById("last-page-button")
              const firstPageButton = document.getElementById("first-page-button")

              prevButton.style.display = "none";
              nextButton.style.display = "none";
              lastPageButton.style.display = "none";
              firstPageButton.style.display = "none";
            });
        };
      });
  });
});

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