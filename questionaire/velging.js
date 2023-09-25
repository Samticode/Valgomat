const backgroundDiv = document.getElementById("backgroundDiv");

// background mouse effect
window.onmousemove = e => {
// Get the mouse coordinates
  const mouseX = e.clientX,
        mouseY = e.clientY;

// Calculate the mouse position as decimals of the window size
  const xDecimal = mouseX / window.innerWidth,
        yDecimal = mouseY / window.innerHeight;
  
// Calculate the maximum panning values based on element sizes and window size
  const maxX = backgroundDiv.offsetWidth - window.innerWidth,
        maxY = backgroundDiv.offsetHeight - window.innerHeight;
  
// Calculate the panning values based on mouse position and maximum values
  const panX = maxX * xDecimal * -1,
        panY = maxY * yDecimal * -1;
  
// Animate the backgroundDiv's transform property to achieve panning effect
  backgroundDiv.animate({
    transform: `translate(${panX}px, ${panY}px)`},
     {
    duration: 4000,
    fill: "forwards",
    easing: "ease"
  });
};


/* ---------------------------------------------------------------- */


// Start on question screen on reload
window.addEventListener("load", (event) => {
    const firstScreen = btnNext.closest('.panel');
    firstScreen.scrollIntoView({ behavior: 'smooth' });
    window.scrollTo({
        top: 0,
        duration: 1
    })
    console.log("Page has loaded!");
  });


/* ---------------------------------------------------------------- */


const transitionScreen = document.getElementById('transitionScreen');

window.addEventListener("load", () => {
    transitionScreen.style.borderRadius = "0 0 75% 75%";
    transitionScreen.style.top = "-100%";
});


/* ---------------------------------------------------------------- */


// Get various elements by their IDs
const questionT = document.getElementById('question');
const btnNext = document.getElementById('btnNext');
const btnBack = document.getElementById('btnBack');
const progressPercent = document.getElementById('progressPercent');

const firstPlace = document.getElementById('firstPlace');
const secondPlace = document.getElementById('secondPlace');
const thirdPlace = document.getElementById('thirdPlace');
const fourthPlace = document.getElementById('fourthPlace');

const medal1 = document.getElementById('medal1');
const medal2 = document.getElementById('medal2'); 
const medal3 = document.getElementById('medal3');
const medal4 = document.getElementById('medal4');

/* ---------------------------------------------------------------- */


// Initialize partyScores object
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

// Initialize partyPFP object with URLs to party profile pictures
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


// Define an array of questions with different answer options
const questions = [
    {question: 'Bør vi ha lekser i skolen?',
        heltUenig: {høyre: 6, frp: 6},
        littUenig: {sp: 6, krf:6, venstre:6},
        littEnig: {mdg: 6},
        heltEnig: {rødt: 6, ap:6, sv:6}},
    {question: 'Bør vi gi pengestøtte til kunstnere?',
        heltUenig: {frp: 6},
        littUenig: {},
        littEnig: {mdg: 6, krf: 6, venstre: 6, høyre: 6},
        heltEnig: {sp: 6, sv: 6, ap: 6, rødt: 6}},
    {question: 'Bør vi senke skattene?',
        heltUenig: {rødt: 6, ap: 6, sv: 6, mdg: 6},
        littUenig: {venstre: 6},
        littEnig: {krf: 6, sp: 6},
        heltEnig: {høyre: 6, frp: 6}},
    {question: 'Bør vi finne nye oljefelt?',
        heltUenig: {rødt: 6, sv: 6, mdg: 6, ap: 6},
        littUenig: {sp: 6, venstre: 6},
        littEnig: {krf: 6},
        heltEnig: {høyre: 6, frp: 6}},
    {question: 'Bør vi få flere private sykehus?',
        heltUenig: {rødt: 6, ap: 6, sv: 6},
        littUenig: {mdg: 6},
        littEnig: {sp: 6, krf: 6, venstre: 6},
        heltEnig: {høyre: 6, frp: 6}},
    {question: 'Bør vi beholde kontantstøtten?',
        heltUenig: {rødt: 6, sv: 6, høyre: 6},
        littUenig: {mdg: 6, sp: 6, venstre: 6},
        littEnig: {ap: 6},
        heltEnig: {krf: 6, frp: 6}},
    {question: 'Bør vi ta imot flere flyktninger?',
        heltUenig: {frp: 6},
        littUenig: {},
        littEnig: {ap: 6, sv: 6, venstre: 6, krf: 6},
        heltEnig: {høyre: 6, rødt: 6, mdg: 6, sp: 6}},
    {question: 'Bør vi ha strengere straffer?',
        heltUenig: {rødt: 6, mdg: 6, venstre: 6},
        littUenig: {sv: 6},
        littEnig: {krf: 6},
        heltEnig: {ap: 6, høyre: 6, frp: 6}}
];


