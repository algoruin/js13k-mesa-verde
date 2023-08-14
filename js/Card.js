class Card {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
        
        // Create HTML element.
        this.el = document.createElement("div");
        this.el.classList.add("card");
    }

    addToBoard(board) {
        // Add to array.
        board.cards.push(this);

        // Add to board HTML element.
        board.el.appendChild(this.el);
    }

    addToHand(hand) {
        // Add to array.
        hand.cards.push(this);

        // Add to hand HTML element.
        hand.el.appendChild(this.el);
    }
}

export default Card;