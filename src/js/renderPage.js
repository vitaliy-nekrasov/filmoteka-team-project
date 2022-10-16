// if (localStorage.getItem('current-lang') === 'ukrainian')
import { fetchSearchFilm, fetchTrending, fetchGenres } from './API.js';
import { fetchTrendingUa, fetchSearchFilmUa, fetchGenresUa } from './API_UA.js';

import renderGalleryLib from './renderMainGallery';
import { loaderShow, loaderHide } from './loader.js';
import createPagination from './pagination';

const selectEnLangEl = document.querySelector('.en');
const selectUaLangEl = document.querySelector('.uk');
const gallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
const error = document.querySelector('.error__message');
const pagginationListEl = document.querySelector('.pagination__list--main');

if (form) {
  form.addEventListener('input', inputFilterFilm);
  form.addEventListener('submit', onSubmitFilterFilm);
}

// let page = 1;
let searchNameFilm = '';

let currentArrFilmLS = [];
let currentFilmReadLS = [];

// Получение с бэкэнда массива жанров фильмов и сохраниние его в LocalStorage для дальнейшей работы

fetchGenres().then(responce => {
  localStorage.setItem('Genres', JSON.stringify(responce.genres));
});

if (localStorage.getItem('current-lang') === 'ukrainian') {
  fetchGenresUa().then(responce => {
    localStorage.setItem('Genres', JSON.stringify(responce.genres));
  });
}

// Чтение перед загрузкой стартовой страницы сохраненного массива жанров фильмов

const gen = localStorage.getItem('Genres');
const getCurrentArrayFilmLS = localStorage.getItem('currentArrayFilm');
const currentArrayFilms = JSON.parse(getCurrentArrayFilmLS);

function inputFilterFilm(event) {
  searchNameFilm = event.target.value;
}

function onSubmitFilterFilm(event) {
  event.preventDefault();
  if (!searchNameFilm) {
    return;
  }
  clearGallery();

  pagginationListEl.removeEventListener('click', onRenderPageNumber);
  pagginationListEl.addEventListener('click', onRenderPageNumberByWord);

  getFilmByName(searchNameFilm, 1);
}

function onRenderPageNumberByWord(evt) {
  console.log('film by name');
  if (!evt.target.closest('.numb')) {
    return;
  }
  let pageNumber = evt.target.closest('.numb').dataset.page;
  console.log(evt.target.closest('.numb').dataset.page);
  let page = pageNumber;
  clearGallery();
  getFilmByName(searchNameFilm, Number(page));
}

function getFilmByName(searchNameFilm, page) {
  if (localStorage.getItem('current-lang') === 'ukrainian') {
    fetchSearchFilmUa(searchNameFilm, page)
      .then(responce => {
        loaderShow();
        renderFilmoteka(responce, page);
        loaderHide();
      })
      .catch(error => {
        console.log(error);
      });
    return;
  }
  fetchSearchFilm(searchNameFilm, page)
    .then(responce => {
      loaderShow();
      renderFilmoteka(responce, page);
      loaderHide();
    })
    .catch(error => {
      console.log(error);
    });
}

function getPopularFilmArr(page) {
  if (localStorage.getItem('current-lang') === 'ukrainian') {
    fetchTrendingUa(page)
      .then(responce => {
        loaderShow();
        renderFilmoteka(responce, page);
        loaderHide();
      })
      .catch(error => {
        console.log(error);
      });
    return;
  }

  fetchTrending(page)
    .then(responce => {
      loaderShow();
      renderFilmoteka(responce, page);
      loaderHide();
    })
    .catch(error => {
      console.log(error);
    });
}

getPopularFilmArr(1);

function renderFilmoteka(films, page) {
  const arrayFilms = films.results;
  const totalFilms = films.total_results;
  const totalPage = films.total_pages;
  let updateCurrentArrFilmsLS = getCurrentArrFilmsLS(arrayFilms);
  renderGalleryLib(updateCurrentArrFilmsLS);
  createPagination(totalPage, page);
  if (totalPage === 1) {
    pagginationListEl.innerHTML = '';
  }
}

// \\\\\\\\\\\\\\\\\\\\

function getCurrentArrFilmsLS(arrayFilms) {
  currentArrFilmLS = [];
  const markup = arrayFilms.map(card => {
    // Формирование массива текущей страницы для записи в LocalStorage для последующего использования в модальном окне
    currentArrFilmLS.push(card);
  });
  // console.log('currentArrFilmLS', currentArrFilmLS);
  if (currentArrFilmLS.length == 0) {
    error.style.display = 'block';
    return JSON.parse(localStorage.getItem('currentArrayFilm'));
  }
  let arrayFilmsWithGenderName = remareFilsmObj(currentArrFilmLS);
  localStorage.setItem(
    'currentArrayFilm',
    JSON.stringify(arrayFilmsWithGenderName)
  );
  // console.log('LS', arrayFilmsWithGenderName);
  return arrayFilmsWithGenderName;
}

function remareFilsmObj(films) {
  return films.map(el => remareFilmObj(el));
}

function remareFilmObj(film) {
  film.genresName = getGenres(film.genre_ids);
  let vote = String(film.vote_average);

  let popularity = String(film.popularity);
  let indexOfDot = popularity.indexOf('.');
  if (indexOfDot === -1) {
    popularity += '.0';
  } else {
    popularity = popularity.slice(0, indexOfDot + 2);
  }
  film.popularity = popularity;

  if (vote.length === 1) {
    film.vote_average = vote.padEnd(3, '.0');
    return film;
  }
  if (vote.length >= 4) {
    film.vote_average = vote.slice(0, 3);
    return film;
  }
  return film;
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
  genres = genres.slice(0, genres.length - 2);
  return genres;
}

// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

function clearGallery() {
  gallery.innerHTML = '';
}

// Очистка галереи
try {
  pagginationListEl.addEventListener('click', onRenderPageNumber);
} catch {}

function onRenderPageNumber(evt) {
  console.log('популярні фільми');
  if (!evt.target.closest('.numb')) {
    return;
  }
  let pageNumber = evt.target.closest('.numb').dataset.page;
  console.log(evt.target.closest('.numb').dataset.page);
  let page = pageNumber;
  clearGallery();
  getPopularFilmArr(Number(page));
}
