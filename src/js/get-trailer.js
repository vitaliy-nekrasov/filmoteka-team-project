import { loaderShow, loaderHide } from './loader';
import Notiflix from 'notiflix';

const listEl = document.querySelector('.gallery');
const libraryListEl = document.querySelector('.gallery-lib');
const trailerModalEl = document.querySelector('.trailer__modal');
const trailerBackdropEl = document.querySelector('.trailer__backdrop');
const trailerBtnEl = document.querySelector('.trailer');
const API_KEY = '1c5c067e324c39f9223ad13ef9891a0a';
const URL = 'https://api.themoviedb.org/3/movie/';
let id = undefined;

try {
  listEl.addEventListener('click', getId);
} catch (error) {
  console.log(error);
}

try {
  libraryListEl.addEventListener('click', getId);
} catch (error) {
  console.log(error);
}

// GET FILM ID WHEN FILM-MODAL OPEN //

function getId(evt) {
  trailerBtnEl.classList.add('hide');
  id = evt.target.closest('.gallery__card').id;
  checkTrailer();
  trailerBtnEl.addEventListener('click', onTrailerBtnClick);
  return id;
}

// GET OBJECT WITH TRAILER FROM API //

async function fetchTrailerById(filmId) {
  try {
    const response = await fetch(`${URL}${filmId}/videos?api_key=${API_KEY}`);
    if (!response.ok) {
      throw new Error(response.status);
    }
    const result = await response.json();

    return result;
  } catch (error) {
    console.log(error);
  }
}

// GET TRAILER MARKUP  //

async function getTrailerMarkup() {
  try {
    const obj = await fetchTrailerById(id);
    const getTrailerObj = await obj.results.find(
      obj => obj.name.includes('Trailer') || obj.type.includes('Trailer')
    );
    if (getTrailerObj === undefined) {
      trailerBtnEl.classList.add('hide');
      Notiflix.Notify.failure('Sorry, trailer not found');
      return;
    }
    const getLink = await getTrailerObj.key;
    const markup =
      await `<iframe class="youtube" width="1400" height="700" src='https://www.youtube.com/embed/${getLink}' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="trailer_video"></iframe>`;
    return markup;
  } catch (error) {
    console.log(error);
  }
}

// ADD TRAILER MARKUP AND ADD LISTENERS FOR CLOSE TRAILER MODAL

function onTrailerBtnClick() {
  getTrailerMarkup().then(result => {
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

// CHECK TRAILER FUNCTION, IF TRAILER NOT FOUND, AND SHOW TRAILER BUTTON IF TRAILER FOUND

function checkTrailer() {
  fetchTrailerById(id).then(result => {
    if (result.results.length > 0) {
      trailerBtnEl.classList.remove('hide');
    }
  });
}
