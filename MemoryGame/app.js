const cardArray = [
    {
        name: 'fries',
        img: 'imgs/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'imgs/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'imgs/hotdog.png',
    },
    {
        name: 'pizza',
        img: 'imgs/pizza.png',
    },
    {
        name: 'ice-cream',
        img: 'imgs/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'imgs/milkshake.png',
    },
    {
        name: 'fries',
        img: 'imgs/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'imgs/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'imgs/hotdog.png',
    },
    {
        name: 'pizza',
        img: 'imgs/pizza.png',
    },
    {
        name: 'ice-cream',
        img: 'imgs/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'imgs/milkshake.png',
    },
]

cardArray.sort(() => 0.5 - Math.random()); // sắp xếp ngẫu nhiên vì Math.random() sẽ trả về 1 số thực lớn hơn -1 và nhỏ hơn 0; khi 0.5 - Math.random() nó sẽ ra số lớn hơn -1 và nhỏ hơn 1 -> ta sẽ đc 1 mảng sắp xếp ngẫu nhiên;

const gridDisplay = document.getElementById('grid');

let cardChosen = [];// dung de kiem tra xem 2 lua chon co khop hay khong;
let cardChosenId = [];// luu id cua 2 lua chon do;

function createBoard() {
    for (let i = 0; i < 12; ++i) {
        const card = document.createElement('img');
        card.setAttribute('src', 'imgs/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click', flipCard);
        gridDisplay.append(card);// thêm phần từ vào grid nhưng không thay thế nội dung trc do;
    }
}
createBoard();

const resultDisplay = document.getElementById('result');

function checkMatch() {
    const cards = document.querySelectorAll('#grid img');

    if ((cardChosen[0] === cardChosen[1]) && (cardChosenId[0] !== cardChosenId[1])) {
        let score = +resultDisplay.textContent + 10;
        resultDisplay.innerHTML = score;

        cards[cardChosenId[0]].setAttribute('src', 'imgs/white.png');
        cards[cardChosenId[1]].setAttribute('src', 'imgs/white.png');

        cards[cardChosenId[0]].removeEventListener('click', flipCard);
        cards[cardChosenId[1]].removeEventListener('click', flipCard);

        cardChosen = [];// xoa bo 2 lua chon trong mang kiem cha;

        cardChosenId = [];// xoa bo id 2 lua chon trong mang kiem cha;
        //nếu chọn đúng hết;
        if (+resultDisplay.textContent == 60) {
            alert('You win!');
        }
    }
    else {
        cards[cardChosenId[0]].setAttribute('src', 'imgs/blank.png');
        cards[cardChosenId[1]].setAttribute('src', 'imgs/blank.png');

        cardChosen = [];// xoa bo 2 lua chon trong mang kiem cha;
        cardChosenId = [];// xoa bo id 2 lua chon trong mang kiem cha;
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    cardChosen.push(cardArray[cardId].name);
    cardChosenId.push(cardId);
    this.setAttribute('src', cardArray[cardId].img);
    if (cardChosen.length === 2) {
        setTimeout(checkMatch, 500) //0.5s;
    }
}
