let wrapper = document.querySelector('#bin-counter');

// config
const n_leds = 4;

// create algorythm
let number = 0;
function refreshLeds() {
    let output = [];
    let copied = number;
    while(true) {
        output.push(copied%2);
        copied = Math.floor(copied/2);
        if (!copied) {
            break;
        }
    }

    while(output.length < n_leds) {
        output.push(0);
    }
    while(output.length > n_leds) {
        output.pop();
    }
    output.reverse();

    for(let id in output) {
        let state = output[id];
        if (state) {
            leds[id].classList.add('powered');
        } else {
            leds[id].classList.remove('powered');
        }
    }
}

// setup DOM
let leds = [];
for (let i = 0; i < n_leds; i++) {
    let led = document.createElement('div');
    wrapper.appendChild(led);
    leds.push(led);
}

let button = document.createElement('button');
button.innerHTML = 'Add 1';
button.addEventListener('click', e=>{
    number++;
    refreshLeds();
});
wrapper.appendChild(button);