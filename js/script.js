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
    questionEl.textContent = questions[round].title;
    firstAnswerEl.textContent = questions[round].choices[0];
    secondAnswerEl.textContent = questions[round].choices[1];
    thirdAnswerEl.textContent = questions[round].choices[2];
    fourthAnswerEl.textContent = questions[round].choices[3];
    makeYourChoice();
}    

function makeYourChoice() {
    var myChoice = "";
    firstAnswerEl.addEventListener('click', function() {
        myChoice = questions[round].choices[0];
    })
    secondAnswerEl.addEventListener('click', function() {
        myChoice = questions[round].choices[1];
    })
    thirdAnswerEl.addEventListener('click', function() {
        myChoice = questions[round].choices[2];
    })
    fourthAnswerEl.addEventListener('click', function() {
        myChoice = questions[round].choices[3];
    })
    if (myChoice === questions[round].answer) {
        function thatsRight () {
            scoreCount++;
            round++;
            console.log('right')
            displayQuestion();
        }
    } else {
        function thatsWrong() {
        timerCount = timerCount - 5;
        round++;
        console.log('wrong')
        displayQuestion();
    }
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
