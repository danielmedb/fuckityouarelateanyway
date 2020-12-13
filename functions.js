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

function color_generator(){
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}


function random_bg_color(bgColor = null, second = null) {
    
    // set main as different colors every reload.
    if(bgColor === null){
        bgColor = color_generator();
    }

    // Set .main data-color
    if(bgColor === 'setMainColor'){
        bgColor = color_generator();
    }

    const nextbgColor = color_generator();
    const colors = {
        first : bgColor,
        second : nextbgColor
    };
    return colors;
}

function createEndlessDiv(scrollDirection){

    const endlessDiv = document.createElement('div');
    endlessDiv.classList.add('endless');

    // Get the first div with class endless and its color. If it doesnt exists. Set the .main color.
    const lastElementColor = document.querySelector('.endless') === null ? 'setMainColor' : main.lastElementChild.dataset.color;  

    if(scrollDirection === 'Down'){

        // Lets get a random color for the next endless div.
        scrollDownColors = random_bg_color(lastElementColor);

        if(lastElementColor === 'setMainColor'){
            main.setAttribute('data-color', `${scrollDownColors.first}`);
        }
        // Set background to linear-gradient
        endlessDiv.style.setProperty('background', `linear-gradient(${scrollDownColors.first}, ${scrollDownColors.second})`);
        endlessDiv.setAttribute('data-color', `${scrollDownColors.second}`);
        endlessDiv.setAttribute('data-colorfirst', `${scrollDownColors.first}`);
        endlessDiv.style.marginTop = '-1px'; // Mobile fix for removing white line between endless divs.
        main.append(endlessDiv);

    }else{ // If scroll up

        const firstDivInScrollUp = document.querySelector('.clock').previousElementSibling;
        
        // Inherit mains data-color if there isnt any .endless above .clock.
        if(firstDivInScrollUp === null){
            elementColor = document.querySelector('.main').dataset.color;
        }else{
            elementColor = document.querySelector('.endless').dataset.color;
        }
        scrollDownColors = random_bg_color(elementColor);
        endlessDiv.style.setProperty('background', `linear-gradient(${scrollDownColors.second}, ${scrollDownColors.first})`);
        endlessDiv.setAttribute('data-color', `${scrollDownColors.second}`);
        main.prepend(endlessDiv);  
    }
}


function setClock(newHour, newMin, newSec){

    // Make it go backwards
    // 366 so that it counts correctly and not 360
    // * 6 = Degrees
    const seconds = 366 - ( newSec * 6 ) - 6;
    const minutes = 366 - ( newMin * 6 ) - 6;
    const hours = 366 - ( newHour * 6 ) - 6;

    // set elements transform
    setRotation(secElement, seconds);  
    setRotation(minElement, minutes);
    setRotation(hourElement, hours);
}


function setRotation(element, rotation){
    element.style.transform = `rotate(${rotation}deg`;
}

// Create clock number and rotate it.
function createNumbers(){
    const clock = document.querySelector('.clock');
    for(let i = 1; i <= 12; i++){
        const number = document.createElement('div');
        number.classList.add('number', `number-${i}`);
        number.textContent = i;
        number.style.transform = `rotate(${i*30}deg)`;
        clock.append(number);
    }
}

let math = {
    '+' : function(x,y) {return x + y;},
    '-' : function(x,y) {return x - y;}
}

const handleScroll= () => {
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
    const textAroundCircle = document.querySelectorAll(".textAroundCircle");
    [...textAroundCircle].forEach((element) => {
        let currentRotation = parseInt(element.dataset.rotation);
        element.setAttribute('data-rotation', math[settings.usePlus ? '+' : '-'](currentRotation, settings.textRotationSpeed));
        //element.style.transform = `rotateZ(${currentRotation - settings.textRotationSpeed}deg)`;
        element.style.transform = `rotateZ(${element.dataset.rotation - settings.startingDeg}deg)`;
    });

    // Create a new endless div in the direction we are scrolling.
    const {scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if(clientHeight + scrollTop >= scrollHeight - 50 || scrollTop <= 450){
        createEndlessDiv(settings.scrollDirection);
    }
};
const handleClickPress = () => {
    // change clock color
    //color = random_bg_color();
    //clock.style.setProperty('background', `linear-gradient(${color.second}, ${color.first})`);

};


const handleKeyPress = () => {

    const fuckDiv = document.querySelector(".fucks");
    const fuckDivLength = settings.onVideo.textAroundCircle.length;
    const fuckVideo = document.querySelector("#fuckVideo");
    
    if(settings.onVideo.playing === false){    
        settings.onVideo.playing = true;
        const startVideo = new Promise((resolve, reject) => {
            initiateVideo();
            fuckVideo.play();
            setTimeout(() => {
                for(let i = 0; i < fuckDivLength; i++){
                    const rotation = ((360 / fuckDivLength) * i).toFixed();

                    const element = document.createElement('div');
                    element.setAttribute('data-id', i);
                    element.classList.add('textAroundCircle__onvideo');
                    element.textContent = settings.onVideo.textAroundCircle[i];
                    element.style.transform = `rotate(${rotation}deg)`;
                    if (!element.style.animation) {
                        element.style.animation = `fadeIn 1s ease forwards ${
                            i*2 / fuckDivLength
                        }s`;
                    }
                    fuckDiv.append(element);
                };
                resolve({message : "success"});
            }, 7800);
        });
        startVideo.then(removeVideo);
        startVideo;
    }
};

function removeVideo(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {                    
            initiateVideo();
            document.querySelectorAll(".textAroundCircle__onvideo").forEach((characters) => {
                characters.remove();
            });

            settings.onVideo.playing = false;
        }, 5000);
    });
}

function initiateVideo(){
    settings.onVideo.single.forEach((div) => {
        document.querySelector(`${div}`).classList.toggle('hide');
        
    });
    settings.onVideo.multi.forEach((div) => {
        let divs = document.querySelectorAll(`${div}`);
        divs.forEach((div) => {
            div.classList.toggle('hide');
        });
    });    
}