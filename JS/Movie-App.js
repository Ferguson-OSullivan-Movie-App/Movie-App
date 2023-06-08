'use strict';

(function(){

    let movieArray = [];

    function getMovieData () {
        return fetch(`https://freckle-attractive-group.glitch.me/movies`)
            .then((resp) => resp.json())
            .then((data => {
                for (let i = 0; i <= data.length - 1; i++) {
                    console.log(data[i]);
                    console.log(data[i].id);
                    console.log(data[i].rating);
                    console.log(data[i].title);
                    movieArray.push(data[i])
                    buildMovieData(movieArray);

                }
            }));
    }

    let movieDataString = '';
    console.log(movieArray);

    function buildMovieData (obj) {
        console.log(movieArray);
        for (let i = 0; i < obj.length; i++)
        {
            let movieDataString = '<div class="card" id="movie-card">'
            movieDataString += '<div class="card-body>'
            movieDataString += '<h5 class="card-title">' + obj[i].title + '</h5>'

            movieDataString += '</div>'
            movieDataString += '</div>'
        }
        return movieDataString;
    }
    getMovieData();

    // const options = {method: 'GET',
    //     headers: {accept: 'application/json'}};
    //
    // fetch('https://api.themoviedb.org/3/67da7a691d4363302b9007f99d6f16e2', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    //



    function renderCoffee(coffee) {
        let html = '<div class="card col-md-4 col-5 my-card" id="indv-card">';
        html += '<div class="card-body">';
        html += '<h5 class="card-title" style="color: var(--card-desc)">' + coffee.name + '</h5>';
        html += '<h5 class="card-subtitle mb-2" style="color: var(--main-text-color)">' + coffee.roast + " roast " + '</h5>';
        html += '<h6 class="card-subtitle mb-2" style="color: var(--bs-darkbrown)">' + coffee.desc + '</h6>';
        html += '</div>';
        html += '</div>';

        return html;
    }














})();

