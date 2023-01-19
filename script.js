let world = document.getElementById('world')
let direction = 'right'
for (let i = 1; i < 401; i++) {
    let excel = document.createElement('div');
    world.appendChild(excel);
    excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');
let x = 1,
    y = 20;

for (let i = 0; i < excel.length; i++) {
    if (x > 20) {
        x = 1;
        y--;
    }
    excel[i].setAttribute('posX', x);
    excel[i].setAttribute('posY', y);
    x++
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function drawSnake() {
    let posX = getRandomInt(1,21);
    let posY = getRandomInt(1,21);
    return [posX,posY];
}
let coordinates = drawSnake();
let snake  = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "'+ coordinates[1] + '"]'),
document.querySelector('[posX = "' + (coordinates[0] - 1) + '"][posY = "'+ coordinates[1] + '"]'),
document.querySelector('[posX = "' + (coordinates[0] - 2)+ '"][posY = "'+ coordinates[1] + '"]'),
document.querySelector('[posX = "' + (coordinates[0] - 3)+ '"][posY = "'+ coordinates[1] + '"]'),
document.querySelector('[posX = "' + (coordinates[0] - 4)+ '"][posY = "'+ coordinates[1] + '"]')]

for (let i = 0; i < snake.length; i++) {
    snake[i].classList.add('snake');
}

snake[0].classList.add('head');


let food;


function move () {
    let snakeCordinates = [snake[0].getAttribute('posX'),snake[0].getAttribute('posY')];
    snake[0].classList.remove('head');
    snake[snake.length-1].classList.remove('snake');
    snake.pop(); 
    if (direction == 'right') {
        if (snakeCordinates[0] < 20) {
            snake.unshift(document.querySelector('[posX = "' + (+snakeCordinates[0] + 1) + '"][posY = "'+ snakeCordinates[1] + '"]'));
        }else {
            snake.unshift(document.querySelector('[posX = "1"][posY = "'+ snakeCordinates[1] + '"]'))
        }
    } else if (direction == 'left') {
        if (snakeCordinates[0] > 1) {
            snake.unshift(document.querySelector('[posX = "' + (+snakeCordinates[0] - 1) + '"][posY = "'+ snakeCordinates[1] + '"]'));
        }else {
            snake.unshift(document.querySelector('[posX = "20"][posY = "'+ snakeCordinates[1] + '"]'))
        }
    } else if (direction == 'up') {
        if (snakeCordinates[1] < 20) {
            snake.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "'+ (+snakeCordinates[1] + 1) + '"]'));
        }else {
            snake.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "1"]'))
        }
    } else if (direction == 'down') {
        if (snakeCordinates[1] > 1) {
            snake.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "'+ (+snakeCordinates[1] - 1) + '"]'));
        }else {
            snake.unshift(document.querySelector('[posX = "' + snakeCordinates[0] + '"][posY = "20"]'))
        }
    }
    snake[0].classList.add('head')
    for (let i = 0; i < snake.length; i++) {
        snake[i].classList.add('snake');
    }
}


let interval = setInterval(move, 300)

window.addEventListener('keydown', function(e) {
    if (e.code == "KeyD" && direction != 'left') {
        direction = 'right'
    }
    if (e.code == "KeyA" && direction != 'right') {
        direction = 'left'
    }
    if (e.code == "KeyW" && direction != 'down') {
        direction = 'up'
    }
    if (e.code == "KeyS" && direction != 'up')  {
        direction = 'down'
    }
});

function drawFood (){

    function generationFood() {
        let posX = getRandomInt(1,20)
        let posY = getRandomInt(1,20)
        return [posX, posY];
    }

    let foodCoordinates = generationFood();
    food = document.querySelector('[posX = "' + foodCoordinates[0] + '"][posY = "'+ foodCoordinates[1] + '"]');
    
    console.log(foodCoordinates)
    console.log(food.classList.contains('snake'))

    while(food.classList.contains('snake')) {
        let foodCoordinates = generationFood();
        food  = document.querySelector('[posX = "' + foodCoordinates[0] + '"][posY = "'+ foodCoordinates[1] + '"]');
    }

    food.classList.add('food'); 

}
drawFood()
