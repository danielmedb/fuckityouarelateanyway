

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
    const firstTextwElement = document.querySelector('.textW');
       
    if((document.body.getBoundingClientRect()).top > scrollFromTop){
        usePlus = false;
        scrollDirection = 'Up';
    }else{
        usePlus = true;
        scrollDirection = 'Down';
    }
    scrollFromTop = (document.body.getBoundingClientRect()).top;

    // get every textW class.
    const fuckItText = document.querySelectorAll(".textW");
    [...fuckItText].forEach((element) => {
        let currentRotation = parseInt(element.dataset.rotation);
        element.setAttribute('data-rotation', math[usePlus ? '+' : '-'](currentRotation, distance));
        element.style.transform = `rotate(${element.dataset.rotation}deg)`;
    });
    

    const {scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    // console.log(scrollTop);
    if(clientHeight + scrollTop >= scrollHeight - 50 || scrollTop <= 450){

        // If we scroll down(true) or up(false)!
        console.log(scrollDirection);

        // const lastElementColor = document.querySelector('.endless') === null ? main.dataset.color : main.lastElementChild.dataset.color;                       
        // let endlessDiv = document.createElement('div');
        
        createEndlessDiv(scrollDirection);
        
        // if(scrollDown === false){
        //     const firstElementColor = document.querySelector('.endless').dataset.color;
        //     console.log(firstElementColor);
        //     scrollDownColors = random_bg_color(firstElementColor, firstElementColor);
        //     console.log(scrollDownColors);
        //     endlessDiv.classList.add('endless');
        //     endlessDiv.style.setProperty('background', `linear-gradient(${scrollDownColors.second}, ${scrollDownColors.first})`);
        //     endlessDiv.setAttribute('data-color', `${scrollDownColors.second}`);
        //     main.prepend(endlessDiv);  
        // }else{
        //     scrollDownColors = random_bg_color(lastElementColor);
        //     endlessDiv.classList.add('endless');
        //     endlessDiv.style.setProperty('background', `linear-gradient(${scrollDownColors.first}, ${scrollDownColors.second})`);
        //     endlessDiv.setAttribute('data-color', `${scrollDownColors.second}`);
        //     main.append(endlessDiv);   
        // }
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
    
    const countDivs = document.querySelectorAll('div.textW').length;

    const rotationPerCharacter = (180 / text.textContent.length).toFixed();

    let span = document.createElement('div');
    span.classList.add('textW');
    span.setAttribute('data-rotation', (rotationPerCharacter * countDivs));
    span.textContent = i;
    span.style.transform = `rotate(${rotationPerCharacter * countDivs}deg)`;
    clock.append(span);
});
