const API_KEY = '1c5c067e324c39f9223ad13ef9891a0a';
const language = 'uk';

async function fetchTrending(page) {
  try {
    const URL = 'https://api.themoviedb.org/3/trending/movie/week';

    const response = await fetch(
      `${URL}?api_key=${API_KEY}&page=${page}&language=${language}`
    );
    return response.json();
  } catch (error) {
    // обработка ошибки получения данных с бэкэнда
    console.error(error);
  }
}

async function fetchSearchFilm(query, page) {
  try {
    const URL = 'https://api.themoviedb.org/3/search/movie';

    const response = await fetch(
      `${URL}?api_key=${API_KEY}&page=${page}&query=${query}&language=${language}`
    );
    return response.json();
  } catch (error) {
    // обработка ошибки получения данных с бэкэнда
    console.error(error);
  }
}

async function fetchGenres() {
  try {
    const URL = 'https://api.themoviedb.org/3/genre/movie/list';

    const response = await fetch(
      `${URL}?api_key=${API_KEY}&language=${language}`
    );
    return response.json();
  } catch (error) {
    // обработка ошибки получения данных с бэкэнда
    console.error(error);
  }
}

async function fetchIMDbId(filmoId) {
  try {
    console.log(filmoId);
    const URL = 'https://api.themoviedb.org/3/movie/';

    const response = await fetch(`${URL}${filmoId}?api_key=${API_KEY}`);
    return response.json();
  } catch (error) {
    // обработка ошибки получения данных с бэкэнда
    console.error(error);
  }
}

export { fetchTrending, fetchSearchFilm, fetchGenres, fetchIMDbId };
