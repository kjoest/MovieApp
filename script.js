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
              const director = movieData.Director;
              const cast = movieData.Actors;
              const description = movieData.Plot;
              const rating = movieData.imdbRating;
              const posterUrl = movieData.Poster !== "N/A" ? movieData.Poster : "";
  
              document.querySelector('#movie-title').innerText = title;
              document.querySelector('#movie-release-date').innerText = `Released: ${releaseDate}`;
              document.querySelector('#movie-runtime').innerText = `Runtime: ${runtime}`;
              document.querySelector('#movie-genre').innerText = `Genre: ${genre}`;
              document.querySelector('#movie-director').innerText = `Director: ${director}`;
              document.querySelector('#movie-cast').innerText = `Starring: ${cast}`;
              document.querySelector('#movie-description').innerText = description;
              document.querySelector('#movie-rating').innerText = `Rating: ${rating}`;
              if (posterUrl === "N/A"){
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
