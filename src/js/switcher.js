const darkTheme = {
  mainText: '#fff',
  footerText: '#D2D2D2',
  bgdGallary: '#292C35',
  bgdFooter: '#242424',
};

const lightTheme = {
  mainText: '#000',
  footerText: '#545454',
  bgdGallary: '#000',
  bgdFooter: '#F7F7F7',
};

let currentTheme = 'dark';

const element = document.documentElement;

function switchTheme() {
  const aboutMeContainer = document.querySelector('.about');
  const factsContainer = document.querySelector('.codex');

  if (currentTheme === 'dark') {
    element.style.setProperty('--theme-accent', lightTheme.accent);
    element.style.setProperty('--theme-main', lightTheme.main);
    element.style.setProperty('--theme-bgd', lightTheme.bgd);
    element.style.setProperty('--theme-modal-bgd', lightTheme.modalBgd);
    element.style.setProperty('--theme-btn-text', lightTheme.btnText);
    element.style.setProperty('--theme-moto-text', '#7a7982');

    aboutMeContainer.classList.add('about--light');
    factsContainer.classList.add('codex--light');

    currentTheme = 'light';
  } else {
    element.style.setProperty('--theme-accent', darkTheme.accent);
    element.style.setProperty('--theme-main', darkTheme.main);
    element.style.setProperty('--theme-bgd', darkTheme.bgd);
    element.style.setProperty('--theme-modal-bgd', darkTheme.modalBgd);
    element.style.setProperty('--theme-btn-text', darkTheme.btnText);
    element.style.setProperty('--theme-moto-text', '#FFF');

    aboutMeContainer.classList.remove('about--light');
    factsContainer.classList.remove('codex--light');

    currentTheme = 'dark';
  }
}

const themeSwitch = document.querySelector('#theme-switch');

themeSwitch.addEventListener('change', switchTheme);
