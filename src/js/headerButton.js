//Alex
const btnWatched = document.querySelector('.watched');
const btnQueue = document.querySelector('.queue');
const LOCALSTORAGE_WATCHED = 'films-to-watched';
const LOCALSTORAGE_QUEUE = 'films-to-queue';

if (btnWatched) {
  btnWatched.addEventListener(
    'click',
    onBtnStorage.bind(this, LOCALSTORAGE_WATCHED)
  );
}
if (btnQueue) {
  btnQueue.addEventListener(
    'click',
    onBtnStorage.bind(this, LOCALSTORAGE_QUEUE)
  );
}

function onBtnStorage(currentLocalStorage, evt) {
  evt.preventDefault();

  const savedData = localStorage.getItem(currentLocalStorage);
  try {
    const parsedData = JSON.parse(savedData);
    console.log(parsedData);
  } catch {
    console.log('Не получилось распарсить JSON');
    console.log(savedData);
  }
}
