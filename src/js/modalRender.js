// const listEl = document.querySelector('.gallery');
// listEl.addEventListener('click', e => {
//   let filmId = e.target.closest('.gallery__card').id;
// });

const listEl = document.querySelector('.gallery');
listEl.addEventListener('click', onRenderModal);

function onRenderModal(e) {
  if (e.target === e.currentTarget) {
    console.log('nahui');
    return;
  }

  let filmId = e.target.closest('.card').id;
  console.log(filmId);
  let electFilm = getFilmById(filmId);
  let idGenresOfElectFilm = electFilm.genre_ids;
  let nameGenresOfElectFilm = getGenres(idGenresOfElectFilm);
  let remakeElectFilm = remareFilmObj(electFilm);
  console.log(remakeElectFilm);

  // console.log(nameGenresOfElectFilm);
  // renderModalWindoq(electFilm, nameGenresOfElectFilm);
}

function getGenres(genre_ids) {
  let genres = '';
  const genresLocalStorage = localStorage.getItem('Genres');
  const gen = JSON.parse(genresLocalStorage);

  if (genre_ids.length !== 0) {
    if (genre_ids.length > 3) {
      genre_ids = genre_ids.slice(0, 3);
    }

    Object.values(gen).forEach(value => {
      if (genre_ids.includes(value.id)) {
        genres = genres.concat(value.name, ', ');
      }
    });
  }
  return genres;
}

function onReadCurrentArrayFilmLS() {
  let filmReadLocalStorage = localStorage.getItem('currentArrayFilm');
  currentFilmReadLS = JSON.parse(filmReadLocalStorage);
  return currentFilmReadLS;
}

function getFilmById(id) {
  let arrayOfFilms = onReadCurrentArrayFilmLS();
  let electFilm = arrayOfFilms.find(el => el.id === Number(id));
  return electFilm;
}

function renderModalWindoq(filmEl, genhes) {
  const {
    id,
    title,
    original_title,
    poster_pat,
    popularity,
    vote_average,
    vote_count,
    overview,
  } = filmEl;

  // .innerHTML = ``;
}

function remareFilmObj(film) {
  console.log('film', film);
  film.genresName = getGenres(film.genre_ids);
  console.log('film.genresName', film.genresName);
  return film;
}

// remareFilsmObj(onReadCurrentArrayFilmLS());

function remareFilsmObj(films) {
  console.log('films', films);
  let remake = films.map(el => remareFilmObj(el));
  console.log('remake', remake);
}
