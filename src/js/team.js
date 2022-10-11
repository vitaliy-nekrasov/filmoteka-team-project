import students from './teamData.json';
import studentsTemplate from '../templates/team-modal.hbs';
import * as basicLightbox from 'basiclightbox';

const refs = {
  studentGoit: document.querySelector('.btn'),
  backdrop: document.querySelector('[data-modal]'),
  modal: document.querySelector('.team-modal'),
};

const markupStudentsModal = studentsTemplate(students);
const instance = basicLightbox.create(markupStudentsModal);

refs.studentGoit.addEventListener('click', onOpenModal);

function onOpenModal() {
  instance.show();

  window.addEventListener('keydown', onCloseModal);

  function onCloseModal(event) {
    if (event.code === 'Escape') {
      instance.close();
      window.removeEventListener('keydown', onCloseModal);
    }
  }
}
