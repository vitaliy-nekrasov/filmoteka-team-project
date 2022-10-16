function clearGallery() {
  gallery.innerHTML = '';
}

const galleryLib = document.querySelector('.gallery');

const getCurrentArrayFilmLS = localStorage.getItem('currentArrayFilm');
const currentArrayFilms = JSON.parse(getCurrentArrayFilmLS);

function renderGalleryLib(movie) {
  const markupGalleryLib = movie.map(mov => renderOneCard(mov)).join('');
  galleryLib.insertAdjacentHTML('beforeend', markupGalleryLib);
}

function renderOneCard(film) {
  const { title, genresName, release_date, id, poster_path } = film;
  if (poster_path === null) {
    return `<li class="gallery__item">
            <a class="gallery__card" href="#" id="${id}">
                  <img class="gallery__foto" src="https://st2.depositphotos.com/3994049/8290/v/950/depositphotos_82902580-stock-illustration-retro-movie-projector-vector-detailed.jpg" width="450"
                     height="294" alt="${title} poster" loading="lazy" />
               <h2 class="gallery__subtitle">${title}</h2>
               <div class="gallery__info">
                  <p class="gallery__genres">${genresName}</p>
                  <p class="gallery__year">${release_date.slice(0, 4)}</p>
               </div>
            </a>
         </li>`;
  }
  return `<li class="gallery__item">
            <a class="gallery__card" href="#" id="${id}">
               <picture>
                  <source media="(min-width: 1280px)" srcset="
                              https://image.tmdb.org/t/p/w342${poster_path}    1x,
                              https://image.tmdb.org/t/p/w780${poster_path} 2x,
                              https://image.tmdb.org/t/p/original${poster_path} 3x
                           " type="image/jpg" />
                  <source media="(min-width: 768px)" srcset="
                              https://image.tmdb.org/t/p/w342${poster_path}    1x,
                              https://image.tmdb.org/t/p/w500${poster_path} 2x,
                              https://image.tmdb.org/t/p/original${poster_path} 3x
                           " type="image/jpg" />
                  <source media="(max-width: 767px)" srcset="
                              https://image.tmdb.org/t/p/w342${poster_path}    1x,
                              https://image.tmdb.org/t/p/w500${poster_path} 2x,
                              https://image.tmdb.org/t/p/w780${poster_path} 3x
                           " type="image/jpg" />
                  <img class="gallery__foto" src="https://image.tmdb.org/t/p/w342${poster_path}" width="450"
                     height="294" alt="${title} poster" loading="lazy" />
               </picture>
               <h2 class="gallery__subtitle">${title}</h2>
               <div class="gallery__info">
                  <p class="gallery__genres">${genresName}</p>
                  <p class="gallery__year">${release_date.slice(0, 4)}</p>
               </div>
            </a>
         </li>`;
}

export default renderGalleryLib;
