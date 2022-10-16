// const galleryLib = document.querySelector('.gallery-lib');
// const divContaunerText = document.querySelector('.div__text--decoration');

// if (galleryLib) {
//   function clearGallery() {
//     galleryLib.innerHTML = '';
//   }
// }

// function renderGalleryLib(movie) {
//   console.log(movie);
//   const markupGalleryLib = movie
//     .map(mov => {
//       const { title, genresName, release_date, vote_average, id, poster_path } =
//         mov;
//       return `<li class="gallery__item">
//             <a class="gallery__card" href="#" id="${id}">
//                <picture>
//                   <source media="(min-width: 1280px)" srcset="
//                               https://image.tmdb.org/t/p/w500${poster_path}    1x,
//                               https://image.tmdb.org/t/p/original${poster_path} 2x,
//                               https://image.tmdb.org/t/p/original${poster_path} 3x
//                            " type="image/jpg" />
//                   <source media="(min-width: 768px)" srcset="
//                               https://image.tmdb.org/t/p/w342${poster_path}    1x,
//                               https://image.tmdb.org/t/p/w780${poster_path} 2x,
//                               https://image.tmdb.org/t/p/original${poster_path} 3x
//                            " type="image/jpg" />
//                   <source media="(max-width: 767px)" srcset="
//                               https://image.tmdb.org/t/p/w342${poster_path}    1x,
//                               https://image.tmdb.org/t/p/w780${poster_path} 2x,
//                               https://image.tmdb.org/t/p/original${poster_path} 3x
//                            " type="image/jpg" />
//                   <img class="gallery__foto" src="https://image.tmdb.org/t/p/w500${poster_path}" width="450"
//                      height="294" alt="${title} poster" loading="lazy" />
//                </picture>
//                <h2 class="gallery__subtitle">${title}</h2>
//                <div class="gallery__info">
//                   <p class="gallery__genres">${genresName}</p>
//                   <p class="gallery__year">${release_date}</p>
//                   <p class="gallery__vote-average">${vote_average}</p>
//                </div>
//             </a>
//          </li>`;
//     })
//     .join('');
//   //   console.log(markupGalleryLib);
//   try {
//     clearGallery();
//     galleryLib.insertAdjacentHTML('beforeend', markupGalleryLib);
//   } catch {}
// }

// export default renderGalleryLib;
