'use strict';

(function(){

    function getMovieData () {
        return fetch(`https://freckle-attractive-group.glitch.me/movies`)
            .then((resp) => resp.json())
            .then((data => {
                console.log(data);
            }));
    }

    const options = {method: 'GET',
        headers: {accept: 'application/json'}};

    fetch('https://api.themoviedb.org/3/67da7a691d4363302b9007f99d6f16e2', options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));



    getMovieData()












})();

