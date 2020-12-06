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
        main.append(endlessDiv);

    }else{ // If scroll up

        const firstDivInScrollUp = document.querySelector('.clock').previousElementSibling;
        
        // Inherit mains data-color is there isnt any .endless above .clock.
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
