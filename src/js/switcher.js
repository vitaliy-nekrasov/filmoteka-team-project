const themeSwitch = document.querySelector('#theme-switch');

themeSwitch.addEventListener('change', switchTheme);

const darkTheme = {
  mainText: '#fff',
  footerText: '#D2D2D2',
  bgdGallary: '#292C35',
  bgdFooter: '#242424',
  light: '#F7F7F7',
  dark: '#FF6B08',
};

const lightTheme = {
  mainText: '#000',
  footerText: '#545454',
  bgdGallary: '#fff',
  bgdFooter: '#F7F7F7',
  light: '#FF6B08',
  dark: '#F7F7F7',
};

let currentTheme = localStorage.getItem('current-theme');
if (currentTheme === null) {
  currentTheme = 'light';
}
// console.log(currentTheme);

const element = document.documentElement;

if (currentTheme === 'dark') {
  themeSwitch.checked = true;
  startColor();
}

function switchTheme() {
  // const aboutMeContainer = document.querySelector('.about');
  // const factsContainer = document.querySelector('.codex');

  if (currentTheme === 'dark') {
    element.style.setProperty('--color-bg-main', lightTheme.bgdGallary);
    element.style.setProperty('--color-text-main', lightTheme.mainText);
    element.style.setProperty('--color-bg-footer', lightTheme.bgdFooter);
    element.style.setProperty('--color-text-footer', lightTheme.footerText);

    element.style.setProperty('--color-theme-svg-light', lightTheme.light);
    element.style.setProperty('--color-theme-svg-dark', lightTheme.dark);
    // aboutMeContainer.classList.add('about--light');
    // factsContainer.classList.add('codex--light');
    localStorage.setItem('current-theme', 'light');
    currentTheme = localStorage.getItem('current-theme');
  } else {
    element.style.setProperty('--color-bg-main', darkTheme.bgdGallary);
    element.style.setProperty('--color-text-main', darkTheme.mainText);
    element.style.setProperty('--color-bg-footer', darkTheme.bgdFooter);
    element.style.setProperty('--color-text-footer', darkTheme.footerText);

    element.style.setProperty('--color-theme-svg-light', darkTheme.light);
    element.style.setProperty('--color-theme-svg-dark', darkTheme.dark);

    // aboutMeContainer.classList.remove('about--light');
    // factsContainer.classList.remove('codex--light');

    localStorage.setItem('current-theme', 'dark');
    currentTheme = localStorage.getItem('current-theme');
  }
}

function startColor() {
  element.style.setProperty('--color-bg-main', darkTheme.bgdGallary);
  element.style.setProperty('--color-text-main', darkTheme.mainText);
  element.style.setProperty('--color-bg-footer', darkTheme.bgdFooter);
  element.style.setProperty('--color-text-footer', darkTheme.footerText);

  element.style.setProperty('--color-theme-svg-light', darkTheme.light);
  element.style.setProperty('--color-theme-svg-dark', darkTheme.dark);
}
