'use strict';

(function () {

    $(document).ready(function () {

        let movieArray = [];
        let url = `https://freckle-attractive-group.glitch.me/movies`

        function getMovieData() {
            movieArray = [];
            return fetch(url)
                .then((resp) => resp.json())
                .then((data => {
                    for (let i = 0; i < data.length; i++) {
                        movieArray.push(data[i])
                    }
                    $('#movie-card').html(renderMovies(movieArray));
                }));
        }

        getMovieData();

        function buildMovieData(obj) {
            let movieDataString = '';
            movieDataString = '<div class="col-2 card" id="movie-card">'
            movieDataString += `<div class=" card-body>`
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
            let lastMovie = movieArray.length
            fetch(`https://freckle-attractive-group.glitch.me/movies/${lastMovie}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then(getMovieData);
        })

        $('#search-button').on('click', userMovieSearch)

        function userMovieSearch() {
            let userSearchInput = $('#search-box').val();

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