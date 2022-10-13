const refs = {
    formEl: document.querySelector('.form'),
    inputEl: document.querySelector('.input__form'),
    buttonEl: document.querySelector('.submit'),
    error: document.querySelector('.error__message'),
    enLang: document.querySelector('.en'),
    ukLang: document.querySelector('.uk'),
    header: document.querySelector('.header'),
    main: document.querySelector('main'),
    languageBox: document.querySelector('.language_box')
}

refs.enLang.addEventListener('click', ()=>{
    refs.enLang.classList.add('activeLang');
    refs.ukLang.classList.remove('activeLang');
});

refs.ukLang.addEventListener('click', ()=>{
    refs.ukLang.classList.add('activeLang');
    refs.enLang.classList.remove('activeLang');
});

try {
    refs.formEl.addEventListener('submit', getValue);
} catch (eror) {
    console.log(eror);
}

function getValue (e){
    e.preventDefault();
    const formValue = e.currentTarget.elements[0].value
    refs.error.style.display = 'none';
if (formValue == ''){
    refs.error.style.display = 'block';
}
    e.currentTarget.reset();
}

// document.addEventListener('scroll', onManeHide)

// function onManeHide (){
// refs.languageBox.style.display = 'none';
// refs.formEl.style.display = 'none';
// refs.header.style.paddingBottom = '10px'
// }

