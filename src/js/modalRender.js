import { fetchIMDbId } from './API';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import displaySorryMassege from './library';

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
  try {
    renderModalWindoq(electFilm);
    if (!electFilm.poster_path) {
      document.querySelector('.button-modal__img').src =
        'https://st2.depositphotos.com/3994049/8290/v/950/depositphotos_82902580-stock-illustration-retro-movie-projector-vector-detailed.jpg';
    }
    console.log(electFilm.poster_path);
  } catch (error) {
    console.log(error);
  }

  document.querySelector('.backdrop').classList.remove('display__none');
  document.querySelector('.backdrop').addEventListener('click', e => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  });
  document.addEventListener('keydown', onKeyDownCloseModal);
  const imdbBtnEl = document.querySelector('.imdb-btn');

  imdbBtnEl.addEventListener('click', onGoIMDbPage);
  //Alex
  cheackBtn(electFilm);
}
//Alex
function onKeyDownCloseModal(e) {
  if (e.code === 'Escape') {
    document.removeEventListener('keydown', onKeyDownCloseModal);
    onCloseModal();
  }
}

function cheackBtn(electFilm) {
  let watchedArrLS = JSON.parse(localStorage.getItem(LOCALSTORAGE_WATCHED));
  let queveArrLS = JSON.parse(localStorage.getItem(LOCALSTORAGE_QUEUE));
  const addWatched = document.querySelector('.add__watched');
  const addQueue = document.querySelector('.add_queue');

  addWatched.textContent = 'add to Watched';
  if (!addWatched.dataset.add) {
    addWatched.addEventListener(
      'click',
      onBtnAddClick.bind(this, electFilm, LOCALSTORAGE_WATCHED)
    );
    addWatched.dataset.add = 'true';
  }

  try {
    for (let valueFilm of watchedArrLS) {
      if (valueFilm.id === electFilm.id) {
        addWatched.remove();
        addRemoveWathedBtn(electFilm.id);
        document
          .querySelector('.add__watched')
          .addEventListener(
            'click',
            onBtnRemoveClick.bind(this, electFilm, LOCALSTORAGE_WATCHED)
          );
        break;
      }
    }
  } catch (error) {
    console.log(error);
  }

  addQueue.textContent = 'add to Queue';
  if (!addQueue.dataset.add) {
    addQueue.addEventListener(
      'click',
      onBtnAddClick.bind(this, electFilm, LOCALSTORAGE_QUEUE)
    );
    addQueue.dataset.add = 'true';
  }
  try {
    for (let valueFilm of queveArrLS) {
      if (valueFilm.id === electFilm.id) {
        addQueue.remove();
        addRemoveQueueBtn(electFilm.id);
        document
          .querySelector('.add_queue')
          .addEventListener(
            'click',
            onBtnRemoveClick.bind(this, electFilm, LOCALSTORAGE_QUEUE)
          );
        break;
      }
    }
  } catch (error) {
    console.log(error);
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
  console.log('hi');

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
  // cheackBtn(electFilm);
  if (
    document.querySelector('.watched').dataset.active === 'true' &&
    currentLocalStorage === LOCALSTORAGE_WATCHED
  ) {
    displaySorryMassege(JSON.parse(localStorage.getItem(currentLocalStorage)));
  }

  if (
    document.querySelector('.queue').dataset.active === 'true' &&
    currentLocalStorage == LOCALSTORAGE_QUEUE
  ) {
    displaySorryMassege(JSON.parse(localStorage.getItem(currentLocalStorage)));
  }

  console.dir(arrayAdd);
}

function addRemoveWathedBtn(id) {
  let btn = document.createElement('button');
  btn.type = 'button';
  btn.classList.add('add__watched');
  btn.dataset.id = `${id}`;
  btn.textContent = 'remove from Watched';
  document.querySelector('.watched-item').appendChild(btn);
}

function addRemoveQueueBtn(id) {
  let btn = document.createElement('button');
  btn.type = 'button';
  btn.classList.add('add_queue');
  btn.dataset.id = `${id}`;
  btn.textContent = 'remove from Queue';
  document.querySelector('.queue-item').appendChild(btn);
  // ;
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

function onReadCurrentArrayFilmLS(arr) {
  let filmReadLocalStorage = localStorage.getItem(arr);
  let currentFilmReadLS = JSON.parse(filmReadLocalStorage);
  return currentFilmReadLS;
}

function getFilmById(id) {
  let arr = ['currentArrayFilm', LOCALSTORAGE_WATCHED, LOCALSTORAGE_QUEUE];
  for (elem of arr) {
    try {
      let arrayOfFilms = onReadCurrentArrayFilmLS(elem);
      let electFilm = arrayOfFilms.find(el => el.id === Number(id));
      if (electFilm) {
        return electFilm;
      }
    } catch {
      continue;
    }
  }
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
                <p class="modal__about--title--movie">Vote / Votes <span class="modal__about--rating">${Number.parseInt(
                  vote_average
                )}</span><span

                        class="modal__about--title--movie-slech">/</span> <span
                        class="modal__about--text--bleck">${vote_count}</span>
                        <button class="imdb-btn" data-id="${id}" type="button">IMDb</button>
                        </p>
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
                    <li class="watched-item"><button class="add__watched" data-id="${id}" type="button">add to Watched</button></li>
                    <li class="queue-item"><button class="add_queue" data-id="${id}" type="button">add to queue</button></li>
                    <li class="queue-item"><button class="btn__remove" data-id="${id}" type="button">Remove</button></li>
                </ul>

            </div>
        </div>
    </div>`;

  // <a target="_blank" class="imdb-btn" href="https://www.imdb.com/title/${idInIMDB}">IMDb</a>;

  modalWindowEl.insertAdjacentHTML('beforeend', modalRenderCod);
}
