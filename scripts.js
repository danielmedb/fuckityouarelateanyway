

let newTime = setNewTime();

const body = document.querySelector('body');
const main = document.querySelector('.main');
const text = document.querySelector('.zerofucksgiven');
const clock = document.querySelector('.clock');


const mainColor = random_bg_color();
main.style.setProperty('background', `linear-gradient(${mainColor.first}, ${mainColor.second})`);



for(let a = 0; a <= 5; a++){
    if(a % 2){
        createEndlessDiv('Up');
    }else{
        createEndlessDiv('Down');
    }
}

let scrollFromTop = 0;
let direction = 0;
let distance = 4;
let usePlus = true;
let scrollDirection = '';

let math = {
    '+' : function(x,y) {return x + y;},
    '-' : function(x,y) {return x - y;}
}

window.addEventListener('scroll', () => {
    let scrollDownColors;
    // get first textW element
    // const firstTextwElement = document.querySelector('.textW');
       
    if((document.body.getBoundingClientRect()).top > scrollFromTop){
        usePlus = false;
        scrollDirection = 'Up';
    }else{
        usePlus = true;
        scrollDirection = 'Down';
    }
    scrollFromTop = (document.body.getBoundingClientRect()).top;

    // get every fuckit class.
    const fuckItText = document.querySelectorAll(".fuckit");
    startingDeg = 80;
    [...fuckItText].forEach((element) => {
        let currentRotation = parseInt(element.dataset.rotation);
        element.setAttribute('data-rotation', math[usePlus ? '+' : '-'](currentRotation, distance));
        element.style.transform = `rotateZ(${element.dataset.rotation - startingDeg}deg)`;
    });
    

    const {scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    // console.log(scrollTop);
    if(clientHeight + scrollTop >= scrollHeight - 50 || scrollTop <= 450){
        createEndlessDiv(scrollDirection);
    }
});

document.addEventListener('click', () => {
    const fuckItText = text.textContent;

});

document.addEventListener('keypress', () => {
    // body.style.background = random_bg_color();
});


// Clone newTime if we want to use newTime somewhere else.
let time = {...newTime}
setInterval(function() {
    
    time.sec = (time.sec === 59 ? 0 : time.sec + 1);
    time.min = (time.sec === 0 ? time.min + 1 : time.min);
    time.hour = (time.min === 0 ? time.hour + 1 : time.hour);

    setClock(time.hour, time.min, time.sec);
}, 1000);

// Get hour, min and sec divs.
const hourElement = document.querySelector(".hour");
const minElement = document.querySelector(".min");
const secElement = document.querySelector(".sec");

[...text.textContent].forEach((i) => {
    
    const countDivs = document.querySelectorAll('div.fuckit').length;

    const rotationPerCharacter = (180 / text.textContent.length).toFixed();

    let span = document.createElement('div');
    span.classList.add('fuckit');
    span.setAttribute('data-rotation', (rotationPerCharacter * countDivs));
    span.textContent = i;
    span.style.transform = `rotate(${rotationPerCharacter * countDivs}deg)`;
    clock.append(span);
});
