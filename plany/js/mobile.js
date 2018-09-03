let left = document.querySelector('#left img');
let right = document.querySelector('#right img');

let day = (new Date()).getDay();
if (day > 5) {
    day = 1;
}

const move = e => {
    left.style.visibility = 'initial';
    right.style.visibility = 'initial';
    if (day == 1) {
        left.style.visibility = 'hidden';
    }
    if (day == 5) {
        right.style.visibility = 'hidden';
    }
    let actives = document.querySelectorAll('.active');
    for(let active of actives) {
        active.classList.remove('active');
    }
    let id = day * 2;
    let cols = [
        document.querySelector(`.column:nth-child(${id - 1})`),
        document.querySelector(`.column:nth-child(${id})`)
    ];
    for(let col of cols) {
        col.classList.add('active');
    }
    document.querySelector(`.day:nth-child(${day})`).classList.add('active');
}

move();

left.addEventListener('click', e=> {
    day--;
    if (day < 1) {
        day = 1;
    }
    move();
});

right.addEventListener('click', e=> {
    day++;
    if (day > 5) {
        day = 5;
    }
    move();
});