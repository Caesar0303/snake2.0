let world = document.getElementById('world');
let scoreCount = document.getElementById('score');
let recordCount = document.getElementById('record')
let direction = 'right'
let score = 0;
let record = [];
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
    let posX = getRandomInt(3,18);
    let posY = getRandomInt(3,18);
    return [posX,posY];
}
let coordinates = drawSnake();
let snake  = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "'+ coordinates[1] + '"]'),]

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

function snakeUpdate () {

    for (let i = 1; i < snake.length; i++) {
    if (snake[0].getAttribute('posY') == snake[i].getAttribute('posY') && snake[0].getAttribute('posX') == snake[i].getAttribute('posX')) {
        console.log('!')
        for (let y = 0; y < snake.length;y++) {
            snake[y].classList.remove('snake');
            snake[0].classList.remove('head');
        }
        snake  = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "'+ coordinates[1] + '"]'),]
        record.push(score);
        console.log(record);
        var max = record[0];
            for (let z = 1; z < record.length; z++) {
                if (record[z] > max) {
                    max = record[z];
                }   
            }
        console.log(max)
        score = 0;
        scoreCount.innerHTML = score;
        recordCount.innerHTML = max;
    }}

}

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
    food.classList.add('food'); 
}

function eatFood () {
    if (snake[0].getAttribute('posX') == food.getAttribute('posX') && snake[0].getAttribute('posY') == food.getAttribute('posY')) {

        score++;

        food.classList.remove('food')
        function generationFood() {
            let posX = getRandomInt(1,20)
            let posY = getRandomInt(1,20)
            return [posX, posY];
        }   
            y = 2;
            y++;
            snake.push(document.querySelector('[posX = "' + (coordinates[0] - y) + '"][posY = "'+ coordinates[1] + '"]'))

        let foodCoordinates = generationFood();
        food = document.querySelector('[posX = "' + foodCoordinates[0] + '"][posY = "'+ foodCoordinates[1] + '"]');
        food.classList.add('food'); 
        scoreCount.innerHTML = score;
    }
}

setInterval(snakeUpdate, 300)
setInterval(move, 300)
drawFood()
setInterval(eatFood, 300);