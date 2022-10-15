const selectEnLangEl = document.querySelector('.en');
const selectUaLangEl = document.querySelector('.uk');

let currentLang = localStorage.getItem('current-lang');
if (currentLang === null) {
  currentLang = 'english';
}
console.log(currentLang);

selectEnLangEl.addEventListener('click', onChangeLang);
selectUaLangEl.addEventListener('click', onChangeLang);

const refs = {
  title: document.querySelector('.logo'),
  home: document.querySelector('#home'),
  library: document.querySelector('#library'),
  watched: document.querySelector('.watched'),
  queue: document.querySelector('.queue'),
  error: document.querySelector('.error__message'),
  placeholder: document.querySelector('.input__form').placeholder,
  Rights: document.querySelector('.footer__content'),
  Developed: document.querySelector('.footer__develop'),
  by: document.querySelector('.footer__before-students'),
  students: document.querySelector('.students'),
};
const engRender = {
  title: 'Filmoteka',
  home: 'Home',
  library: 'my library',
  watched: 'watched',
  queue: 'queue',
  error:
    'Search result not successful. Enter the correct movie name and try again',
  placeholder: 'Movie search',
  rights: '© 2022 | All Rights Reserved |',
  developed: 'Developed with',
  by: 'by',
  students: 'Students',
};
const ukrRender = {
  title: 'Фільмотека',
  home: 'Home',
  library: 'Бібліотека',
  watched: 'Переглянуті',
  queue: 'Черга',
  error: 'Нічого не знайдено',
  placeholder: 'Пошук фільму',
  rights: '© 2022 | Всі права захищені |',
  developed: 'Розроблено з',
  by: 'Студентами',
  students: '',
};

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
  // ukrainian;
  // english;
}

function cheakF() {
  console.log(engRender);
  for (let i = 0; i < engRender.length; i++) {
    console.log(engRender[i]);
  }
  let str = engRender.toString();
  console.log(str);
  console.log(engRender.toString());
}

cheakF();
