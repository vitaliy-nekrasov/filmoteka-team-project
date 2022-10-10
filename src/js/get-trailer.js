import { loaderShow, loaderHide } from './loader';

const listEl = document.querySelector('.gallery');
const trailerModalEl = document.querySelector('.trailer__modal');
const trailerBackdropEl = document.querySelector('.trailer__backdrop');
listEl.addEventListener('click', getId);
let id = undefined;

function getId(evt) {
  id = evt.target.closest('.gallery__card').id;
  trailerBtnEl.addEventListener('click', onTrailerBtnClick);
  return id;
}

let trailerBtnEl = document.querySelector('.trailer');

function onTrailerBtnClick() {
  fetchTrailerById(id).then(result => {
    console.log(result);
    if (result === undefined) {
      return;
    }
    loaderShow();
    trailerBackdropEl.classList.remove('trailer__hidden');
    trailerModalEl.insertAdjacentHTML('afterbegin', result);
    loaderHide();
    trailerBackdropEl.addEventListener('click', onCloseTrailerModal);
    document.addEventListener('keydown', onCloseTrailerModal);
    // trailerBtnEl.removeEventListener('click', onTrailerBtnClick);
  });
}

async function fetchTrailerById(filmId) {
  try {
    const API_KEY = '1c5c067e324c39f9223ad13ef9891a0a';
    const URL = 'https://api.themoviedb.org/3/movie/';

    const response = await fetch(`${URL}${filmId}/videos?api_key=${API_KEY}`);
    if (!response.ok) {
      return;
    }
    const result = await response.json();
    const getObj = await result.results.find(
      obj => obj.name === 'Official Trailer'
    );
    const getLink = await getObj.key;
    const link =
      await `<iframe class="iframe" width="1400" height="700" src='https://www.youtube.com/embed/${getLink}' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="trailer_video"></iframe>`;
    return link;
  } catch (error) {
    console.error(error);
  }
}

function onCloseTrailerModal() {
  trailerModalEl.innerHTML = '';
  trailerBackdropEl.classList.add('trailer__hidden');
  trailerBackdropEl.removeEventListener('click', onCloseTrailerModal);
  document.removeEventListener('keydown', onCloseTrailerModal);
}
