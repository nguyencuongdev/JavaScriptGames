const grid = document.getElementById('grid');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const scoreDisplay = document.getElementById('score');
const blockwidth = 100;
const blockheight = 20;
const ballDiameter = 20;
const boardWidth = 560;
const boardHeight = 300;

let timerId;

const userStart = [230, 10];
let usercurrentPosition = userStart;
const ballStart = [270, 40];
let ballcurrentPosition = ballStart;
let xDirection = -2;
let yDirection = 2;


//create block
class Block {
    constructor(x, y) {
        this.bottomLeft = [x, y];
        this.bottomRight = [x + blockwidth, y];
        this.topLeft = [x, y + blockheight];
        this.topRight = [x + blockwidth, y + blockheight];
    }
}

//all my blocks
const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),
]

//draw my block;
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.left = blocks[i].bottomLeft[0] + 'px';
        block.style.bottom = blocks[i].bottomLeft[1] + 'px';
        grid.append(block);
    }
}

addBlocks();

//add user
const user = document.createElement('div');
user.classList.add('user');
user.style.left = usercurrentPosition[0] + 'px';
user.style.bottom = usercurrentPosition[1] + 'px';
grid.append(user);


//draw the user
function drawUser() {
    user.style.left = usercurrentPosition[0] + 'px';
    user.style.bottom = usercurrentPosition[1] + 'px';
}
//move user;
function moveUser(e) {
    switch (e.key) {
        case 'ArrowLeft':
            if (usercurrentPosition[0] > 0) {
                usercurrentPosition[0] -= 10;
                drawUser();
            }
            break;
        case 'ArrowRight':
            if (usercurrentPosition[0] <= 450) {
                usercurrentPosition[0] += 10;
                drawUser();
            }
            break;
    }
}

// document.addEventListener('keydown', moveUser);

startButton.addEventListener('click', () => {
    document.addEventListener('keydown', moveUser);
    timerId = setInterval(moveBall, 30);
})


//draw ball
function drawBall() {
    ball.style.left = ballcurrentPosition[0] + 'px';
    ball.style.bottom = ballcurrentPosition[1] + 'px';
}

//add ball;
const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.append(ball);

//move ball
function moveBall() {
    ballcurrentPosition[0] += xDirection;
    ballcurrentPosition[1] += yDirection;
    drawBall();
    checkForCollisions();
}

// timerId = setInterval(moveBall, 30);

//check for collisions
function checkForCollisions() {
    //check for wall collision  

    //check for block collision
    for (let i = 0; i < blocks.length; i++) {
        if (
            (ballcurrentPosition[0] > blocks[i].bottomLeft[0] && ballcurrentPosition[0] < blocks[i].bottomRight[0]) &&
            ((ballcurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballcurrentPosition[1] < blocks[i].topLeft[1])
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block')); //luu tat ca cac block;
            allBlocks[i].classList.remove('block');
            blocks.splice(i, 1);// xoa di phan tu block va phai bong khoi mang;
            changeDirection();
            score.textContent = +score.textContent + 1;
            if (blocks.length == 0) {
                setTimeout(alert("You win!"), 500);
                clearInterval(timerId);
                document.removeEventListener('keydown', moveUser);
            }
        }
    }

    //check for user collision
    if (
        ((ballcurrentPosition[0] > usercurrentPosition[0]) && ballcurrentPosition[0] < (usercurrentPosition[0] + blockwidth)) &&
        ((ballcurrentPosition[1] > usercurrentPosition[1]) && (ballcurrentPosition[1] < usercurrentPosition[1] + blockheight))
    ) {
        changeDirection();
    }

    //kiem tra ball xem co cham tuong nao khong( tren-trai, tren-phai, trai, phai);
    if ((ballcurrentPosition[0] >= (boardWidth - ballDiameter)) || //tuong phai;
        (ballcurrentPosition[1] >= (boardHeight - ballDiameter)) ||//tuong tren;
        (ballcurrentPosition[0] <= 0)) {  //tuog trai;
        changeDirection();
    }

    //check game over;
    if (ballcurrentPosition[1] <= 0) { //bong cham tuong duoi la thua;
        clearInterval(timerId, 30);
        alert("Game over!");
        document.removeEventListener('keydown', moveUser);
    }
}


function changeDirection() {

    //neu huong bong len tren va cham vao tuong tren thif doi huong xuong duoi;
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2;
        return;
    }

    //neu huong bong xuong duoi va cham tuong ben phai thi doi huong sang trai;
    if (xDirection === 2 && yDirection === -2) {
        xDirection = -2;
        return;
    }

    //neu huong bong xuong duoi ben trai (bong cham vao tuong ben trai);
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2;
        return;
    }

    //neu huong bong len tren ben trai (bong cham tuong ben tren)
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2;
        return;
    }
}

