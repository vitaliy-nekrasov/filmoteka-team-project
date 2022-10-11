import { fetchIMDbId } from './API';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const mainFilmGalleryEl = document.querySelector('.gallery');
const libraryFilmGalleryEl = document.querySelector('.gallery-lib');
const modalWindowEl = document.querySelector('.modal');
const modalCloseBtnEl = document.querySelector('.button-modal__close');
//Alex
const LOCALSTORAGE_WATCHED = 'films-to-watched';
const LOCALSTORAGE_QUEUE = 'films-to-queue';

if (mainFilmGalleryEl) {
  mainFilmGalleryEl.addEventListener('click', onRenderModal);
  modalCloseBtnEl.addEventListener('click', onCloseModal);
}
try {
  libraryFilmGalleryEl.addEventListener('click', onRenderModal);
  modalCloseBtnEl.addEventListener('click', onCloseModal);
} catch (error) {
  console.log(error);
}

function onRenderModal(e) {
  if (e.target === e.currentTarget) {
    return;
  }
  e.preventDefault();

  let filmId = e.target.closest('.gallery__card').id;
  let electFilm = getFilmById(filmId);
  renderModalWindoq(electFilm);
  document.querySelector('.backdrop').classList.remove('display__none');



  imdbBtnEl.addEventListener('click', onGoIMDbPage);
  //Alex
  cheackBtn(electFilm);
}

