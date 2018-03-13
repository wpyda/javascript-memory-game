const game = {
    divBoard: null,
    divMoves: null, // div for moves counter
    cardsCount: 16,
    cardsInRow: 4,
    shuffledCards: [], // mixed cards
    pickedCards: [], // active cards | always 0, 1 or 2
    moveCount: 0,
    cardsImg: [
        "cartman-ninja.png",
        "gray-yellow-ninja.png",
        "green-ninja.png",
        "light-green-ninja.png",
        "red-badge-ninja.png",
        "red-ninja.png",
        "swords-ninja.png",
        "yellow-ninja.png",
    ],
    canClick: true, // select 1st or 2nd card, no more
    cardPairs: 0, // how many pairs player already 'found'
    startScreen: null, // start screen with "start" and "high scores" buttons

    cardClick(e) {
        if (this.canClick) {

            // check if there is a picked card or index of picked card !== index of current event ->
            // -> prevents double click on one card
            if (!this.pickedCards[0] || (this.pickedCards[0].dataset.index !== e.target.dataset.index)) {
                this.pickedCards.push(e.target);
                e.target.style.backgroundImage = 'url(img/' + this.cardsImg[e.target.dataset.cardType] + ')';
                e.target.style.borderColor = '#9b2222';
                e.target.style.filter = 'brightness(100%)';

                // animation code
                e.target.classList.toggle('flip-horizontal-bottom');
            }

            if (this.pickedCards.length === 2) {
                this.canClick = false;

                if (this.pickedCards[0].dataset.cardType === this.pickedCards[1].dataset.cardType) {
                    setTimeout(this.deleteCards.bind(this), 800);
                } else {
                    setTimeout(this.resetCards.bind(this), 800);
                }

                this.moveCount++;
                this.divScore.innerHTML = 'Your moves: ' + this.moveCount;
            }
        }
    },

    // removing cards from the board after 'correct pick'
    deleteCards() {
        this.pickedCards.forEach((el) => {
            el.remove();
        });

        this.canClick = true;
        this.pickedCards = [];

        this.cardPairs++;
        if (this.cardPairs >= this.cardsCount / 2) {
            const winInfo = document.createElement('div');
            winInfo.innerHTML = 'You won!';
            winInfo.classList.add('winInfo');
            document.querySelector('.game-board').appendChild(winInfo);
        }
    },

    // reseting cards after 'wrong pick'
    resetCards() {
        this.pickedCards.forEach((el) => {
            el.style.backgroundImage = 'url(img/kunai.png)';
            el.style.borderColor = '';
            el.style.filter = 'brightness(70%)';

            // animation code
            el.classList.toggle('flip-horizontal-bottom');
        });
        this.canClick = true;
        this.pickedCards = [];
    },

    startGame() {

        // this.startScreen = null;

        this.divBoard = document.querySelector('.game-board');
        this.divScore = document.querySelector('.game-score');

        // clear board
        this.divBoard.innerHTML = '';

        // clear moves
        this.divScore.innerHTML = '';

        // clear variables
        this.shuffledCards = [];
        this.pickedCards = [];
        this.moveCount = 0;
        this.canClick = true;
        this.cardPairs = 0;

        // generate new array of pair of cards numbers
        for (let i = 0; i < this.cardsCount; i++) {
            this.shuffledCards.push(Math.floor(i / 2));
        }

        //mix the new array from above
        for (let i = this.cardsCount - 1; i > 0; i--) {
            const mix = Math.floor(Math.random() * i);
            const tmp = this.shuffledCards[i];

            this.shuffledCards[i] = this.shuffledCards[mix];
            this.shuffledCards[mix] = tmp;
        }

        //insert cards on board
        for (let i = 0; i < this.cardsCount; i++) {
            const card = document.createElement('div');
            card.classList.add('card');
            this.divBoard.appendChild(card);

            card.dataset.cardType = this.shuffledCards[i];
            card.dataset.index = i;

            // adding styles to cards
            card.style.left = 5 + (card.offsetWidth + 10) * (i % this.cardsInRow) + 'px';
            card.style.top = 5 + (card.offsetHeight + 10) * (Math.floor(i / this.cardsInRow)) + 'px';
            card.style.margin = '2vw';

            card.addEventListener('click', this.cardClick.bind(this));
        }
    },

    // startScreens() {
    //     this.startScreen = document.createElement('div');
    //     this.startScreen.classList.add('startScreen');
    //
    //     const startBtn = document.createElement('button');
    //     startBtn.innerText = 'Start Game';
    //     startBtn.classList.add('startScreenButton');
    //     this.startScreen.appendChild(startBtn);
    //
    //     startBtn.addEventListener('click', console.log(this.startGame));
    //
    //     const scoresBtn = document.createElement('button');
    //     scoresBtn.innerText = 'High Scores';
    //     scoresBtn.classList.add('scoresScreenButton');
    //     this.startScreen.appendChild(scoresBtn);
    //
    //     document.body.appendChild(this.startScreen);
    // },

};

document.addEventListener('DOMContentLoaded', () => { game.startGame() });