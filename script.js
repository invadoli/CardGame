document.addEventListener('DOMContentLoaded', () => {
    const cardValues = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    const gameBoard = document.querySelector('.game-board');
    const moveCounter = document.getElementById('move-counter');
    const timerDisplay = document.getElementById('timer');
    const restartButton = document.getElementById('restart-btn');
    let cards;
    let firstCard, secondCard;
    let hasFlippedCard = false;
    let lockBoard = false;
    let moves = 0;
    let matchedPairs = 0;
    let timerInterval;
  
    cardValues.sort(() => 0.5 - Math.random());
  
    cardValues.forEach(value => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front"></div>
          <div class="card-back">${value}</div>
        </div>
      `;
      card.addEventListener('click', flipCard);
      gameBoard.appendChild(card);
    });
  
    cards = document.querySelectorAll('.card');
  
    function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;
  
      this.classList.add('flip');
  
      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
      }
  
      secondCard = this;
      moves++;
      moveCounter.textContent = moves;
      checkForMatch();
    }
  
    function checkForMatch() {
      let isMatch = firstCard.querySelector('.card-back').textContent === secondCard.querySelector('.card-back').textContent;
      isMatch ? disableCards() : unflipCards();
    }
  
    function disableCards() {
      firstCard.removeEventListener('click', flipCard);
      secondCard.removeEventListener('click', flipCard);
  
      matchedPairs++;
      if (matchedPairs === cardValues.length / 2) {
        clearInterval(timerInterval);
        alert(`Congratulations! You've won in ${timerDisplay.textContent} seconds with ${moves} moves.`);
      }
  
      resetBoard();
    }
  
    function unflipCards() {
      lockBoard = true;
  
      setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
  
        resetBoard();
      }, 1000);
    }
  
    function resetBoard() {
      [hasFlippedCard, lockBoard] = [false, false];
      [firstCard, secondCard] = [null, null];
    }
  
    function restartGame() {
      clearInterval(timerInterval);
      timerDisplay.textContent = '0';
      moveCounter.textContent = '0';
      moves = 0;
      matchedPairs = 0;
      lockBoard = false;
      cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
      });
  
      cardValues.sort(() => 0.5 - Math.random());
      cardValues.forEach((value, index) => {
        cards[index].querySelector('.card-back').textContent = value;
      });
  
      startTimer();
    }
  
    function startTimer() {
      let startTime = Date.now();
      timerInterval = setInterval(() => {
        let elapsedTime = Math.floor((Date.now() - startTime) / 1000);
        timerDisplay.textContent = elapsedTime;
      }, 1000);
    }
  
    startTimer();
  
    restartButton.addEventListener('click', restartGame);
  });
  