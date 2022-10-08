const refs = {
    watched: document.querySelector('.watched'),
    queue: document.querySelector('.queue')
}

refs.watched.addEventListener('click', ()=>{
    refs.watched.classList.add('active');
    refs.queue.classList.remove('active');
});

refs.queue.addEventListener('click', ()=>{
    refs.queue.classList.add('active');
    refs.watched.classList.remove('active');
});