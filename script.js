//http://www.omdbapi.com/?apikey=92a2e38f&s=${searchQuery} -- ApiKey/Link for Omdb
const apiKey = "fb495745fa6d1d5a8b12ee2b026cbe06"
const defaultImage = "https://via.placeholder.com/300x450"
const searchForm = document.querySelector('.search-form');
const input = document.querySelector('.search-bar');

// searchForm.addEventListener('submit', event => {
//   event.preventDefault();
//   //input.addEventListener('input', event => {
//   const searchQuery = input.value;
//   fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&language=en-US`)
//     .then(response => response.json())
//     .then(data => {
//       document.querySelector('.movie-container').innerHTML = "";
//       if (data.results.length > 0) {
//         const movies = data.results;
//         // select the first movie from the search results
//         const firstMovie = movies[0];
//         const movieID = firstMovie.id;
//         fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`)
//           .then(response => response.json())
//           .then(movieData => {
//             document.querySelector('.movie-container').style.display = "none";
//             const title = movieData.title;
//             const releaseDate = movieData.release_date;
//             const runtime = movieData.runtime;
//             const genres = movieData.genres;
//             const description = movieData.overview;
//             const rating = movieData.vote_average;
//             const posterUrl = movieData.poster_path !== "N/A" ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` : "";
//             let genreNames = [];
//             genres.forEach(genres => {
//               genreNames.push(genres.name);
//             });

//             fetch(`https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${apiKey}`)
//               .then(response => response.json())
//               .then(creditsData => {
//                 let director = "N/A";
//                 let cast = "N/A";

//                 if (creditsData.crew) {
//                   creditsData.crew.forEach(member => {
//                     if (member.job === "Director") {
//                       director = member.name;
//                       return;
//                     }
//                   });
//                 }

//                 if (creditsData.cast) {
//                   cast = creditsData.cast.map(actor => actor.name).join(', ');
//                 }

//                 const movieCast = document.createElement('p');
//                 movieCast.classList.add('movie-cast-info');
//                 movieCast.innerText = `Starring: ${cast}`;

//                 const movieDirector = document.createElement('p');
//                 movieDirector.classList.add('movie-director-info');
//                 movieDirector.innerText = `Director: ${director}`;

//                 movieContainer.appendChild(movieCast);
//                 movieContainer.appendChild(movieDirector);
//               });

//             const movieTitle = document.createElement('h2');
//             movieTitle.classList.add('movie-title-info');
//             movieTitle.innerText = title;

//             const movieReleaseDate = document.createElement('p');
//             movieReleaseDate.classList.add('movie-release-date-info');
//             movieReleaseDate.innerText = `Released: ${releaseDate}`;

//             const movieRuntime = document.createElement('p');
//             movieRuntime.classList.add('movie-runtime-info');
//             movieRuntime.innerText = `Runtime: ${runtime}`;

//             const movieGenre = document.createElement('p');
//             movieGenre.classList.add('movie-genre-info');
//             movieGenre.innerText = `Genre: ${genreNames.join(', ')}`;

//             const movieDescription = document.createElement('p');
//             movieDescription.classList.add('movie-description-info');
//             movieDescription.innerText = description;

//             const movieRating = document.createElement('p');
//             movieRating.classList.add('movie-rating-info');
//             movieRating.innerText = `Rating: ${rating}`;

//             const moviePoster = document.createElement('img');
//             moviePoster.classList.add('movie-poster-info');
//             moviePoster.src = posterUrl;

//             const movieContainer = document.querySelector('.movie-container-info');
//             movieContainer.innerHTML = "";
//             movieContainer.appendChild(movieTitle);
//             movieContainer.appendChild(movieReleaseDate);
//             movieContainer.appendChild(movieRuntime);
//             movieContainer.appendChild(movieGenre);
//             movieContainer.appendChild(movieDescription);
//             movieContainer.appendChild(movieRating);
//             movieContainer.appendChild(moviePoster);

//             const prevButton = document.getElementById("previous-button");
//             const nextButton = document.getElementById("next-button");
//             const lastPageButton = document.getElementById("last-page-button")
//             const firstPageButton = document.getElementById("first-page-button")

//             prevButton.style.display = "none";
//             nextButton.style.display = "none";
//             lastPageButton.style.display = "none";
//             firstPageButton.style.display = "none";
//           });
//       } else {
//         console.error(data.Error);
//       }
//       //});
//     });
// });

let currentPage = 1;
let movies = [];

window.addEventListener('load', (event) => {
  fetchMovies();
});

function fetchMovies() {
  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=${currentPage}`)
    .then(response => response.json())
    .then(data => {
      document.querySelector('.movie-container').style.display = 'block';
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
            //movieList.setAttribute('id', 'movie-list');
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
};

//searchForm.addEventListener('submit', event => {
//event.preventDefault();

input.addEventListener('input', event => {
  event.preventDefault();
  const searchQuery = input.value;
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&language=en-US`)
    .then(response => response.json())
    .then(data => {
      document.querySelector('.movie-container').innerHTML = "";
      if (data.results.length > 0) {
        const movies = data.results;
        movies.forEach(movie => {
          //const firstMovie = movies[0];
          const movieID = movie.id;
          fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`)
            .then(response => response.json())
            .then(movieData => {
              const movieContainer = document.querySelector('.movie-container');
              //document.querySelector('.movie-container').style.display = "none";
              const posterUrl = movieData.posterUrl !== "N/A" ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}` : "";
              const title = movieData.title;
              const genres = movieData.genres;
              let genreNames = [];
              genres.forEach(genres => {
                genreNames.push(genres.name);
              });

              const movieList = document.createElement('div');
              //movieList.setAttribute('id', 'movie-list');
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
            });
        });
      };
    });
});
//});

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