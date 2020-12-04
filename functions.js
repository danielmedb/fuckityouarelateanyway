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


function random_bg_color(bgColor = null, second = null) {
    const a = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const c = Math.floor(Math.random() * 256);
    
    // set main as different colors every reload.
    if(bgColor === null){
        const x = Math.floor(Math.random() * 256);
        const y = Math.floor(Math.random() * 256);
        const z = Math.floor(Math.random() * 256);
        bgColor = `rgb(${x}, ${y}, ${z})`;
    }


    const nextbgColor = `rgb(${a}, ${b}, ${c})`;
    const colors = {
        first : bgColor,
        second : nextbgColor
    };
    return colors;
}

function createEndlessDiv(scrollDirection){

    const endlessDiv = document.createElement('div');
    endlessDiv.classList.add('endless');

    // Get the first div with class endless and its color. If it doesnt exists. Get the .main color.
    const lastElementColor = document.querySelector('.endless') === null ? main.dataset.color : main.lastElementChild.dataset.color;  
     
    if(scrollDirection === 'Down'){

        // Lets get a random color for the next endless div.
        scrollDownColors = random_bg_color(lastElementColor);

        // Set background to linear-gradient
        endlessDiv.style.setProperty('background', `linear-gradient(${scrollDownColors.first}, ${scrollDownColors.second})`);
        endlessDiv.setAttribute('data-color', `${scrollDownColors.second}`);
        endlessDiv.setAttribute('data-color-first', `${scrollDownColors.first}`);
        main.append(endlessDiv);
    }else{
        const firstDivInScrollUp = document.querySelector('.clock').previousElementSibling;
        const elementColor = document.querySelector('.endless').dataset.color;

        scrollDownColors = random_bg_color(elementColor);
        if(firstDivInScrollUp === null){
            endlessDiv.style.setProperty('background', `linear-gradient(${scrollDownColors.first}, ${scrollDownColors.second})`);
        }else{
            endlessDiv.style.setProperty('background', `linear-gradient(${scrollDownColors.second}, ${scrollDownColors.first})`);
        }
        endlessDiv.setAttribute('data-color', `${scrollDownColors.second}`);
        
        main.prepend(endlessDiv);  
    }
}


function setClock(newHour, newMin, newSec){
    const deg = 360;
    
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

createNumbers();
