import Card from "./Card";

// Constants.
const CELL_SIZE = 100;
const CARD_WIDTH = 2 * CELL_SIZE;
const CARD_HEIGHT = 1 * CELL_SIZE;
const PAN_EDGE = 50;
const PAN_SPEED = 7.5;

// Game objects.
const hand = {
	cards: [],
	el: document.querySelector(".hand"),
};
const board = {
	cards: [],
	el: document.querySelector(".board"),
	x: 0,
	y: 0,
	xs: 0,
	ys: 0,
};

const scene = document.querySelector(".scene");
const cursor = {
	el: board.el.appendChild(document.createElement("div")),
};
cursor.el.classList.add("cursor");

// Controls.
const keys = {};
const mouse = {
	// Screen.
	x: innerWidth / 2,
	y: innerHeight / 2,
};

// Fill board with cards.
for (var i = 0; i < 10; i++) {
	const card = new Card(i * CARD_WIDTH, 0);
	card.addToBoard(board);
}

// Fill hand with cards.
for (var i = 0; i < 15; i++) {
	const card = new Card(i * CARD_WIDTH, 0);
	card.addToHand(hand);
}

// Render loop.
let pt = 0;
const render = (t) => {
	t *= 0.001;

	const d = t - pt;
	pt = t;

	updateBoard(d);
	updateHand(d);
	translate(cursor, mouse.cx - 4, mouse.cy - 4);
	window.requestAnimationFrame(render);
};

// Update HTML elements.
const updateBoard = (d) => {
	// Update mouse object.
	// Board.
	mouse.bx = mouse.x - board.x;
	mouse.by = mouse.y - board.y;
	// Cell.
	mouse.cx = Math.floor((mouse.bx - CELL_SIZE / 2) / CELL_SIZE) * CELL_SIZE;
	mouse.cy = Math.floor(mouse.by / CELL_SIZE) * CELL_SIZE;
	// Camera panning on window edge.
	if (mouse.x < PAN_EDGE) board.x += (PAN_EDGE - mouse.x) * d * PAN_SPEED;
	if (mouse.y < PAN_EDGE) board.y += (PAN_EDGE - mouse.y) * d * PAN_SPEED;
	if (mouse.x > innerWidth - PAN_EDGE)
		board.x -= (PAN_EDGE + (mouse.x - innerWidth)) * d * PAN_SPEED;
	if (mouse.y > innerHeight - PAN_EDGE)
		board.y -= (PAN_EDGE + (mouse.y - innerHeight)) * d * PAN_SPEED;
	// Panning with keys.
	if (keys["ArrowLeft"]) board.x += 100 * d * PAN_SPEED;
	if (keys["ArrowRight"]) board.x -= 100 * d * PAN_SPEED;
	if (keys["ArrowUp"]) board.y += 100 * d * PAN_SPEED;
	if (keys["ArrowDown"]) board.y -= 100 * d * PAN_SPEED;
	translate(board);

	// Update card positions.
	for (const c of board.cards) translate(c);
};

const updateHand = (d) => {
	if (hand.cards.length * CARD_WIDTH > innerWidth) {
		// Overlap.
		const handWidth = innerWidth - CARD_WIDTH;
		const offset = handWidth / (hand.cards.length + 1);
		hand.cards.forEach((c, i) => {
			translate(c, i*offset + CELL_SIZE, 0);
		});
	} else {
		// No overlap.
		hand.cards.forEach((c, i) => {
			translate(c);
		});
	}
};

const placeCard = (card, x, y) => {
	for (const c of board.cards) {
		if ((x == c.x || x + CELL_SIZE == c.x) && y == c.y) return;
	}
	card.x = x;
	card.y = y;
};

const translate = (go, x, y) => {
	go.el.style.transform = `translate(
      ${x !== undefined ? x : go.x}px,
      ${y !== undefined ? y : go.y}px)
    `;
};

addEventListener("keydown", (e) => {
	keys[e.code] = true;
});

addEventListener("keyup", (e) => {
	if (keys[e.code]) keys[e.code] = false;
});

addEventListener("click", (e) => {
	placeCard(board.cards[0], mouse.cx, mouse.cy);
});

// Update mouse object.
addEventListener("mousemove", (e) => {
	// Screen.
	mouse.x = e.clientX;
	mouse.y = e.clientY;
});
requestAnimationFrame(render);
