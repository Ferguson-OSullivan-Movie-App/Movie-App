'use strict';

(function () {

    $(document).ready(function () {

        let movieArray = [];

        function getMovieData() {
            return fetch(`https://freckle-attractive-group.glitch.me/movies`)
                .then((resp) => resp.json())
                .then((data => {
                    for (let i = 0; i <= data.length - 1; i++) {
                        console.log(data[i]);
                        console.log(data[i].id);
                        console.log(data[i].rating);
                        console.log(data[i].title);
                        movieArray.push(data[i])
                    }
                    $('#movie-card').html(renderMovies(movieArray));
                }));

        }

        getMovieData();

        // let movieDataString = '';
        console.log(movieArray);

        // buildMovieData(movieArray);

        function buildMovieData(obj) {
            console.log(movieArray);
            let movieDataString = '';
                movieDataString = '<div class="col-2 card" id="movie-card">'
                movieDataString += `<div class=" card-body>`
                movieDataString += `<h5 class="card-title"> ${obj.rating} </h5>`
                movieDataString += `<h5 class="card-title"> ${obj.title} </h5>`

                movieDataString += '</div>'
                movieDataString += '</div>'
            console.log(movieDataString);
            return movieDataString;
        }


        function renderMovies(objElement) {
            let movieDataString = '';
            for (let i= 0; i < objElement.length; i++) {
                movieDataString += buildMovieData(objElement[i])
            }
            return movieDataString
        }


        function addMovie (e) {
            e.preventDefault();


        }

        // renderMovies(movieArray);

        // const options = {method: 'GET',
        //     headers: {accept: 'application/json'}};
        //


        $('#search-button').on('click', userMovieSearch)

        function userMovieSearch () {
            let userSearchInput = $('#search-box').val();

            fetch(`http://www.omdbapi.com/?t=${userSearchInput}&apikey=${OMDB}`)
                .then(response => response.json())
                .then(response => console.log(response))
                .catch(err => console.error(err));

        }


    });
})();

