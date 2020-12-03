// create divs of numbers

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
