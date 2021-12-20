let questionsArray = [
    {
        question: "In which UK city would you find the river Clyde?",
        answer: ['Dundee', 'Glasgow', 'Manchester', 'Sheffield'],
        correctAnswer: "Glasgow"
    }, 
    {
        question: "In which city would you find La Sagrada Familia?",
        answer: ['Berlin', 'Lisbon', 'Geneva', 'Barcelona'],
        correctAnswer: "Barcelona"
    }, 
    {
        question: "The Strait of Gibraltar separates the Iberian peninsular from which African nation?",
        answer: ['Western Sahara', 'Morocco', 'Algeria', 'Tunisia'],
        correctAnswer: "Morocco"
    }, 
    {
        question: "What is the only country with a coastline on both the Red Sea and the Persian Gulf?",
        answer: ['Saudi Arabia', 'Yemen', 'Jordan', 'Iran'],
        correctAnswer: "Saudi Arabia"
    },
    {
        question: "Sofia is the capital of which country?",
        answer: ['Romania', 'Moldova', 'Bulgaria', 'Kosovo'],
        correctAnswer: "Bulgaria"
    },
    {
        question: "Azerbaijan borders on which sea?",
        answer: ['Persian Gulf', 'Red Sea', 'Black Sea', 'Caspian Sea'],
        correctAnswer: "Caspian Sea"
    },
    {
        question: "Which is the only country that both the Equator and the Tropic of Capricorn pass",
        answer: ['Brazil', 'Kenya', 'Indonesia', 'Colombia'],
        correctAnswer: "Brazil"
    },
    {
        question: "The world largest port can be found in which city?",
        answer: ['Singapore', 'Dubai', 'Shanghai', 'New York'],
        correctAnswer: "Shanghai"
    },
    {
        question: "A road tunnel runs from Pelerins in France to Entreves in Italy under which mountain?",
        answer: ['Monte Rosa', 'Mont Blanc', 'Lyskamm', 'Matterhorn'],
        correctAnswer: "Mont Blanc"
    },
    {
        question: "What is the Longest river in India?",
        answer: ['Ganges', 'Narmada', 'Yamuna' , 'Indus'],
        correctAnswer: "Ganges"
    }
]

// global variables

let questionIndex = 0;
let score = 0;
const PRIMARY_BOX = document.getElementById("primary-box");
const PLAY_BOX = document.getElementById("play-box");
const PLAY_BUTTON = document.getElementById("play-button");
let total = questionsArray.length;
let answer = "";
const BUTTONS = document.querySelectorAll('[id^="button-"]')
const NEXT_BUTTON = document.getElementById("next-button")
const SCORE_TEXT = document.getElementById("score")
SCORE_TEXT.textContent=score;
const TOTAL_TEXT = document.getElementById("total");
TOTAL_TEXT.textContent = total;
const RESULT_BOX = document.getElementById("result-box");
const CONGRATULATIONS = document.getElementById("congratulations");
const TRY_AGAIN = document.getElementById("try-again");
let instructions = document.getElementById("how-to-play");
let instructionsVisable = false;
const RESULTS_SCORE = document.getElementsByClassName("result-score");



/*
this function will display instructions
on how to play the game when clicking 
the 'How to play' button
*/
function showInstructions() {
    if(!instructionsVisable){
        PLAY_BUTTON.style.display= "none";
        instructions.style.display="";
        instructionsVisable = true;
    }
    else {
        PLAY_BUTTON.style.display= "";
        instructions.style.display="none";
        instructionsVisable = false;
    }
}

/*
this function will allow clicking 
of the play button to take the user 
to the first question
*/
function startQuiz() {
    PRIMARY_BOX.style.display = "";
    PLAY_BOX.style.display = "none";
    nextQuestion();
}

/*
renders each question within the 
questionArray and displays corresponding 
answer options
*/
function nextQuestion() {
    //populates question
    let selectQuestion = document.getElementById('question');
    selectQuestion.textContent = questionsArray[questionIndex].question;
    //populates answers
    for (let x=0; x < BUTTONS.length; x++) {
        BUTTONS[x].textContent = questionsArray[questionIndex].answer[x]
        BUTTONS[x].classList.remove("active")
        }
        NEXT_BUTTON.disabled = true;
}

/*
clicking an answer button calls this function. 
It allows user to select one of the four answer 
options and remain active
*/
function renderOrchangeAnswer(inputButton, input){
    answer = input

    for(var x=0; x < BUTTONS.length; x++){
        if(BUTTONS[x].classList.contains("active")){
            BUTTONS[x].classList.remove("active")
        }
    }
    NEXT_BUTTON.disabled = false;
    inputButton.classList.add("active")
}

/*
prevents user from proceeding without selecting 
a choice. Identifies last question and calls 
relavant function  and also adds correct answer 
to score counter
*/
function answerQuestion() {
    console.log(questionIndex);
    if (questionIndex === (questionsArray.length - 1)){
        finishQuiz();
        return;
    }
    if(answer === ""){
        // NEXT_BUTTON.style.pointerEvents="none";
        return
    }
    if (answer === questionsArray[questionIndex].correctAnswer){
        score++
        SCORE_TEXT.textContent=score;
    }
    questionIndex++;
    nextQuestion()
}


/*
pull through score, displaying  on results page. Highlight relavant page depending on score
*/
function finishQuiz() {
    for (var i = 0; i < RESULTS_SCORE.length; i++) {
        RESULTS_SCORE[i].textContent = `${score} / ${total}`
    }
    PRIMARY_BOX.style.display="none";
    RESULT_BOX.style.display = "";

    if (score >= (questionsArray.length * 0.7)){
        CONGRATULATIONS.style.display = "";
    }
    else {
        TRY_AGAIN.style.display = "";
    }
}