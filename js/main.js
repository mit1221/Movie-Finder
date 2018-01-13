window.onload = abc;
    
function abc() {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
}

function getMovies(searchText) {
    $.getJSON('https://www.omdbapi.com/?s='+searchText+'&apikey=1d1939b', function(rdata) {
            console.log(rdata);
            rdatavar = rdata;
            let movies = rdata.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <h5>${movie.Title}</h5>
                        <img src="${movie.Poster}">
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div>
                </div>

                `;
            });
            
            $('#movies').html(output);
        });
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    $.getJSON('https://www.omdbapi.com/?i='+movieId+'&apikey=1d1939b', function(rdata) {
        console.log(rdata);
        
        let output = `
        <div class="row">
            <div class="col-md-4">
                <img src="${rdata.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
                <h2>${rdata.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><b>Genre:</b> ${rdata.Genre}</li>
                    <li class="list-group-item"><b>Released:</b> ${rdata.Released}</li>
                    <li class="list-group-item"><b>Rated:</b> ${rdata.Rated}</li>
                    <li class="list-group-item"><b>Rating:</b> ${rdata.imdbRating}</li>
                    <li class="list-group-item"><b>Director:</b> ${rdata.Director}</li>
                    <li class="list-group-item"><b>Writer:</b> ${rdata.Writer}</li>
                    <li class="list-group-item"><b>Actors:</b> ${rdata.Actors}</li>
                </ul>
            </div>
        </div>
        <div class="row">
            <div class="well">
                <h3>Plot</h3>
                ${rdata.Plot}
                <hr>
                <a href="http://imdb.com/title/${movieId}" target="_blank" class="btn btn-primary">View iMDB Page</a>
                <a href="index.html" class="btn btn-success">Back to Home Page</a>
            </div>
        </div>
        `;
        
        $('#movie').html(output);
    });
}