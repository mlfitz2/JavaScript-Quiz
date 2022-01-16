var quizAreaEl = document.querySelector('.quiz-area');
var startButton = document.querySelector('#start-button')
var timerElement = document.querySelector('#time-left');
var announcementAreaEl = document.querySelector('.announcement-area');
var questionEl = document.querySelector('#question');
var firstAnswerEl = document.querySelector('#first-answer');
var secondAnswerEl = document.querySelector('#second-answer');
var thirdAnswerEl = document.querySelector('#third-answer');
var fourthAnswerEl = document.querySelector('#fourth-answer');
var scoreCountEl = document.querySelector('#score-count')
var answerEl = document.querySelector('.answer');
var buttonZone = document.querySelector('#button-zone');

var timerCount = 60;
var round = 0;
var scoreCount = 0;


//Start without any questions on the screen
quizAreaEl.remove();

//Start the game
function startGame() {
    startTimer();
    scoreCountEl.textContent = scoreCount;
    announcementAreaEl.remove();
    document.body.appendChild(quizAreaEl);
    displayQuestion();    
}

//Display the question
function displayQuestion() {
    var currentQuestion = questions[round];
    questionEl.textContent = currentQuestion.title;
    buttonZone.innerHTML = "";
    currentQuestion.choices.forEach(function(element){
        var tempButton = document.createElement('button');
        tempButton.textContent = element;
        tempButton.setAttribute('class', 'answer');
        tempButton.onclick = makeYourChoice;
        buttonZone.append(tempButton);
    })
    // firstAnswerEl.textContent = questions[round].choices[0];
    // secondAnswerEl.textContent = questions[round].choices[1];
    // thirdAnswerEl.textContent = questions[round].choices[2];
    // fourthAnswerEl.textContent = questions[round].choices[3];
}    

function makeYourChoice() {
    var selectedAnswer = this.textContent;
    console.log(selectedAnswer);
    var correctAnswer = questions[round].answer
    if (selectedAnswer !== correctAnswer) {
        timerCount-=5;
    }
    round++;
    if (round < questions.length) {
      displayQuestion(); 
    } else {
        gameOver();
    }
    }


//Start the timer
function startTimer() {
    timer = setInterval(function() {
    timerCount--;
    timerElement.textContent = timerCount;
    if (timerCount === 0) {
        clearInterval(timer);
        gameOver();
    }
    }, 1000);
}

//Game over
function gameOver() {
    quizAreaEl.remove();
    var initials = window.prompt('Please enter your initials to save your score to the scoreboard.');
    localStorage.setItem('userInitials', initials);
    localStorage.setItem('userScore', timerCount);
    announcementAreaEl.textContent = 'Game Over! Your score is ' + timerCount;     
    document.body.appendChild(announcementAreaEl); 

    updateScoreboard();
      
}

function updateScoreboard() {
    var storedInitials = localStorage.getItem('userInitials');
    var storedScore = localStorage.getItem('userScore');
    var newEntry = document.createElement('h2');
    newEntry.textContent = storedInitials + ': ' + storedScore;
    document.body.appendChild(newEntry);
}

//Click the button to start the game
startButton.addEventListener('click', startGame);
