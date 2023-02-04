//http://www.omdbapi.com/?apikey=92a2e38f&s=${searchQuery} -- ApiKey/Link for Omdb
const apiKey = "fb495745fa6d1d5a8b12ee2b026cbe06"
const defaultImage = "https://via.placeholder.com/300x450"
const searchForm = document.querySelector('#search-form');
const input = document.querySelector('#search-input');

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
            const movieContainer = document.querySelector('#movie-container');
            movieContainer.innerHTML = "";
            const title = movieData.title;
            const releaseDate = movieData.release_date;
            const runtime = movieData.runtime;
            const genres = movieData.genres;
            //const movieRated = movieData.certifications;
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

                document.querySelector('#movie-cast').innerText = `Starring: ${cast}`;
                document.querySelector('#movie-director').innerText = `Director: ${director}`;
              });

            document.querySelector('#movie-title').innerText = title;
            document.querySelector('#movie-release-date').innerText = `Released: ${releaseDate}`;
            document.querySelector('#movie-runtime').innerText = `Runtime: ${runtime}`;
            document.querySelector('#movie-genre').innerText = `Genre: ${genreNames.join(', ')}`;
            //document.querySelector('#movie-rated').innerText = `Rated: ${movieRated}`
            document.querySelector('#movie-description').innerText = description;
            document.querySelector('#movie-rating').innerText = `Rating: ${rating}`;
            document.querySelector('#movie-poster').src = posterUrl;
          });
      } else {
        console.error(data.Error);
      }
    });
});

let currentPage = 1;

window.addEventListener('load', (event) => {
  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${currentPage}`)
    .then(response => response.json())
    .then(newMovieData => {
      const movieContainer = document.querySelector('#movie-container');
      newMovieData.results.forEach(movie => {
        const posterUrl = movie.poster_path !== "N/A" ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "";
        const title = movie.title;
        const genres = movie.genres;
        let genreNames = [];
        if (genres) {
          genres.forEach(genres => {
            genreNames.push(genres.name);
          });
        }

        const movieList = document.createElement('div');
        movieList.setAttribute('id', 'movie-list');

        const moviePoster = document.createElement('img');
        moviePoster.setAttribute('id', 'movie-poster');
        moviePoster.setAttribute('src', posterUrl);
        moviePoster.setAttribute('alt', title);

        const movieTitle = document.createElement('h2');
        movieTitle.setAttribute('id', 'movie-title');
        movieTitle.innerText = title;

        const movieGenre = document.createElement('p');
        movieGenre.setAttribute('id', 'movie-genre');
        movieGenre.innerText = `Genre: ${genreNames.join(', ')}`;

        movieList.appendChild(moviePoster);
        movieList.appendChild(movieTitle);
        movieList.appendChild(movieGenre);

        movieContainer.appendChild(movieList);
      });
    });
});


document.querySelector('#next-button')
  .addEventListener('click', function () {
    currentPage++;
    const movieList = document.querySelector('#movie-list');
    movieList.innerHtml = "";
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
