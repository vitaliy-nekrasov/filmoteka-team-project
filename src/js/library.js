// import renderGalleryLib from './gallery-lib';
const galleryLib = document.querySelector('.gallery-lib');
const divContaunerText = document.querySelector('.container-lib');
const bodyEl = document.querySelector('.body__lib');
const mainEl = document.querySelector('.main__lib');

// const JSON.parse(localStorage.getItem('films-to-watched')) = JSON.parse(localStorage.getItem('films-to-watched'));
// const JSON.parse(localStorage.getItem('films-to-queue')) = JSON.parse(localStorage.getItem('films-to-queue'));

const refs = {
  watched: document.querySelector('.watched'),
  queue: document.querySelector('.queue'),
  enLang: document.querySelector('.en'),
  ukLang: document.querySelector('.uk'),
};

refs.enLang.addEventListener('click', () => {
  refs.enLang.classList.add('activeLang');
  refs.ukLang.classList.remove('activeLang');
});

refs.ukLang.addEventListener('click', () => {
  refs.ukLang.classList.add('activeLang');
  refs.enLang.classList.remove('activeLang');
});

try {
  refs.watched.addEventListener('click', () => {
    refs.watched.classList.add('active');
    refs.queue.classList.remove('active');
    refs.watched.dataset.active = true;
    refs.queue.dataset.active = false;
    displaySorryMassege(JSON.parse(localStorage.getItem('films-to-watched')));
  });
} catch (eror) {
  console.log(eror);
}

try {
  refs.queue.addEventListener('click', () => {
    refs.queue.classList.add('active');
    refs.watched.classList.remove('active');
    refs.queue.dataset.active = true;
    refs.watched.dataset.active = false;
    displaySorryMassege(JSON.parse(localStorage.getItem('films-to-queue')));
  });
} catch (eror) {
  console.log(eror);
}

try {
  displaySorryMassege(JSON.parse(localStorage.getItem('films-to-watched')));
} catch (eror) {
  console.log(eror);
}

function clearGallery() {
  galleryLib.innerHTML = '';
}

function renderGalleryLib(movie) {
  console.log(movie);
  const markupGalleryLib = movie.map(mov => renderOneCard(mov)).join('');
  try {
    clearGallery();
    galleryLib.insertAdjacentHTML('beforeend', markupGalleryLib);
  } catch {}
}

function renderOneCard(film) {
  const { title, genresName, release_date, vote_average, id, poster_path } =
    film;
  if (poster_path === null) {
    return `<li class="gallery__item">
          <a class="gallery__card" href="#" id="${id}">
            <img class="gallery__foto" src="https://st2.depositphotos.com/3994049/8290/v/950/depositphotos_82902580-stock-illustration-retro-movie-projector-vector-detailed.jpg" width="450"
                height="294" alt="${title} poster" loading="lazy" />
              <h2 class="gallery__subtitle">${title}</h2>
              <div class="gallery__info">
                <p class="gallery__genres">${genresName}</p>
                <p class="gallery__year">${release_date.slice(0, 4)}</p>
                <p class="gallery__vote-average">${Number.parseInt(
                  vote_average
                )}</p>
              </div>
          </a>
        </li>`;
  }
  return `<li class="gallery__item">
            <a class="gallery__card" href="#" id="${id}">
               <picture>
                  <source media="(min-width: 1280px)" srcset="
                              https://image.tmdb.org/t/p/w500${poster_path}    1x,
                              https://image.tmdb.org/t/p/original${poster_path} 2x,
                              https://image.tmdb.org/t/p/original${poster_path} 3x
                           " type="image/jpg" />
                  <source media="(min-width: 768px)" srcset="
                              https://image.tmdb.org/t/p/w342${poster_path}    1x,
                              https://image.tmdb.org/t/p/w780${poster_path} 2x,
                              https://image.tmdb.org/t/p/original${poster_path} 3x
                           " type="image/jpg" />
                  <source media="(max-width: 767px)" srcset="
                              https://image.tmdb.org/t/p/w342${poster_path}    1x,
                              https://image.tmdb.org/t/p/w780${poster_path} 2x,
                              https://image.tmdb.org/t/p/original${poster_path} 3x
                           " type="image/jpg" />
                  <img class="gallery__foto" src="https://image.tmdb.org/t/p/w500${poster_path}" width="450"
                     height="294" alt="${title} poster" loading="lazy" />
               </picture>
               <h2 class="gallery__subtitle">${title}</h2>
               <div class="gallery__info">
                  <p class="gallery__genres">${genresName}</p>
                  <p class="gallery__year">${release_date.slice(0, 4)}</p>
                  <p class="gallery__vote-average">${Number.parseInt(
                    vote_average
                  )}</p>
               </div>
            </a>
         </li>`;
}

function displaySorryMassege(filmArr) {
  if (!filmArr || filmArr.length === 0) {
    clearGallery();
    divContaunerText.classList.remove('display__none');
    galleryLib.classList.add('display__none');
    bodyEl.classList.add('body__lib--active');
    mainEl.classList.add('main__lib--active');
    return;
  }
  divContaunerText.classList.add('display__none');
  bodyEl.classList.remove('body__lib--active');
  mainEl.classList.remove('main__lib--active');
  galleryLib.classList.remove('display__none');
  renderGalleryLib(filmArr);
}

export default displaySorryMassege;

// https://st2.depositphotos.com/3994049/8290/v/950/depositphotos_82902580-stock-illustration-retro-movie-projector-vector-detailed.jpg
// https://raw.githubusercontent.com/Musiyan98/filmoteka_by_ITLegend/294f7580f993e56cfcb9868583f8a3dff47f1830/src/images/universalPoster.svg
