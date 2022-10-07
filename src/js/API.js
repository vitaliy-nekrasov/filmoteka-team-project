const API_KEY = '1c5c067e324c39f9223ad13ef9891a0a';

async function fetchTrending(page) {
  try {
    const URL = 'https://api.themoviedb.org/3/trending/movie/week';

    const response = await fetch(`${URL}?api_key=${API_KEY}&page=${page}`);
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
      `${URL}?api_key=${API_KEY}&page=${page}&query=${query}`
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

    const response = await fetch(`${URL}?api_key=${API_KEY}`);
    return response.json();
  } catch (error) {
    // обработка ошибки получения данных с бэкэнда
    console.error(error);
  }
}

export { fetchTrending, fetchSearchFilm, fetchGenres };

// Комментарии по поиску
//        Галерея:
// Название фильма: title
// Жанры: genre_ids  реализованы через localStorage
// Год выхода фильма: release_date   нужно slice обрезать и оставить первые 4 знака (тип строка)
// Оценка пользователей : vote_average  нужно округлить до 1 знака после запятой

// Модальное окно:
// дополнительно к Галерее:
// Количество отзывов vote_count
// Популярность popularity
// Оригинальное название original_title
// Описание overview