function cheackBtn(electFilm) {
  let watchedArrLS = JSON.parse(localStorage.getItem(LOCALSTORAGE_WATCHED));
  let queueArrLS = JSON.parse(localStorage.getItem(LOCALSTORAGE_QUEUE));
  const addWatched = document.querySelector('.add__watched');
  const addQueue = document.querySelector('.add_queue');

  const imdbBtnEl = document.querySelector('.imdb-btn');

  imdbBtnEl.addEventListener('click', onGoIMDbPage);
  //Alex


  if (Array.isArray(watchedArrLS)) {
    for (let valueFilm of watchedArrLS) {
      if (valueFilm.id === electFilm.id) {
        addWatched.textContent = 'remove from watched';
        addWatched.dataset.inLibrary = 'true';
        addWatched.removeEventListener('click', onBtnAddClick);
        //Alex
        addWatched.addEventListener(
          'click',
          onBtnRemoveClick.bind(this, electFilm, LOCALSTORAGE_WATCHED)
        );
        break;
      }
    }
  }

  if (Array.isArray(queueArrLS)) {
    for (let valueFilm of queueArrLS) {
      if (valueFilm.id === electFilm.id) {
        addQueue.textContent = 'remove from queve';
        addQueue.dataset.inLibrary = 'true';
        addQueue.removeEventListener('click', onBtnAddClick);
        console.log('был removeEventListener');
        //Alex
        addQueue.addEventListener(
          'click',
          onBtnRemoveClick.bind(this, electFilm, LOCALSTORAGE_QUEUE)
        );
        break;
      }
    }

  cheackBtn(electFilm);
}

function cheackBtn(electFilm) {
  let watchedArrLS = JSON.parse(localStorage.getItem(LOCALSTORAGE_WATCHED));
  let queveArrLS = JSON.parse(localStorage.getItem(LOCALSTORAGE_QUEUE));
  const addWatched = document.querySelector('.add__watched');
  const addQueue = document.querySelector('.add_queue');

  try {
    for (let valueFilm of watchedArrLS) {
      if (valueFilm.id === electFilm.id) {
        // window.alert(`This film has already been added ${textMessage}!`);
        addWatched.textContent = 'remove from watched';
        addWatched.dataset.inLibrary = 'true';
        addWatched.removeEventListener(
          'click',
          onBtnAddClick.bind(this, electFilm, LOCALSTORAGE_WATCHED)
        );
        // addWatched.addEventListener(
        //   'click',
        //   onBtnAddClick.bind(this, electFilm, LOCALSTORAGE_WATCHED)
        // );
        break;
      }
    }
  } catch (error) {
    console.log(error);
  }

  try {
    for (let valueFilm of queveArrLS) {
      if (valueFilm.id === electFilm.id) {
        // window.alert(`This film has already been added ${textMessage}!`);
        addQueue.textContent = 'remove from queve';
        addQueue.dataset.inLibrary = 'true';
        addQueue.removeEventListener(
          'click',
          onBtnAddClick.bind(this, electFilm, LOCALSTORAGE_QUEUE)
        );
        // addQueue.addEventListener(
        //   'click',
        //   onBtnAddClick.bind(this, electFilm, LOCALSTORAGE_QUEUE)
        // );
        break;
      }
    }
  } catch (error) {
    console.log(error);

  }

  if (addWatched.dataset.inLibrary !== 'true') {
    addWatched.addEventListener(
      'click',
      onBtnAddClick.bind(this, electFilm, LOCALSTORAGE_WATCHED)
    );
  }

  if (addQueue.dataset.inLibrary !== 'true') {
    addQueue.addEventListener(
      'click',
      onBtnAddClick.bind(this, electFilm, LOCALSTORAGE_QUEUE)
    );
  }
}

//Alex
async function onBtnAddClick(electFilm, currentLocalStorage, evt) {
  evt.preventDefault();

  let arrayAdd = localStorage.getItem(currentLocalStorage);
  try {
    arrayAdd = JSON.parse(arrayAdd);
    if (!Array.isArray(arrayAdd)) {
      arrayAdd = [];
    }
  } catch {
    arrayAdd = [];
  }

  const textMessage =
    currentLocalStorage === LOCALSTORAGE_WATCHED
      ? 'to the watched'
      : 'to the queue';




  //это будет уже лишний код, когда все заработает
  //т.к. возможности добавить фильм 2 раза у нас априори не будет
  for (let valueFilm of arrayAdd) {
    if (valueFilm.id === electFilm.id) {
      //window.alert(`This film has already been added ${textMessage}!`);
      Notify.info(`This film has already been added ${textMessage}!`);
      return;
    }
  }

  arrayAdd.push(electFilm);
  //window.alert(`New film ${electFilm.title} added ${textMessage}!`);
  Notify.success(`New film ${electFilm.title} added ${textMessage}!`);
  localStorage.setItem(currentLocalStorage, JSON.stringify(arrayAdd));

  cheackBtn(electFilm);

  console.dir(arrayAdd);
}

function onBtnRemoveClick(electFilm, currentLocalStorage, evt) {
  evt.preventDefault();

  let arrayAdd = localStorage.getItem(currentLocalStorage);
  try {
    arrayAdd = JSON.parse(arrayAdd);
    if (!Array.isArray(arrayAdd)) {
      arrayAdd = [];
    }
  } catch {
    arrayAdd = [];
  }

  const textMessage =
    currentLocalStorage === LOCALSTORAGE_WATCHED
      ? 'in the watched'
      : 'in the queue';

  for (let valueFilm of arrayAdd) {
    if (valueFilm.id === electFilm.id) {
      arrayAdd.splice(arrayAdd.indexOf(valueFilm), 1);
      //window.alert(`This film deleted successfully ${textMessage}!`);
      Notify.success(`This film deleted successfully ${textMessage}!`);
    }
  }

  localStorage.setItem(currentLocalStorage, JSON.stringify(arrayAdd));



  cheackBtn(electFilm);

  console.log('after remove');
  cheackBtn(electFilm);

  console.dir(arrayAdd);
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
  //Alex
  addWatched.removeEventListener('click', onBtnAddClick);
  addQueue.removeEventListener('click', onBtnAddClick);
  addWatched.removeEventListener('click', onBtnRemoveClick);
  addQueue.removeEventListener('click', onBtnRemoveClick);

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

function renderModalWindoq(filmEl) {
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
