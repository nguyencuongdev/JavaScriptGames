const squares = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');

const timeLeft = document.querySelector('#time-left');
const score = document.querySelector('#score');

let result = 0;
let hitPosition;
let curentTime = 60;
let timeId = null;
let prePosition;

//random vi tri cua chuot;
function randomSquare() {
    squares.forEach((square) => {
        square.classList.remove('mole');
    })
    randomPosition = Math.floor(Math.random() * squares.length);//random square position bat ky;
    while (randomPosition == prePosition) {
        randomPosition = Math.floor(Math.random() * squares.length);
    }
    prePosition = randomPosition;
    let squarePosition = squares[randomPosition];

    //hien thi chuoi o vi tri bat ky da random;
    squarePosition.classList.add('mole');
    hitPosition = squarePosition.id;
}

//gan su kien nhap chuot vao tung square neu nhap vao square chuoit thi cong 1 diem;
squares.forEach(square => {
    square.addEventListener('mousedown', () => {
        if (square.id == hitPosition) {
            result++;
            score.textContent = result;
            hitPosition = null;
        }
    })
})


//cu moi 0.6s ta se random vi tri bat tri cua chuot tren o luoi;
function moveMole() {
    timeId = setInterval(randomSquare, 600);
}
moveMole();

//dem thoi gian;
function countDown() {
    curentTime--;
    timeLeft.textContent = curentTime;

    //kiem tra xem da het thoi gian chua;
    if (curentTime == 0) {
        clearInterval(curentTimeId);// xoa kiem tra thoi gian va game over;
        clearInterval(timeId);// ket thuc viec random chuot;
        score.textContent = 0;
        timeLeft.textContent = 60;
        alert("GAME OVER! Your final score is: " + result);
    }
}

//cu moi 1s thi se kiem tra thoi gian choi cung nhu hien thi ket qua;
const curentTimeId = setInterval(countDown, 600);