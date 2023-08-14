const cards = [];
const scene = document.querySelector(".scene");
const board = document.querySelector(".board");
let pt = 0;

for (var i = 0; i < 10; i++) {
  cards[i] = {
    el:board.appendChild(document.createElement("div")),
    x:i*200,
    y:0
  }
  cards[i].el.classList.add('card');
}

const render = (t) => {
  t *= 0.001;
  
  const d = t - pt;
  
  pt = t;
  updateBoard(d);
  window.requestAnimationFrame(render);
}

const updateBoard = (d) => {
  for( const c of cards) {
    c.x += 10*d;
    c.el.style.transform = `translate(${c.x}px, ${c.y}px)`;
  }
}

window.requestAnimationFrame(render);