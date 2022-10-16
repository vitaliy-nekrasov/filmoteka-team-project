const selectEnLangEl = document.querySelector('.en');
const selectUaLangEl = document.querySelector('.uk');

let currentLang = localStorage.getItem('current-lang');
if (currentLang === null) {
  localStorage.setItem('current-lang', 'english');
  currentLang = localStorage.getItem('current-lang');
}

console.log(currentLang);

selectEnLangEl.addEventListener('click', onChangeLang);
selectUaLangEl.addEventListener('click', onChangeLang);

const languageVariable = [
  {
    title: 'title',
    refsEl: document.querySelector('.logo'),
    eng: 'Filmoteka',
    ukr: 'Фільмотека',
  },

  {
    title: 'home',
    refsEl: document.querySelector('#home'),
    eng: 'Home',
    ukr: 'Головна',
  },

  {
    title: 'library',
    refsEl: document.querySelector('#library'),
    eng: 'my library',
    ukr: 'Бібліотека',
  },

  {
    title: 'watched',
    refsEl: document.querySelector('.watched'),
    eng: 'watched',
    ukr: 'Переглянуті',
  },

  {
    title: 'queue',
    refsEl: document.querySelector('.queue'),
    eng: 'queue',
    ukr: 'Черга',
  },

  {
    title: 'error',
    refsEl: document.querySelector('.error__message'),
    eng: 'Search result not successful. Enter the correct movie name and try again',
    ukr: 'Нічого не знайдено! Змініть запит і спробуйте ще раз',
  },

  {
    title: 'rights',
    refsEl: document.querySelector('.footer__content'),
    eng: '© 2022 | All Rights Reserved |',
    ukr: '© 2022 | Всі права захищені |',
  },

  {
    title: 'developed',
    refsEl: document.querySelector('.footer__developer'),
    eng: 'Developed with',
    ukr: 'Створено з',
  },

  {
    title: 'by',
    refsEl: document.querySelector('.footer__before-students'),
    eng: 'by',
    ukr: 'Студентами',
  },

  {
    title: 'students',
    refsEl: document.querySelector('.students'),
    eng: 'Students',
    ukr: '',
  },
];

if (currentLang === 'ukrainian') {
  console.log('ukrainian if');
  languageVariable.map(el => {
    try {
      changeStringLangOnUa(el);
    } catch (error) {
      console.log(error);
    }
  });
  try {
    document.querySelector('.input__form').placeholder = 'Пошук фільму';
  } catch {}
}

function onChangeLang(e) {
  let targetLang = e.target.dataset.lang;
  console.log(targetLang);
  if (currentLang === targetLang) {
    console.log('=');
    return;
  }
  console.log('!=');
  localStorage.setItem('current-lang', targetLang);
  currentLang = targetLang;

  if (currentLang === 'ukrainian') {
    console.log('ukrainian if');
    languageVariable.map(el => {
      try {
        changeStringLangOnUa(el);
      } catch (error) {
        console.log(error);
      }
    });
    try {
      document.querySelector('.input__form').placeholder = 'Пошук фільму';
    } catch {}
  }
  if (currentLang === 'english') {
    console.log('english if');

    languageVariable.map(el => {
      try {
        changeStringLangOnEng(el);
      } catch (error) {
        console.log(error);
      }
    });
    try {
      document.querySelector('.input__form').placeholder = 'Movie search';
    } catch {}
  }

  document.location.reload();
}

function changeStringLangOnUa(el) {
  console.log(el.refsEl);
  el.refsEl.textContent = el.ukr;
}
function changeStringLangOnEng(el) {
  el.refsEl.textContent = el.eng;
  console.log(el.refsEl);
}
