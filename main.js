const cards = [];
const scene = document.querySelector(".scene");
const keys = {};
const board = {
  el: document.querySelector(".board"),
  x: 0,
  y: 0,
  xs: 0,
  ys: 0,
};
let pt = 0;

for (var i = 0; i < 10; i++) {
  cards[i] = {
    el: board.el.appendChild(document.createElement("div")),
    x: i * 200,
    y: 0,
  };
  cards[i].el.classList.add("card");
}

const render = (t) => {
  t *= 0.001;

  const d = t - pt;

  pt = t;
  updateBoard(d);
  window.requestAnimationFrame(render);
};

const updateBoard = (d) => {
  if(keys["ArrowLeft"]) board.x += 100*d;
  if(keys["ArrowRight"]) board.x -= 100*d;
  if(keys["ArrowUp"]) board.y += 100*d;
  if(keys["ArrowDown"]) board.y -= 100*d;
  translate(board);
  for (const c of cards) translate(c);
};

const translate = (go) => {
  go.el.style.transform = `translate(${go.x}px, ${go.y}px)`;
};

addEventListener("keydown", (e) => {
  keys[e.code] = true;
});

addEventListener("keyup", (e) => {
  if (keys[e.code]) keys[e.code] = false;
});
requestAnimationFrame(render);
