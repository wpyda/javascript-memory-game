const game = {
    divBoard: null, // div- plansza
    divMoves: null, // div- ruchy/wynik (counter) - 'divMoves'
    cardsCount: 16, // liczba kart ogółem
    cardsInRow: 4, // liczba kart w rzędzie
    shuffledCards: [], // wymieszane karty - 'tiles'
    pickedCards: [], // zaznaczone/aktywne karty | zawsze bedzie 0, 1 lub 2- 'tilesChecked'
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
    canClick: true,

    cardClick(e) {
        if (this.canClick) {
            // check if there is a picked card or index of picked card !== index of current event ->
            // -> prevents double click on one card
            if (!this.pickedCards[0] || (this.pickedCards[0].dataset.index !== e.target.dataset.index)) {
                this.pickedCards.push(e.target);
                e.target.style.backgroundImage = 'url(img/' + this.cardsImg[e.target.dataset.cardType] + ')';
            }

            if (this.pickedCards.length === 2) {
                if (this.pickedCards[0].dataset.cardType === this.pickedCards[1].dataset.cardType) {
                    setTimeout(this.deleteCards.bind(this), 500)
                } else {
                    setTimeout(this.resetCards.bind(this), 500)
                }
            }
        }
    },

    startGame() {
        // clear board
        this.divBoard = document.querySelector('.game-board');
        this.divBoard.innerHTML = '';

        // clear moves
        this.divScore = document.querySelector('.game-score');
        this.divScore.innerHTML = '';

        // clear variables
        this.shuffledCards = [];
        this.pickedCards = [];
        this.moveCount = 0;
        this.canClick = true;

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

            card.addEventListener('click', this.cardClick.bind(this))
        }
    },

}

game.startGame()