const backgroundDiv = document.getElementById("backgroundDiv");

window.onmousemove = e => {
  const mouseX = e.clientX,
        mouseY = e.clientY;
  
  const xDecimal = mouseX / window.innerWidth,
        yDecimal = mouseY / window.innerHeight;
  
  const maxX = backgroundDiv.offsetWidth - window.innerWidth,
        maxY = backgroundDiv.offsetHeight - window.innerHeight;
  
  const panX = maxX * xDecimal * -1,
        panY = maxY * yDecimal * -1;
  
  backgroundDiv.animate({
    transform: `translate(${panX}px, ${panY}px)`
  }, {
    duration: 4000,
    fill: "forwards",
    easing: "ease"
  })};

/* ---------------------------------------------------------------- */

const preceedButton = document.getElementById('preceedButton');
const transitionScreen = document.getElementById('transitionScreen');

preceedButton.addEventListener('click', () => {
    transitionScreen.style.top = "0";
    transitionScreen.style.borderRadius = "0";
    transitionScreen.addEventListener('transitionend', () => {
        window.location.href = "./questionaire/velging.html";
    });
});