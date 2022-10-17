const API_KEY = '1c5c067e324c39f9223ad13ef9891a0a';
const language = 'uk';

async function fetchTrendingUa(page) {
  try {
    const URL = 'https://api.themoviedb.org/3/trending/movie/week';

    const response = await fetch(
      `${URL}?api_key=${API_KEY}&page=${page}&language=${language}`
    );
    return response.json();
  } catch (error) {
    // обработка ошибки получения данных с бэкэнда
    // console.error(error);
  }
}

async function fetchSearchFilmUa(query, page) {
  try {
    const URL = 'https://api.themoviedb.org/3/search/movie';

    const response = await fetch(
      `${URL}?api_key=${API_KEY}&page=${page}&query=${query}&language=${language}`
    );
    return response.json();
  } catch (error) {
    // обработка ошибки получения данных с бэкэнда
    // console.error(error);
  }
}

async function fetchGenresUa() {
  try {
    const URL = 'https://api.themoviedb.org/3/genre/movie/list';

    const response = await fetch(
      `${URL}?api_key=${API_KEY}&language=${language}`
    );
    return response.json();
  } catch (error) {
    // обработка ошибки получения данных с бэкэнда
    // console.error(error);
  }
}

export { fetchTrendingUa, fetchSearchFilmUa, fetchGenresUa };
