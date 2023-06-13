'use strict';

(function () {

        // -----Animation Functions

        function hideLoader() {
            $('.loader-wrapper').fadeOut();
        }

        $(window).on('load', function () {
            $('.loader-wrapper').fadeOut()
        })

        // -----Variables-----

        let movieArray = [];
        let movieId = [];
        let url = `https://freckle-attractive-group.glitch.me/movies`
        let cardBody = $('#movie-cards')

        // -----Main Functions-----

        // -----Get Movie Information-----

        function getMovieData() {
            movieArray = [];
            movieId = [];
            $('#movie-card').html(`<div class="loader-wrapper">
                <div class="loading">Loading&#8230;</div>`)
            return fetch(url)
                .then((resp) => resp.json())
                .then((data => {
                    for (let i = 0; i < data.length; i++) {
                        movieArray.push(data[i])
                        movieId.push(data[i].id)
                    }
                    $('#movie-cards').html(renderMovies(movieArray));
                    hideLoader()
                }));
        }

        // ----------

        getMovieData();

        // -----Build Movie Cards-----

        function buildMovieData(obj) {
            let movieDataString = '';
            movieDataString = '<div class="col-5 card hover m-1" id="movie-card">'
            movieDataString += `<div class="card-body">`
            movieDataString += `<h3 class="card-title movie-title p-0"> ${obj.title} </h3>`
            movieDataString += `<h5 class="card-title"> Rating: ${obj.rating} </h5>`
            movieDataString += '</div>'
            movieDataString += `<h5 class="card-id">${obj.id}</h5>`
            movieDataString += `<button class="btn mb-1 deletebtn">Delete</button>`
            movieDataString += '</div>'
            return movieDataString;
        }

        // -----Render Cards Onto The Page-----

        function renderMovies(objElement) {
            let movieDataString = '';
            for (let i = 0; i < objElement.length; i++) {
                movieDataString += buildMovieData(objElement[i])
            }
            return movieDataString
        }

        // -----Add Movie Function-----

        $('#add-movie-button').on('click', addMovie => {
            if (($('#movie-ranking').val() > 0) && ($('#movie-ranking').val() < 6)) {
                let userMovie = {
                    title: $('#add-movie-box').val(),
                    rating: $('#movie-ranking').val()
                }
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userMovie),
                }
                fetch(url, options)
                    .then(getMovieData)
                    .catch(error => console.error(error));
                $('#add-movie-box').val('');
                $('#movie-ranking').val('');
            } else {
                alert('Please Enter A Number Between 1-5');
            }
        })

        // -----Delete Function-----

        $('#delete-movie-button').on('click', deleteMovie => {
            let lastMovie = Math.max(...movieId);
            let confirmed = confirm('Deleting the last movie.')
            if (confirmed) {
                fetch(`https://freckle-attractive-group.glitch.me/movies/${lastMovie}`, {
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }).then(getMovieData);
            }
        })

        //-----Search Functions-----

        $('#search-button').on('click', searchMovies).on('click', userMovieSearch)

        function searchMovies(e) {
            e.preventDefault();
            let searchedMovie = $('#search-box').val();
            let filteredMovies = [];
            movieArray.forEach(function (movie) {
                if (movie.title.toLowerCase().includes(searchedMovie.toLowerCase())) {
                    filteredMovies.push(movie);
                }
            });
            cardBody.html(renderMovies(filteredMovies));
        }

        //----------

        function userMovieSearch() {
            let userSearchInput = $('#search-box').val();
            for (let movie of movieArray) {
                if ((movie.title).includes(userSearchInput)) {
                    let apiUrl = `https://www.omdbapi.com/?apikey=${OMDB}&t=${userSearchInput}`;
                    fetch(apiUrl)
                        .then(response => response.json())
                        .then(data => {
                            if (data.Poster && data.Poster !== 'N/A') {
                                let posterUrl = data.Poster;
                                let posterElement = $('<img>').attr('src', posterUrl);
                                let posterData = $(`<h6 class="mt-1 director">Director: ${data.Director}</h6>`)
                                $('#poster-container').empty().append(posterElement, posterData);
                            } else {
                                $('#poster-container').empty().text('No poster available.');
                            }
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            }
        }

        // -----Edit Functions-----

        // -----PopUp-----
        $('#movie-cards').on('dblclick', '.card', function () {
            let title = $(this).find('.movie-title').text();
            $('.popUp').toggle();
            $('.selected-movie').text(title);
        })

        // ----------

        $('#titleEdit').on('click', editTitle => {
            let movieTitle = $('.selected-movie').text();
            for (let movie of movieArray) {
                if (movieTitle.trim() === (movie.title).trim()) {
                    let movieName = $('#edit-title').val()
                    fetch(`https://freckle-attractive-group.glitch.me/movies/${movie.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({title: movieName})
                    })
                        .then(resp => resp.json())
                        .then(getMovieData);
                    $('#edit-title').val('');
                }
            }
        }).on('click', function () {
            $('.popUp').css('display', 'none');
        });

        //----------

        $('#ratingEdit').on('click', editTitle => {
            let movieTitle = $('.selected-movie').text();
            let movieRank = $('#edit-rating').val()
            if ((movieRank > 0) && (movieRank < 6)) {
                for (let movie of movieArray) {
                    if (movieTitle.trim() === movie.title) {
                        fetch(`https://freckle-attractive-group.glitch.me/movies/${movie.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({rating: movieRank})
                        })
                            .then(resp => resp.json())
                            .then($('.popUp').css('display', 'none'))
                            .then(getMovieData);
                        $('#edit-rating').val('');
                    }
                }
            } else {
                confirm('Enter a ranking between 1-5');
            }
        })
})();