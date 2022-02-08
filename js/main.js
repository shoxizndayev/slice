var elFilmsList = document.querySelector('.films__list');
var elFilmTemplate = document.querySelector('#film-template').content;
var elGenreTemplate = document.querySelector('#film-genre-template').content;
var elFilmsSelect = document.querySelector('.film-select');
var elFilmForm = document.querySelector(`.film__form`);
var elSliceForm = document.querySelector(`.film__slice`);


function normalizeDate(newData){
    var dataFilm = new Date(newData);
    var day = String(dataFilm.getDate()).padStart(2, 0);
    var month = String(dataFilm.getMonth()+1).padStart(2, 0);
    var year = dataFilm.getFullYear();

    return day + '.' + month + '.' + year
}

var generateGenres = (films) => {
	var genres = [];

	films.forEach((film) => {
		film.genres.forEach((genre) => {
			if (!genres.includes(genre)) {
				genres.push(genre);
			}
		});
	});

	return genres;
};

const renderGenresSelect = (genres, element) => {
	element.innerHTML = null;

	genres.forEach((genre) => {
		var newOption = document.createElement('option');
		newOption.value = genre;
		newOption.textContent = genre;

		element.appendChild(newOption);
	});
};

renderGenresSelect(generateGenres(films), elFilmsSelect);

var renderGenres = (array, element) => {
	element.innerHTML = null;

	array.forEach((genre) => {
		var genreTemplate = elGenreTemplate.cloneNode(true);

		genreTemplate.querySelector('.film-genre').textContent = genre;

		element.appendChild(genreTemplate);
	});
};

var renderFilms = (array, element) => {
	element.innerHTML = null;

	array.forEach((film) => {
		var filmTemplate = elFilmTemplate.cloneNode(true);

		filmTemplate.querySelector('.film__title').textContent = film.title;
		filmTemplate.querySelector('.film__image').src = film.poster;
		filmTemplate.querySelector('.film__overview').textContent =
			film.overview;
		filmTemplate.querySelector('.film__time').textContent = normalizeDate(film.release_date);

		var elGenres = filmTemplate.querySelector('.film__genres');

		renderGenres(film.genres, elGenres);

		element.appendChild(filmTemplate);
	});
};

function firstOption(option) {
    const newOption = document.querySelector("option");
    newOption.value = "All";
    newOption.textContent = "All";
}

firstOption();

elFilmForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    let selectGenresArray = []

    films.forEach(film => {

        if(elFilmsSelect.value == 'All') {
            selectGenresArray.push(film)
        }

        else if (film.genres.includes(elFilmsSelect.value)) {
            selectGenresArray.push(film)
        }
});

renderFilms(selectGenresArray, elFilmsList)
});

renderFilms(sliceFilm(films), elFilmsList);

function sliceFilm(sliceArray) {
	const FilmsPage = sliceArray.slice(0, 9);

	return FilmsPage
}

