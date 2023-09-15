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
const progressPercent = document.getElementById('progressPercent');

const firstPlace = document.getElementById('firstPlace');
const secondPlace = document.getElementById('secondPlace');
const thirdPlace = document.getElementById('thirdPlace');
const fourthPlace = document.getElementById('fourthPlace');


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

let partyPFP = {
    rødt: "../pic/rodtPFP.png",
    ap: "../pic/apPFP.jpg",
    sv: "../pic/svPFP.png",
    mdg: "../pic/mdgPFP.png",
    sp: "../pic/spPFP.png",
    krf: "../pic/krfPFP.png",
    venstre: "../pic/venstrePFP.png",
    høyre: "../pic/høyrePFP.png",
    frp: "../pic/fprPFP.png"
};


/* ---------------------------------------------------------------- */


const questions = [
    {question: 'Bør vi ha lekser i skolen?',
        heltUenig: {mdg: 1, ap: 1, høyre:1},
        littUenig: {mdg: 2, ap:2, høyre:2},
        littEnig: {mdg: 3, ap: 3, høyre:3},
        heltEnig: {mdg: 4, ap:4, høyre:4}},
    {question: 'Bør vi gi pengestøtte til kunstnere?',
        heltUenig: {mdg: 1, ap: 1, høyre:1},
        littUenig: {mdg: 2, ap:2, høyre:2},
        littEnig: {mdg: 3, ap: 3, høyre:3},
        heltEnig: {mdg: 4, ap:4, høyre:4}},
    {question: 'Bør vi senke skattene?',
        heltUenig: {mdg: 1, ap: 1, høyre:1},
        littUenig: {mdg: 2, ap:2, høyre:2},
        littEnig: {mdg: 3, ap: 3, høyre:3},
        heltEnig: {mdg: 4, ap:4, høyre:4}},
    {question: 'Bør vi finne nye oljefelt?',
        heltUenig: {mdg: 1, ap: 1, høyre:1},
        littUenig: {mdg: 2, ap:2, høyre:2},
        littEnig: {mdg: 3, ap: 3, høyre:3},
        heltEnig: {mdg: 4, ap:4, høyre:4}},
    {question: 'Bør vi få flere private sykehus?',
        heltUenig: {mdg: 1, ap: 1, høyre:1},
        littUenig: {mdg: 2, ap:2, høyre:2},
        littEnig: {mdg: 3, ap: 3, høyre:3},
        heltEnig: {mdg: 4, ap:4, høyre:4}},
    {question: 'Bør vi beholde kontantstøtten?',
        heltUenig: {mdg: 1, ap: 1, høyre:1},
        littUenig: {mdg: 2, ap:2, høyre:2},
        littEnig: {mdg: 3, ap: 3, høyre:3},
        heltEnig: {mdg: 4, ap:4, høyre:4}},
    {question: 'Bør vi ta imot flere flyktninger?',
        heltUenig: {mdg: 1, ap: 1, høyre:1},
        littUenig: {mdg: 2, ap:2, høyre:2},
        littEnig: {mdg: 3, ap: 3, høyre:3},
        heltEnig: {mdg: 4, ap:4, høyre:4}},
    {question: 'Bør vi ha strengere straffer?',
        heltUenig: {mdg: 1, ap: 1, høyre:1},
        littUenig: {mdg: 2, ap:2, høyre:2},
        littEnig: {mdg: 3, ap: 3, høyre:3},
        heltEnig: {mdg: 4, ap:4, høyre:4}}
];


/* ---------------------------------------------------------------- */


btnNext.addEventListener('click', nextQuestionAndPercentage);
btnBack.addEventListener('click', backQuestion);

let qIndex = 0;
questionT.innerHTML = questions[qIndex].question;

let partyChoices = {};

updateButtonVisibility();


// ----------------------------------------------------------------------------------------


function updateButtonVisibility() {
    if (qIndex === questions.length) {
        btnBack.style.display = "none";
        btnNext.style.display = "none";
    } else {
        btnBack.style.display = (qIndex === 0) ? 'none' : 'inline-block';
    }
}

function percentage() {
    let qPercent = qIndex / questions.length * 100;
    progressPercent.innerHTML = Math.round(qPercent) + '%';
}

function nextQuestionAndPercentage() {
    let radioChecked = document.querySelector('input[name="answer"]:checked');

    if (radioChecked) {
        calculateResult(qIndex, radioChecked.value);
        qIndex++;

        if (qIndex < questions.length) {
            questionT.innerHTML = questions[qIndex].question;
            radioChecked.checked = false;
        } else {
            displayResult();
        }
    }
    updateButtonVisibility();
    percentage();
}

function backQuestion() {
    for (let party in partyChoices) {
        partyScores[party] -= partyChoices[party];
    }
    qIndex--;
    questionT.innerHTML = questions[qIndex].question;
    console.log(partyScores)
    updateButtonVisibility();
    percentage();
}
 
function calculateResult(qIndex, chosen) {
    console.log(qIndex, chosen, questions.length)
    partyChoices = questions[qIndex][chosen];
    console.log(partyChoices);
    for (let party in partyChoices) {
        partyScores[party] += partyChoices[party];
    }
    console.log(partyScores)
}

function displayResult() {
    const partyScorePairs = Object.entries(partyScores);

    // Sort the party-score pairs in descending order of scores
    partyScorePairs.sort((a, b) => b[1] - a[1]);

    // Create an object to store the sorted results
    const sortedResultsWithPFP = [];

    // Populate the sorted results array with both party name, score, and pfp URL
    partyScorePairs.forEach((pair, index) => {
        const [party, score] = pair;
        const pfpURL = partyPFP[party]; // Get the pfp URL for the party
        sortedResultsWithPFP.push({ party, score, pfpURL });
    });

    console.log(sortedResultsWithPFP)
    // Set background image
    firstPlace.style.backgroundImage = `url(${sortedResultsWithPFP[0].pfpURL})`;
    secondPlace.style.backgroundImage = `url(${sortedResultsWithPFP[1].pfpURL})`;
    thirdPlace.style.backgroundImage = `url(${sortedResultsWithPFP[2].pfpURL})`;
    fourthPlace.style.backgroundImage = `url(${sortedResultsWithPFP[3].pfpURL})`;

    const nextScreen = btnNext.closest('.panel').nextElementSibling;
    nextScreen.scrollIntoView({ behavior: 'smooth' });
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
};