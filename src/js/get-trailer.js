const listEl = document.querySelector('.gallery');
const trailerModalEl = document.querySelector('.trailer__modal');
const trailerBackdropEl = document.querySelector('.trailer__backdrop');
listEl.addEventListener('click', getId);

async function getId(evt) {
  let filmId = await evt.target.closest('.gallery__card').id;
  let trailerBtnEl = await document.querySelector('.trailer');
  let listener = await trailerBtnEl.addEventListener('click', () => {
    fetchTrailerById(filmId).then(result => {
      if (result === undefined) {
        return;
      }
      trailerBackdropEl.classList.remove('trailer__hidden');
      trailerModalEl.insertAdjacentHTML('afterbegin', result);
    });
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
      await `<iframe width="1400" height="700" src='https://www.youtube.com/embed/${getLink}' frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="trailer_video"></iframe>`;
    return link;
  } catch (error) {
    console.error(error);
  }
}

trailerBackdropEl.addEventListener('click', () => {
  trailerModalEl.innerHTML = '';
  trailerBackdropEl.classList.add('trailer__hidden');
});
