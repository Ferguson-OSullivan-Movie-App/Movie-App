'use strict';

(function () {

    $(document).ready(function () {

        function hideLoader() {
            $('.loader-wrapper').fadeOut();
        }

        $(window).on('load', function (){
            $('.loader-wrapper').fadeOut()
        })

        let movieArray = [];
        let movieId = [];
        let url = `https://freckle-attractive-group.glitch.me/movies`

        function getMovieData() {
            movieArray = [];
            movieId =[];
            return fetch(url)
                .then((resp) => resp.json())
                .then((data => {
                    console.log(data);
                    for (let i = 0; i < data.length; i++) {
                        movieArray.push(data[i])
                        movieId.push(data[i].id)
                    }
                    console.log(movieArray)
                    console.log(movieId)
                    console.log(Math.max(...movieId));
                    $('#movie-card').html(renderMovies(movieArray));
                    hideLoader()
                }));
        }

        getMovieData();

        function buildMovieData(obj) {
            let movieDataString = '';
            movieDataString = '<div class="col-2 card hover" id="movie-card">'
            movieDataString += `<div class="card-body>`
            movieDataString += `<h5 class="card-title"> ${obj.rating} </h5>`
            movieDataString += `<h5 class="card-title"> ${obj.title} </h5>`
            movieDataString += '</div>'
            movieDataString += '</div>'
            return movieDataString;
        }

        function renderMovies(objElement, poster) {
            let movieDataString = '';
            for (let i = 0; i < objElement.length; i++) {
                movieDataString += buildMovieData(objElement[i])
            }
            return movieDataString
        }


        $('#movie-card').on('click', '.card', function() {
            var title = $(this).find('.card-title').text();
            $('.popUp').css('display', 'block');
            $('.selected-movie').text(title);
        }).on('dblclick', '.card', function() {
            $('.popUp').css('display', 'none');
        });



        $('#add-movie-button').on('click', addMovie => {
            if(($('#movie-ranking').val() > 0) && ($('#movie-ranking').val() < 6)) {
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
                    .then(response => console.log(response))
                    .then(getMovieData)
                    .catch(error => console.error(error));
            } else {
                alert('Please Enter A Number Between 1-5');
            }
        })

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

        $('#search-button').on('click', userMovieSearch)

        function userMovieSearch() {
            let userSearchInput = $('#search-box').val();
            let apiUrl = `https://www.omdbapi.com/?apikey=${OMDB}&t=${userSearchInput}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.Poster && data.Poster !== 'N/A') {
                        let posterUrl = data.Poster;
                        let posterElement = $('<img>').attr('src', posterUrl);
                        let posterData = $(`<h6 class="mt-1">Director: ${data.Director}</h6>`)
                        $('#poster-container').empty().append(posterElement, posterData);
                        // $('#poster-container').append(posterData);
                    } else {
                        $('#poster-container').empty().text('No poster available.');
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        }
    });
})();






//let userMovie = {
//                 title: $('#add-movie-box').val(),
//                 rating: $('#movie-ranking').val()
//             }
//             const options = {
//                 method: 'DELETE',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(userMovie),
//             }
//             fetch(url,options)
//                 .then(response => response.json())
//                 .then(getMovieData);