const questions = [
    {
        questionText: 'Commonly used data types DO NOT include:',
        options: ['1. strings', '2. booleans', '3. alerts', '4. numbers'],
        answer: '3. alerts',
    },
    {
        questionText: 'Arrays in JavaScript can be used to store ______.',
        options: [
            '1. numbers and strings',
            '2. other arrays',
            '3. booleans',
            '4. all of the above',
        ],
        answer: '4. all of the above',
    },
    {
        questionText:
            'String values must be enclosed within _____ when being assigned to variables.',
        options: ['1. commas', '2. curly brackets', '3. quotes', '4. parentheses'],
        answer: '3. quotes',
    },
    {
        questionText:
            'A very useful tool used during development and debugging for printing content to the debugger is:',
        options: ['1. JavaScript', '2. terminal/bash', '3. for loops', '4. console.log'],
        answer: '4. console.log',
    },
    {
        questionText:
            'Which of the following is a statement that can be used to terminate a loop, switch or label statement?',
        options: ['1. break', '2. stop', '3. halt', '4. exit'],
        answer: '1. break',
    },
];

const viewHighscores = document.getElementById('leaderboard');
const btnBack = document.getElementById('go-back');
const btnClear = document.getElementById('clear');
const highscores = document.getElementById('highscores');
const startQuizBtn = document.getElementById('start-quiz');
const quizIntro = document.getElementById('quiz-intro');
const quiz = document.getElementById('quiz');
const answerDiv = document.querySelector('.answer-wrapper');
const answer = document.getElementById('answer');
const time = document.getElementById('time');
const questionHeading = document.getElementById('question');
const options = document.querySelectorAll('.option-btn');
const quizEnd = document.getElementById('quiz-end');
const answerCount = document.getElementById('answer-number');
const btnSubmit = document.querySelector('.submit-btn');
const initials = document.getElementsByName('initials')[0];
const highscoreStatus = document.getElementById('highscore-status');
const enterInitials = document.getElementById('enter');

let timeLeft = 0;
let correctAnswers = 0;
let currentPlayer = ['', 0];

// fadeIn function
function fadeIn(el) {
    el.style.animation = 'fadeIn .2s ease-in';
    setTimeout(function () {
        el.style.display = 'flex';
    }, 20);
}

// fadeOut function
function fadeOut(el) {
    el.style.animation = 'fadeOut .2s ease-out';
    setTimeout(function () {
        el.style.display = 'none';
    }, 20);
}

// start timer
function startTimer() {
    if (timeLeft == 0 || currentQuestion == questions.length - 1) {
        setTimeout(function () {
            timeLeft = 0;
            answerCount.textContent = correctAnswers;
            fadeOut(quiz);
            fadeIn(quizEnd);
            time.textContent = 'Time: ' + timeLeft;
        }, 500);
    } else {
        timeLeft--;
        time.textContent = 'Time: ' + timeLeft;
        setTimeout(startTimer, 1000);
    }
}

// show higscores
viewHighscores.addEventListener('click', function () {
    if (quizIntro.style.display == 'flex') {
        fadeOut(quizIntro);
    } else if (quiz.style.display == 'flex') {
        fadeOut(quiz);
    } else {
        fadeOut(quizEnd);
    }
    fadeIn(highscores);
});

// back from highscores to quiz intro
btnBack.addEventListener('click', function () {
    fadeOut(highscores);
    fadeIn(quizIntro);
});

// start quiz
startQuizBtn.addEventListener('click', function () {
    currentQuestion = 0;
    correctAnswers = 0;
    currentPlayer = ['', 0];
    timeLeft = 50;
    questionHeading.textContent = questions[currentQuestion].questionText;
    options[0].textContent = questions[currentQuestion].options[0];
    options[1].textContent = questions[currentQuestion].options[1];
    options[2].textContent = questions[currentQuestion].options[2];
    options[3].textContent = questions[currentQuestion].options[3];
    answerDiv.style.display = 'none';
    fadeOut(quizIntro);
    fadeIn(quiz);
    startTimer();
});

// add highscore
function addHighscore() {
    if (highscoreStatus.textContent == 'No highscores yet!') {
        highscoreStatus.innerHTML = `
        <ol>
            <li>${currentPlayer[0]} - ${currentPlayer[1]}</li>
        </ol>
        `;
    } else {
        document.getElementsByTagName(
            'ol'
        )[0].innerHTML += `<li>${currentPlayer[0]} - ${currentPlayer[1]}</li>`;
    }
}

// check and send highscores
function checkAndSend() {
    if (initials.value.trim().length > 2 || initials.value.trim().length == 0) {
        enterInitials.style.display = 'block';
        return;
    } else {
        enterInitials.style.display = 'none';
        currentPlayer[0] = initials.value.trim();
        currentPlayer[1] = correctAnswers;
        fadeOut(quizEnd);
        fadeIn(highscores);
        addHighscore();
    }
}

// add highscore on ENTER
initials.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
        checkAndSend();
    }
});

// clear highscore
btnClear.addEventListener('click', function () {
    highscoreStatus.innerHTML = 'No highscores yet!';
});

// submit to highscore
btnSubmit.addEventListener('click', function () {
    checkAndSend();
});

// go to next question
function nextQuestion() {
    if (currentQuestion == questions.length - 1) {
        return;
    } else {
        currentQuestion++;
        questionHeading.textContent = questions[currentQuestion].questionText;
        options[0].textContent = questions[currentQuestion].options[0];
        options[1].textContent = questions[currentQuestion].options[1];
        options[2].textContent = questions[currentQuestion].options[2];
        options[3].textContent = questions[currentQuestion].options[3];
        fadeOut(answerDiv);
    }
}

// options loop
options.forEach(function (option) {
    option.addEventListener('click', function (e) {
        let text = e.currentTarget.textContent;
        if (text == questions[currentQuestion].answer) {
            correctAnswers++;
            fadeIn(answerDiv);
            answer.textContent = 'Correct!';
        } else {
            timeLeft -= 10;
            answer.textContent = 'Incorrect!';
            fadeIn(answerDiv);
        }
        setTimeout(nextQuestion, 1000);
    });
});
