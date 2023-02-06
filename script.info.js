searchForm.addEventListener('submit', event => {
  event.preventDefault();
  //input.addEventListener('input', event => {
  const searchQuery = input.value;
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}&language=en-US`)
    .then(response => response.json())
    .then(data => {
      document.querySelector('.movie-container').innerHTML = "";
      if (data.results.length > 0) {
        const movies = data.results;
        // select the first movie from the search results
        const firstMovie = movies[0];
        const movieID = firstMovie.id;
        fetch(`https://api.themoviedb.org/3/movie/${movieID}?api_key=${apiKey}&language=en-US`)
          .then(response => response.json())
          .then(movieData => {
            document.querySelector('.movie-container').style.display = "none";
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

                const movieCast = document.createElement('p');
                movieCast.classList.add('movie-cast-info');
                movieCast.innerText = `Starring: ${cast}`;

                const movieDirector = document.createElement('p');
                movieDirector.classList.add('movie-director-info');
                movieDirector.innerText = `Director: ${director}`;

                movieContainer.appendChild(movieCast);
                movieContainer.appendChild(movieDirector);
              });

            const movieTitle = document.createElement('h2');
            movieTitle.classList.add('movie-title-info');
            movieTitle.innerText = title;

            const movieReleaseDate = document.createElement('p');
            movieReleaseDate.classList.add('movie-release-date-info');
            movieReleaseDate.innerText = `Released: ${releaseDate}`;

            const movieRuntime = document.createElement('p');
            movieRuntime.classList.add('movie-runtime-info');
            movieRuntime.innerText = `Runtime: ${runtime}`;

            const movieGenre = document.createElement('p');
            movieGenre.classList.add('movie-genre-info');
            movieGenre.innerText = `Genre: ${genreNames.join(', ')}`;

            const movieDescription = document.createElement('p');
            movieDescription.classList.add('movie-description-info');
            movieDescription.innerText = description;

            const movieRating = document.createElement('p');
            movieRating.classList.add('movie-rating-info');
            movieRating.innerText = `Rating: ${rating}`;

            const moviePoster = document.createElement('img');
            moviePoster.classList.add('movie-poster-info');
            moviePoster.src = posterUrl;

            const movieContainer = document.querySelector('.movie-container-info');
            movieContainer.innerHTML = "";
            movieContainer.appendChild(movieTitle);
            movieContainer.appendChild(movieReleaseDate);
            movieContainer.appendChild(movieRuntime);
            movieContainer.appendChild(movieGenre);
            movieContainer.appendChild(movieDescription);
            movieContainer.appendChild(movieRating);
            movieContainer.appendChild(moviePoster);

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
      //});
    });
});