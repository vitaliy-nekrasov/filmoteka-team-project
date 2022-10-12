import { loaderShow, loaderHide } from './loader';

const listEl = document.querySelector('.gallery');
const trailerModalEl = document.querySelector('.trailer__modal');
const trailerBackdropEl = document.querySelector('.trailer__backdrop');
const trailerBtnEl = document.querySelector('.trailer');
let id = undefined;
listEl.addEventListener('click', getId);

// GET FILM ID WHEN FILM-MODAL OPEN //

function getId(evt) {
  id = evt.target.closest('.gallery__card').id;
  checkTrailer(id);
  trailerBtnEl.addEventListener('click', onTrailerBtnClick);
  return id;
}

// GET TRAILER LINK AND GENERATE TRAILER MARKUP //

async function fetchTrailerById(filmId) {
  try {
    const API_KEY = '1c5c067e324c39f9223ad13ef9891a0a';
    const URL = 'https://api.themoviedb.org/3/movie/';

    const response = await fetch(`${URL}${filmId}/videos?api_key=${API_KEY}`);
    if (!response.ok) {
      return;
    }
    const result = await response.json();
    const getObj = await result.results.find(obj =>
      obj.name.includes('Trailer')
    );
    const getLink = await getObj.key;
    const link =
      await `<iframe class="iframe" width="1400" height="700" src='https://www.youtube.com/embed/${getLink}' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="trailer_video"></iframe>`;
    return link;
  } catch (error) {
    console.error(error);
  }
}

// ADD TRAILER MARKUP TO INDEX.HTML AND SHOW TRAILER-MODAL //

function onTrailerBtnClick() {
  fetchTrailerById(id).then(result => {
    if (result === undefined) {
      return;
    }
    loaderShow();
    trailerBackdropEl.classList.remove('trailer__hidden');
    trailerModalEl.insertAdjacentHTML('afterbegin', result);
    loaderHide();
    trailerBackdropEl.addEventListener('click', onCloseTrailerModal);
    document.addEventListener('keydown', onCloseTrailerModal);
  });
}

// CLOSE TRAILER-MODAL, REMOVE TRAILER MARKUP FROM INDEX.HTML AND REMOVE EVENT LISTENERS //

function onCloseTrailerModal() {
  trailerModalEl.innerHTML = '';
  trailerBackdropEl.classList.add('trailer__hidden');
  trailerBackdropEl.removeEventListener('click', onCloseTrailerModal);
  document.removeEventListener('keydown', onCloseTrailerModal);
}

// CHECK TRAILER FUNCTION, IF TRAILER NOT FOUND - HIDE TRAILER BUTTON

async function checkTrailer(filmId) {
  try {
    const API_KEY = '1c5c067e324c39f9223ad13ef9891a0a';
    const URL = 'https://api.themoviedb.org/3/movie/';

    const response = await fetch(`${URL}${filmId}/videos?api_key=${API_KEY}`);
    if (!response.ok) {
      return;
    }
    const result = await response.json();
    if (result.results.length === 0) {
      trailerBtnEl.classList.add('hide');
    } else {
      trailerBtnEl.classList.remove('hide');
    }
    return;
  } catch (error) {
    console.error(error);
  }
}
