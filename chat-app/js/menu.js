let menu = document.querySelector('#burger-btn');
let expanded = false;
menu.addEventListener('click', e=>{
    e.preventDefault();
    expanded = !expanded;

    if (expanded) {
        document.querySelector('body').classList.add('burger-expanded');
    } else {
        document.querySelector('body').classList.remove('burger-expanded');
    }
})

let content = document.querySelector('main');
content.addEventListener('click', e=>{
    if (expanded) {
        document.querySelector('body').classList.remove('burger-expanded');
        expanded = false;
    }
});