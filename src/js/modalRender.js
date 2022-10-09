import { fetchIMDbId } from './API';

const listEl = document.querySelector('.gallery');
const modalWindowEl = document.querySelector('.modal');
const modalCloseBtnEl = document.querySelector('.button-modal__close');

listEl.addEventListener('click', onRenderModal);
modalCloseBtnEl.addEventListener('click', onCloseModal);

function onRenderModal(e) {
  if (e.target === e.currentTarget) {
    return;
  }
  e.preventDefault();

  let filmId = e.target.closest('.gallery__card').id;
  let electFilm = getFilmById(filmId);
  renderModalWindoq(electFilm);
  document.querySelector('.backdrop').classList.remove('display__none');

  const addWatched = document.querySelector('.add__watched');
  const addQueue = document.querySelector('.add_queue');
  const imdbBtnEl = document.querySelector('.imdb-btn');

  imdbBtnEl.addEventListener('click', onGoIMDbPage);
  // addWatched.addEventListener('click', e => console.log(e));
  // addQueue.addEventListener('click', e => console.log(e));
}

async function onGoIMDbPage(e) {
  let filmId = e.target.dataset.id;
  console.log(e.target.dataset.id);
  let idIMDb = await getIMDbId(filmId);
  let getHref = `https://www.imdb.com/title/${idIMDb}`;
  console.log(window.open(getHref));
}

function onCloseModal(e) {
  const addWatched = document.querySelector('.add__watched');
  const addQueue = document.querySelector('.add_queue');
  const imdbBtnEl = document.querySelector('.imdb-btn');

  imdbBtnEl.removeEventListener('click', onGoIMDbPage);
  // addWatched.removeEventListener('click', e => console.log(e));
  // addQueue.removeEventListener('click', e => console.log(e));

  document.querySelector('.backdrop').classList.add('display__none');
  document.querySelector('.button-modal--flex').remove();
  localStorage.removeItem('IMDb_id');
}

async function getIMDbId(filmId) {
  await fetchIMDbId(filmId).then(responce => {
    localStorage.setItem('IMDb_id', JSON.stringify(responce.imdb_id));
  });

  let idIMDb = await JSON.parse(localStorage.getItem('IMDb_id'));
  return idIMDb;
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
  // document.querySelector('.modal').lastChild.remove();
  let modalRenderCod = `    
        <div class="button-modal--flex">
            <img class="button-modal__img" src="https://image.tmdb.org/t/p/original${poster_path}" alt="${title} poster">
            <div class="modal__about--movie">
                <h2 class="modal__about--title">${title}</h2>
                <p class="modal__about--title--movie">Vote / Votes <span class="modal__about--rating">${vote_average}</span><span

                        class="modal__about--title--movie-slech">/</span> <span
                        class="modal__about--text--bleck">${vote_count}</span>
                        </p>
                        <button class="imdb-btn" data-id="${id}" type="button">IMDb</button>
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
                    <li><button class="add_queue" data-id="${id}" type="button">add to queue</button></li>
                </ul>

            </div>
        </div>
    </div>`;

  // <a target="_blank" class="imdb-btn" href="https://www.imdb.com/title/${idInIMDB}">IMDb</a>;

  modalWindowEl.insertAdjacentHTML('beforeend', modalRenderCod);
}
