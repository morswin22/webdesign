window.addEventListener('scroll',e=>{
    let nav = document.querySelector('nav');
    if (window.pageYOffset == 0) {
        nav.classList.remove('black');
    } else {
        nav.classList.add('black');
    }
})