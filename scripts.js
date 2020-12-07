



// Set up global settings
let settings = {
    scrollFromTop : 0, // To verify how close to the top we are.
    textRotationSpeed : 4, // How many degrees will the text rotate while we are scrolling
    usePlus : true, // Depending on we scroll up or down. 
    ScrollDirection : '', // Will be set to "Up" or "Down" to verify in which direction we are scrolling.
    endless : 5, // How many endless divs shall we create on onload?
    scrollToDiv : 4, // Scroll down to the X .endless div to make it possible to scroll from start.
    fadeIn : 1, // How fast shall the clock pointers show. In seconds.
    startingDeg : 80, // In which degree shall the text start at?
    ScrollAnimation : {
        visible : true, // Show a mouse on desktop and finger on mobile devices.
        desktop : 'mouse', // Icon that will be shown on desktop devices.
        mobile : 'finger', // Icon that will be shown on mobile devices.
        fadeOut : 4, // When X new .endless divs has been created. Fade out the scroll animation. 
        fadeOutTime : 1, // Fade out time in seconds.
        onFinishText : 'Fuck this!', // When animation is done, show this text.

    }
};


const body = document.querySelector('body');
const main = document.querySelector('.main');
const text = document.querySelector('.zerofucksgiven');
const clock = document.querySelector('.clock');

// Scroll down to the settings.scrollToDiv .endless div to make it possible to scroll from start.
window.onload = () => {
   document.querySelectorAll('.endless')[settings.scrollToDiv].scrollIntoView();

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



// Create 6 endless divs.
for(let a = 0; a <= settings.endless; a++){
    if(a % 2){
        createEndlessDiv('Up');
    }else{
        createEndlessDiv('Down');
    }
}


let math = {
    '+' : function(x,y) {return x + y;},
    '-' : function(x,y) {return x - y;}
}


window.addEventListener('scroll', () => {

    if(settings.ScrollAnimation.visible){
        // Remove scrollAnimation
        const endlessDivsLength = document.querySelectorAll('.endless').length;
        if(endlessDivsLength - 6 === settings.ScrollAnimation.fadeOut && settings.ScrollAnimation.visible){

            const animationElement = document.querySelector((document.querySelector(".moveFinger") ? '.finger' : '.mouse'));
            settings.ScrollAnimation.visible = false;
            animationElement.style.animation = `fadeOut 2s ease forwards 0s`;
            const text = document.createElement('div');
            text.classList.add('animationText');
            body.append(text);
            text.textContent = settings.ScrollAnimation.onFinishText;
            //text.style.animation = `fadeIn 2s ease forwards 2s`;
        }
        
    }
    if((document.body.getBoundingClientRect()).top > settings.scrollFromTop){
        settings.usePlus = false;
        settings.scrollDirection = 'Up';
    }else{
        settings.usePlus = true;
        settings.scrollDirection = 'Down';
    }
    settings.scrollFromTop = (document.body.getBoundingClientRect()).top;
   
    // get every fuckit class.
    const fuckItText = document.querySelectorAll(".fuckit");
    [...fuckItText].forEach((element) => {
        let currentRotation = parseInt(element.dataset.rotation);
        element.setAttribute('data-rotation', math[settings.usePlus ? '+' : '-'](currentRotation, settings.textRotationSpeed));
        element.style.transform = `rotateZ(${element.dataset.rotation - settings.startingDeg}deg)`;
    });

    // Create a new endless div in the direction we are scrolling.
    const {scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if(clientHeight + scrollTop >= scrollHeight - 50 || scrollTop <= 450){
        createEndlessDiv(settings.scrollDirection);
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


// Get the text around the clock and rotate it in a cricle.
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
