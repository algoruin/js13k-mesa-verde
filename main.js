addEventListener("mousemove", (e) => {
  const mouse = {
    x: (e.clientX / innerWidth - 0.5) * 2,
    y: (e.clientY / innerHeight - 0.5) * 2
  };
  document.querySelector(".scene").style.transform = `perspective(1000px) rotateX(60deg) rotateZ(${mouse.x * 10}deg) rotateX(${mouse.y * 10}deg)`
});