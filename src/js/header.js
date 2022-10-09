const refs = {
    formEl: document.querySelector('.form'),
    inputEl: document.querySelector('.input__form'),
    buttonEl: document.querySelector('.submit'),
    error: document.querySelector('.error__message')
}

try {
    refs.formEl.addEventListener('submit', getValue);
} catch (eror) {
    console.log(eror);
}

// refs.formEl.addEventListener('submit', getValue);

function getValue (e){
    e.preventDefault();
    const formValue = e.currentTarget.elements[0].value
    refs.error.style.display = 'none';
if (formValue == ''){
    refs.error.style.display = 'block';
}
    e.currentTarget.reset();
}