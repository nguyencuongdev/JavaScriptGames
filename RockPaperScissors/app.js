const computerChoiceDisplay = document.getElementById('computer_choice');
const userChoiceDisplay = document.getElementById('user_choice');
const resultDisplay = document.getElementById('result');
const possibleChoices = document.querySelectorAll('.button');

let userchoice;
let computerchoise;

possibleChoices.forEach(possibleChoice => {
    possibleChoice.addEventListener('click', (e) => {
        userchoice = e.target.textContent;
        userChoiceDisplay.innerHTML = userchoice;
        generateComputerChoice();
        getResultDisplay();
    })
})

function generateComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3 + 1);
    switch (randomNumber) {
        case 1:
            computerchoise = 'Rock';
            break;
        case 2:
            computerchoise = 'Paper';
            break;
        case 3:
            computerchoise = 'Scissors';
            break;
    }

    computerChoiceDisplay.innerHTML = computerchoise;
}

function getResultDisplay() {
    if (computerchoise === userchoice) {
        resultDisplay.innerHTML = 'It\'s a draw';
        return;
    }
    if (computerchoise === 'Rock' && userchoice === 'Scissors') {
        resultDisplay.innerHTML = 'You lost!';
        return;
    }
    if (computerchoise === 'Paper' && userchoice === 'Rock') {
        resultDisplay.innerHTML = 'You lost!';
        return;
    }
    if (computerchoise === 'Scissors' && userchoice === 'Paper') {
        resultDisplay.innerHTML = 'You lost!';;
    }
    else {
        resultDisplay.innerHTML = 'You win!';
    }
}