/* --------------------------------------------------------------- */


// Add click event listeners to next and back buttons
btnNext.addEventListener('click', nextQuestionAndPercentage);
btnBack.addEventListener('click', backQuestion);

let qIndex = 0;
questionT.innerHTML = questions[qIndex].question;

let partyChoices = {};

updateButtonVisibility();


// ----------------------------------------------------------------------------------------


// Function to update button visibility
function updateButtonVisibility() {
    if (qIndex === questions.length) {
        btnBack.style.display = "none";
        btnNext.style.display = "none";
    } else {
        btnBack.style.display = (qIndex === 0) ? 'none' : 'inline-block';
    }
}

// Function to calculate and display the completion percentage
function percentage() {
    let qPercent = qIndex / questions.length * 100;
    progressPercent.innerHTML = Math.round(qPercent) + '%';
}

// Function to handle next question and update percentage
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

// Function to go back to the previous question
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
 
// Function to calculate and display the results
function calculateResult(qIndex, chosen) {
    console.log(qIndex, chosen, questions.length)
    partyChoices = questions[qIndex][chosen];
    console.log(partyChoices);
    for (let party in partyChoices) {
        partyScores[party] += partyChoices[party];
    }
    console.log(partyScores)
}

const sortedResultsWithPFP = [];
// Function to display the results and set background images
function displayResult() {
    if (partyScores.rødt === 0 && partyScores.mdg === 0) {
        window.location.href = "https://youtu.be/LCNKAooDrZc?si=s1I79slM0U-Tfe5O&t=15";
    } else {
        const partyScorePairs = Object.entries(partyScores);
        // Sort the party-score pairs in descending order of scores
        partyScorePairs.sort((a, b) => b[1] - a[1]);
        // Create an object to store the sorted results
        
        // Populate the sorted results array with both party name, score, and pfp URL
        partyScorePairs.forEach((pair, index) => {
            const [party, score] = pair;
            const pfpURL = partyPFP[party]; // Get the pfp URL for the party
            sortedResultsWithPFP.push({ party, score, pfpURL });
        });     
        console.log(sortedResultsWithPFP)
        
        makeLeaderboard()
        
        const nextScreen = btnNext.closest('.panel').nextElementSibling;
        nextScreen.scrollIntoView({ behavior: 'smooth' });
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
}

// Make Leaderboard 
function makeLeaderboard() {
    let endScreenDiv = document.getElementById("endScreen");
    let placeIdName = ["firstPlace", "secondPlace", "thirdPlace", "fourthPlace"]
    let medalIdName = ["medal medal1", "medal medal2", "medal medal3", "medal medal4"]

    //Make top 4 on leaderboard
    for (var i = 0; i < 4; i++) {
        let newDiv = document.createElement("div");
        newDiv.setAttribute("class", placeIdName[i]);
        newDiv.style.backgroundImage = `url(${sortedResultsWithPFP[i].pfpURL})`;
        
        let newDiv2 = document.createElement("div");        
        newDiv2.setAttribute("class", medalIdName[i]);
        newDiv2.innerHTML = sortedResultsWithPFP[i].score + `p`;

        newDiv.appendChild(newDiv2);
        endScreenDiv.appendChild(newDiv);
        console.log(newDiv, newDiv2);
    }
    return ""
}