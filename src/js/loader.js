// REF FOR LOADER BACKDROP
export const maskEl = document.querySelector('.mask');

window.addEventListener('DOMContentLoaded', onWindowLoad);

// FUNCTION FOR LOADER WHEN APP STARTING

export function onWindowLoad() {
  setTimeout(() => {
    maskEl.classList.add('hide');
  }, 600);
}

// LOADER SHOW FUNCTION

export function loaderShow() {
  maskEl.classList.remove('hide');
}

// LOADER HIDE FUNCTION

export function loaderHide() {
  setTimeout(() => {
    maskEl.classList.add('hide');
  }, 600);
}
