import {
  fetchSearchFilm,
  fetchTrending,
  fetchGenres,
  fetchIMDbId,
} from './API.js';

import renderGalleryLib from './renderMainGallery';
import { loaderShow, loaderHide } from './loader.js';
import createPagination from './pagination';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
const error = document.querySelector('.error__message');
const pagginationListEl = document.querySelector('.pagination__list');

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

// Чтение перед загрузкой стартовой страницы сохраненного массива жанров фильмов

const gen = localStorage.getItem('Genres');
const getCurrentArrayFilmLS = localStorage.getItem('currentArrayFilm');
const currentArrayFilms = JSON.parse(getCurrentArrayFilmLS);

function inputFilterFilm(event) {
  searchNameFilm = event.target.value;
}

function onSubmitFilterFilm(event) {
  event.preventDefault();
  clearGallery();

  pagginationListEl.removeEventListener('click', onRenderPageNumber);
  pagginationListEl.addEventListener('click', onRenderPageNumberByWord);

  getFilmByName(searchNameFilm, 1);
}

function onRenderPageNumberByWord(evt) {
  console.log('film by name');
  if (!evt.target.closest('.page-number-span')) {
    return;
  }
  let pageNumber = evt.target.closest('.page-number-span').dataset.page;
  console.log(evt.target.closest('.page-number-span').dataset.page);
  page = pageNumber;
  clearGallery();
  getFilmByName(searchNameFilm, Number(page));
}

function getFilmByName(searchNameFilm, page) {
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

// Чтение из LocalStorage массива текущей страницы галереи
// function onReadCurrentArrayFilmLS() {
//   let filmReadLocalStorage = localStorage.getItem('currentArrayFilm');
//   currentFilmReadLS = JSON.parse(filmReadLocalStorage);

//   // // console.log(currentFilmReadLS);
// }

// onReadCurrentArrayFilmLS();
// // console.log(currentFilmReadLS);

// Получение ID  фильма с объекта в LS
// function onReadIdFromLS(numberFilmPage) {
//   return currentFilmReadLS[numberFilmPage].id;
// }

// Получение IMDb_id с бэкэнда через ID фильма с картотеки с сохранением IMDb_id в LS

// // console.log(localStorage.getItem());

// Чтение IMDb_id с LS для получения ссылки на сайт IMDb
// let idIMDb = JSON.parse(localStorage.getItem('IMDb_id'));
// // console.log(idIMDb);

// Пример открытия ссылки в новой вкладке
// // console.log(window.open(`https://www.imdb.com/title/${idIMDb}`, '_blank'));

// function makeGallery(arrayCards) {
//   const API_IMAGE = 'https://image.tmdb.org/t/p';
//   currentArrFilmLS = [];
//   const markup = arrayCards
//     .map(card => {
//       // Формирование массива текущей страницы для записи в LocalStorage для последующего использования в модальном окне
//       currentArrFilmLS.push(card);
//       //
//       let genres = '';
//       const genresLocalStorage = localStorage.getItem('Genres');
//       const gen = JSON.parse(genresLocalStorage);
//       if (card.genre_ids.length !== 0) {
//         Object.values(gen).forEach(value => {
//           if (card.genre_ids.includes(value.id)) {
//             genres = genres.concat(value.name, ', ');
//           }
//         });
//       }
//       genres = genres.slice(0, genres.length - 2);
//       return `<div class="card" id="${card.id}">
//       <img class="gallery__image" src="${API_IMAGE}/w300${card.poster_path}" alt="Постер не найден" loading="lazy" />
//     <p class="genres">${genres}</p>
//   </div>`;
//     })
//     .join('');
//   gallery.insertAdjacentHTML('beforeend', markup);

//   // Удаление из LocalStorage массива жанров фильмов
//   // localStorage.removeItem('Genres');
//   // Сохранение в LocalStorage массива фильмов текущей страницы
// }

// Очистка галереи
try {
  pagginationListEl.addEventListener('click', onRenderPageNumber);
} catch {}

function onRenderPageNumber(evt) {
  console.log('популярні фільми');
  if (!evt.target.closest('.page-number-span')) {
    return;
  }
  let pageNumber = evt.target.closest('.page-number-span').dataset.page;
  console.log(evt.target.closest('.page-number-span').dataset.page);
  page = pageNumber;
  clearGallery();
  getPopularFilmArr(Number(page));
}
