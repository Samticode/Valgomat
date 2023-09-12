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


const transitionScreen = document.getElementById('transitionScreen');

window.addEventListener("load", () => {
    transitionScreen.style.borderRadius = "0 0 75% 75%";
    transitionScreen.style.top = "-100%";
});


/* ---------------------------------------------------------------- */


const questionT = document.getElementById('question');
const btnNext = document.getElementById('btnNext');
const btnBack = document.getElementById('btnBack');
const resultT = document.getElementById('result');


/* ---------------------------------------------------------------- */


let partyScores = {
  rødt: 0,
  ap: 0,
  sv: 0,
  mdg: 0,
  sp: 0,
  krf: 0,
  venstre : 0,
  høyre: 0,
  frp: 0
};


/* ---------------------------------------------------------------- */


const questions = [
    {question: 'Spørsmål 1',
        heltUenig: {mdg: 1, ap: 1, høyre:1},
        littUenig: {mdg: 2, ap:2, høyre:2},
        littEnig: {mdg: 3, ap: 3, høyre:3},
        heltEnig: {mdg: 4, ap:4, høyre:4}},
    {question: 'Spørsmål 2',
        heltUenig: {mdg: 1, ap: 1, høyre:1},
        littUenig: {mdg: 2, ap:2, høyre:2},
        littEnig: {mdg: 3, ap: 3, høyre:3},
        heltEnig: {mdg: 4, ap:4, høyre:4}},
    {question: 'Spørsmål 3',
        heltUenig: {mdg: 1, ap: 1, høyre:1},
        littUenig: {mdg: 2, ap:2, høyre:2},
        littEnig: {mdg: 3, ap: 3, høyre:3},
        heltEnig: {mdg: 4, ap:4, høyre:4}},
    {question: 'Spørsmål 4',
        heltUenig: {mdg: 1, ap: 1, høyre:1},
        littUenig: {mdg: 2, ap:2, høyre:2},
        littEnig: {mdg: 3, ap: 3, høyre:3},
        heltEnig: {mdg: 4, ap:4, høyre:4}},
    {question: 'Spørsmål 5',
        heltUenig: {mdg: 1, ap: 1, høyre:1},
        littUenig: {mdg: 2, ap:2, høyre:2},
        littEnig: {mdg: 3, ap: 3, høyre:3},
        heltEnig: {mdg: 4, ap:4, høyre:4}},
    {question: 'Spørsmål 6',
        heltUenig: {mdg: 1, ap: 1, høyre:1},
        littUenig: {mdg: 2, ap:2, høyre:2},
        littEnig: {mdg: 3, ap: 3, høyre:3},
        heltEnig: {mdg: 4, ap:4, høyre:4}},
    {question: 'Spørsmål 7',
        heltUenig: {mdg: 1, ap: 1, høyre:1},
        littUenig: {mdg: 2, ap:2, høyre:2},
        littEnig: {mdg: 3, ap: 3, høyre:3},
        heltEnig: {mdg: 4, ap:4, høyre:4}},
    {question: 'Spørsmål 8',
        heltUenig: {mdg: 1, ap: 1, høyre:1},
        littUenig: {mdg: 2, ap:2, høyre:2},
        littEnig: {mdg: 3, ap: 3, høyre:3},
        heltEnig: {mdg: 4, ap:4, høyre:4}},
    {question: 'Spørsmål siste',
        heltUenig: {mdg: 1, ap: 1, høyre:1},
        littUenig: {mdg: 2, ap:2, høyre:2},
        littEnig: {mdg: 3, ap: 3, høyre:3},
        heltEnig: {mdg: 4, ap:4, høyre:4}}
];


/* ---------------------------------------------------------------- */


btnNext.addEventListener('click', nextQuestion);
btnBack.addEventListener('click', backQuestion);

let qIndex = 0;
questionT.innerHTML = questions[qIndex].question;

let partyChoices = {};

updateButtonVisibility();


// ----------------------------------------------------------------------------------------


function updateButtonVisibility() {
  let radioChecked = document.querySelector('input[name="answer"]:checked');
    btnBack.style.display = (qIndex === 0) ? 'none' : 'inline-block';
    radioChecked.checked = false;
}

function nextQuestion() {
    let radioChecked = document.querySelector('input[name="answer"]:checked');

    if (radioChecked) {
        calculateResult(qIndex, radioChecked.value);
        qIndex++;

        if (qIndex < questions.length) {
            questionT.innerHTML = questions[qIndex].question;
            radioChecked.checked = false;
        } else {
            displayResult();
            btnBack.style.display = 'none';
            btnNext.style.display = 'none';
        }
    }
    updateButtonVisibility();
}

function backQuestion() {
    for (let party in partyChoices) {
        partyScores[party] -= partyChoices[party];
    }
    qIndex--;
    questionT.innerHTML = questions[qIndex].question;
    console.log(partyScores)
    updateButtonVisibility();
}
 
function calculateResult(qIndex, chosen) {
    console.log(qIndex, chosen)
    partyChoices = questions[qIndex][chosen];
    console.log(partyChoices);
    for (let party in partyChoices) {
        partyScores[party] += partyChoices[party];
    }
    console.log(partyScores)
}

function displayResult() {
    let highestParties = [];
    let highestScore = -Infinity;

    for (let party in partyScores) {
        if (partyScores[party] > highestScore) {
            highestParties = [party];
            highestScore = partyScores[party];
        } else if (partyScores[party] === highestScore) {
            highestParties.push(party);
        }
    }

    if (highestParties.length > 0) {
        resultT.innerHTML = `Du støtter mest: ${highestParties.join(', ')}`;
    }

    const nextScreen = btnNext.closest('.panel').nextElementSibling;
    nextScreen.scrollIntoView({ behavior: 'smooth' });
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
};