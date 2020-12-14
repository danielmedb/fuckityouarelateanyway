



// Set up global settings
let settings = {
    touchEvent : 'ontouchstart' in window ? 'touchstart' : 'click', // on mobile or desktop?
    scrollFromTop : 0, // To verify how close to the top we are. This will change as we scroll.
    textRotationSpeed : 12, // How many degrees will the textAroundCricle rotate when we are scrolling.
    usePlus : true, // Depending if we scroll up or down. This will change to "true" or "false" when we are scrolling.
    ScrollDirection : '', // Will be set to "Up" or "Down" to verify in which direction we are scrolling.
    endless : 5, // How many endless divs that will be created on load.
    scrollToDiv : 4, // Scroll down to the X .endless div to make it possible to scroll from start.
    fadeIn : 1, // Fade in time for the clock.
    startingDeg : 88, // In which deg. should textAroundCircle start at.
    textAroundCircle : `Fuck it! You're late anyway.`,
    ScrollAnimation : {
        visible : true, // Show a mouse on desktop and finger on mobile devices.
        desktop : 'mouse', // Icon that will be shown on desktop devices.
        mobile : 'finger', // Icon that will be shown on mobile devices.
        fadeOut : 4, // When X new .endless divs has been created when scrolling. Fade out the scroll animation. 
        fadeOutTime : 1, // Fade out time in seconds.
        onFinishText : '', // When animation is done, show this text.
    },
    onVideo : { // Video settings.
           'single' : ['.hour', '.min', '.sec', '.dot', '.fucksVideo'],
           'multi' : ['.number', '.textAroundCircle'],
           'textAroundCircle' : 'FUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUUCK',
           'playing' : false
    },
};



const body = document.querySelector('body');
const main = document.querySelector('.main');
const clock = document.querySelector('.clock');

const createTextAroundCircle = document.createElement('div');
createTextAroundCircle.classList.add('zerofucksgiven');
createTextAroundCircle.textContent = settings.textAroundCircle;
clock.append(createTextAroundCircle);

const text = document.querySelector('.zerofucksgiven');

// Get hour, min and sec divs.
const hourElement = document.querySelector(".hour");
const minElement = document.querySelector(".min");
const secElement = document.querySelector(".sec");
const dotElement = document.querySelector(".dot");


window.onload = () => {

    // Scroll down to the settings.scrollToDiv .endless div to make it possible to scroll from start.
    document.querySelectorAll('.endless')[settings.scrollToDiv].scrollIntoView();

    // Show or hide scrolling animation.
    if(settings.ScrollAnimation.visible){

        const _this = settings.ScrollAnimation;
        const animation = document.createElement('div');
        const motion = document.createElement(window.innerWidth <= 900 ? 'img' : 'div');
        motion.src = 'middleFinger.png';
        animation.classList.add(window.innerWidth <= 900 ? _this.mobile : _this.desktop);
        motion.classList.add(window.innerWidth <= 900 ? 'moveFinger' : 'scrollWheel');

        animation.append(motion);
        body.append(animation);
    }
};

// Set H:m:s
let newTime = setNewTime();

// Create the numbers around the clock.
createNumbers();

// Get all number after createNumbers() is executed.
const allNumbers = document.querySelectorAll('.number');


// Create endless divs.
for(let a = 0; a <= settings.endless; a++){
    if(a % 2){
        createEndlessDiv('Up');
    }else{
        createEndlessDiv('Down');
    }
}


// Clone newTime if we want to use newTime somewhere else so we dont mutate it!
let time = {...newTime}
setInterval(function() {
    
    time.sec = (time.sec === 59 ? 0 : time.sec + 1);
    time.min = (time.sec === 0 ? time.min + 1 : time.min);
    time.hour = (time.min === 0 ? time.hour + 1 : time.hour);

    setClock(time.hour, time.min, time.sec);
}, 1000);

// Get the text around the clock and rotate it in a cricle.
[...text.textContent].forEach((index, key) => {
    const countDivs = document.querySelectorAll('div.textAroundCircle').length;

    const rotationPerCharacter = (180 / text.textContent.length).toFixed();

    let span = document.createElement('div');
    span.classList.add('textAroundCircle');
    span.setAttribute('data-rotation', (rotationPerCharacter * countDivs));
    span.textContent = index;
    span.style.opacity = 0;

    span.style.animation = `fadeIn 1s ease forwards ${
        key / text.textContent.length + 0.4
    }s`;    
    clock.append(span);
});

// Event handlers 
clock.addEventListener('click', handleClickPress);
document.addEventListener('scroll', handleScroll);
document.addEventListener('keypress', handleKeyPress);