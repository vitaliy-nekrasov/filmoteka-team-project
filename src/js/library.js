const refs = {
    watched: document.querySelector('.watched'),
    queue: document.querySelector('.queue')
}

try {
    refs.watched.addEventListener('click', () => {
      refs.watched.classList.add('active');
      refs.queue.classList.remove('active');
    });
  } catch (eror) {
    console.log(eror);
  }
  
  try {
    refs.queue.addEventListener('click', () => {
      refs.queue.classList.add('active');
      refs.watched.classList.remove('active');
    });
  } catch (eror) {
    console.log(eror);
  }


// refs.watched.addEventListener('click', ()=>{
//     refs.watched.classList.add('active');
//     refs.queue.classList.remove('active');
// });

// refs.queue.addEventListener('click', ()=>{
//     refs.queue.classList.add('active');
//     refs.watched.classList.remove('active');
// });