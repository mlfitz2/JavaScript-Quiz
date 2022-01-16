var quizAreaEl = document.querySelector('.quiz-area');
var startButton = document.querySelector('#start-button')
var timerElement = document.querySelector('#time-left');
var announcementAreaEl = document.querySelector('.announcement-area');
var questionEl = document.querySelector('#question');
var firstAnswerEl = document.querySelector('#first-answer');
var secondAnswerEl = document.querySelector('#second-answer');
var thirdAnswerEl = document.querySelector('#third-answer');
var fourthAnswerEl = document.querySelector('#fourth-answer');
var answerEl = document.querySelector('.answer');
var buttonZone = document.querySelector('#button-zone');
var endScreenEl = document.querySelector('#end-screen');
var finalScoreEl = document.querySelector('#final-score');
var initialsInput = document.querySelector('#initials');

var timerCount = 60;
var round = 0;




//Start without any questions on the screen
quizAreaEl.remove();

//Start the game
function startGame() {
    startTimer();
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
}    

//Choose answer
function makeYourChoice() {
    var selectedAnswer = this.textContent;
    var correctAnswer = questions[round].answer;
    if (selectedAnswer !== correctAnswer) {
        timerCount-=5;
        this.classList.add('wrong');
        this.style('color', 'red');
    } else if (selectedAnswer === correctAnswer) {
        round++;
    }
    if (round < questions.length) {
        displayQuestion(); 
    } else {
        clearInterval(timer);
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
    endScreenEl.removeAttribute('class');
    var userScore = timerCount;
    finalScoreEl.textContent = userScore;
    saveMyScore();      
}

//Update the scoreboard
function saveMyScore() {
    var submitButton = document.querySelector('#submit');
    submitButton.addEventListener('click', function() {
        userScore = timerCount;
        var userInfo = {
            initials: initialsInput.value,
            score: userScore.value
        };
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        console.log(userInfo);
    })
}



//Update the scoreboard
// function updateScoreboard() {
//     var storedInitials = localStorage.getItem('userInitials');
//     var storedScore = localStorage.getItem('userScore');
//     var newEntry = document.createElement('h2');
//     newEntry.textContent = storedInitials + ': ' + storedScore;
//     document.body.appendChild(newEntry);
// }

//Click the button to start the game
startButton.addEventListener('click', startGame);
