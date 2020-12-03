function setNewTime(){
    let newTimeSec = Math.floor(Math.random() * 60); 
    let newTimeMin = Math.floor(Math.random() * 60); 
    let newTimeHour = Math.floor(Math.random() * 12); 
    let time = {
        sec : newTimeSec,
        min : newTimeMin,
        hour : newTimeHour
    };
    return time;
}

let newTime = setNewTime();

const body = document.querySelector('body');
const main = document.querySelector('.main');

document.addEventListener('scroll', () => {
    body.style.background = '';
    window.onscroll = function(ev) {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            const lastElementColor = document.querySelector('.endless') === null ? main.dataset.color : main.lastElementChild.dataset.color;                       
            const endlessDiv = document.createElement('div');
            endlessDiv.classList.add('endless');
            const colors = random_bg_color(lastElementColor);
            endlessDiv.style.setProperty('background', `linear-gradient(${colors.first}, ${colors.second})`);
            endlessDiv.setAttribute('data-color', `${colors.second}`);
            document.querySelector(".main").append(endlessDiv);            
        }
    };
});

document.addEventListener('click', () => {
    alert('Fuck it! You\'re late anyway!');
});

document.addEventListener('keypress', () => {
    // body.style.background = random_bg_color();
});

function random_bg_color(bgColor) {
    const a = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const c = Math.floor(Math.random() * 256);

    const nextbgColor = `rgb(${a}, ${b}, ${c})`;
    
    const colors = {
        first : bgColor,
        second : nextbgColor
    };
    return colors;
}



setInterval(function() {
   
    newTime.sec = (newTime.sec === 59 ? 0 : newTime.sec + 1);
    newTime.min = (newTime.sec === 0 ? newTime.min + 1 : newTime.min);
    newTime.hour = (newTime.min === 0 ? newTime.hour + 1 : newTime.hour);
   
    setClock(newTime.hour, newTime.min, newTime.sec);
}, 1000);

const hour = document.querySelector(".hour"),
min = document.querySelector(".min"),
sec = document.querySelector(".sec");


function setClock(newHour, newMin, newSec){
    const deg = 360;
    
    // Make it go backwards
    // 366 so that it counts correctly and not 360
    // * 6 = Degrees
    const seconds = 366 - ( newSec * 6 ) - 6;
    const minutes = 366 - ( newMin * 6 ) - 6;
    const hours = 366 - ( newHour * 6 ) - 6;

    // set elements transform
    setRotation(sec, seconds);  
    setRotation(min, minutes);
    setRotation(hour, hours);
}


function setRotation(element, rotation){
    element.style.transform = `rotate(${rotation}deg`;
}