// const listEl = document.querySelector('.gallery');
// listEl.addEventListener('click', e => {
//   let filmId = e.target.closest('.gallery__card').id;
// });

import fetchIMDbId from './API';

const listEl = document.querySelector('.gallery');
listEl.addEventListener('click', onRenderModal);

document.querySelector('.button-modal__close').addEventListener('click', e => {
  document.querySelector('.backdrop').classList.add('display__none');
  document.querySelector('.modal').lastChild.remove();
  // console.log(document.querySelector('.modal').lastChild);
  // очистить локал стор
});

function onRenderModal(e) {
  if (e.target === e.currentTarget) {
    // console.log('nahui');
    return;
  }

  let filmId = e.target.closest('.gallery__card').id;
  let electFilm = getFilmById(filmId);
  let idGenresOfElectFilm = electFilm.genre_ids;
  let nameGenresOfElectFilm = getGenres(idGenresOfElectFilm);
  let remakeElectFilm = remareFilmObj(electFilm);
  // console.log(remakeElectFilm);

  // \\\\\\\
  // fetchIMDbId(onReadIdFromLS(filmId)).then(responce => {
  //   localStorage.setItem('IMDb_id', JSON.stringify(responce.imdb_id));
  // });
  let idIMDb = JSON.parse(localStorage.getItem('IMDb_id'));
  // // console.log(idIMDb);
  // \\\\\\\

  renderModalWindoq(remakeElectFilm, idIMDb);
  document.querySelector('.backdrop').classList.remove('display__none');

  // // console.log(nameGenresOfElectFilm);
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
  let currentFilmReadLS = JSON.parse(filmReadLocalStorage);
  return currentFilmReadLS;
}

function getFilmById(id) {
  let arrayOfFilms = onReadCurrentArrayFilmLS();
  let electFilm = arrayOfFilms.find(el => el.id === Number(id));
  return electFilm;
}

function renderModalWindoq(filmEl, idInIMDB) {
  const {
    id,
    title,
    original_title,
    poster_path,
    popularity,
    vote_average,
    vote_count,
    overview,
    genresName,
  } = filmEl;
  document.querySelector('.modal').lastChild.remove();
  let modalRenderCod = `    
        <div class="button-modal--flex">
            <img class="button-modal__img" src="https://image.tmdb.org/t/p/original${poster_path}" alt="${title} poster">
            <div class="modal__about--movie">
                <h2 class="modal__about--title">${title}</h2>
                <p class="modal__about--title--movie">Vote / Votes <span class="modal__about--rating">${vote_average}</span><span
                        class="modal__about--title--movie-slech">/</span> <span
                        class="modal__about--text--bleck">${vote_count}</span>
                </p>
                <a target="_blank" class="imdb-btn" href="https://www.imdb.com/title/${idInIMDB}">IMDb</a>

                <p class="modal__about--title--movie">Popularity<span
                        class="modal__about--text--popularity">${popularity}</span>
                <p class="modal__about--title--movie">Original Title<span class="modal__about--text--original--title">A
                        ${original_title}</span>
                <p class="modal__about--title--movie">Genre<span class="modal__about--text--genre">${genresName}</span>
                </p>
                </p>
                <p class="about__movie--text">About</p>
                <p class="about__movie--text--content">${overview}</p>
                <ul class="list__btn--add">
                    <li><button class="add__watched" data-id="${id}" type="button">add to Watched</button></li>
                    <li><button class="aadd_queue" data-id="${id}" type="button">add to queue</button></li>
                    <li><button class="trailer" type="button"><img height="50" width="50" src="./images/youtube.svg" alt="" /></button></li>
                </ul>

            </div>
        </div>
    </div>`;

  document
    .querySelector('.modal')
    .insertAdjacentHTML('beforeend', modalRenderCod);
}

function remareFilmObj(film) {
  // console.log('film', film);
  film.genresName = getGenres(film.genre_ids);
  // console.log('film.genresName', film.genresName);
  return film;
}

// remareFilsmObj(onReadCurrentArrayFilmLS());

function remareFilsmObj(films) {
  // console.log('films', films);
  let remake = films.map(el => remareFilmObj(el));
  // console.log('remake', remake);
}
