import { questions } from "./questions.js";

let currentQuestion = 0;
let currentAnswer;
let questionsProgress;

const getStorage = () => {
    if (localStorage.getItem('questionsProgress')) {
        questionsProgress = JSON.parse(localStorage.getItem('questionsProgress'));
    } else {
        questionsProgress = new Array(questions.max).fill(0);
    }
}

export const addQuestionsNumbers = () => {
    getStorage();
    const quantity = questions.max;
    const questionsWrapper = document.querySelector('.questions');
    for (let i = 0; i < quantity; i++) {
        if (questionsProgress[i] === 'true') {
            questionsWrapper.insertAdjacentHTML(
                'beforeend',
                `<div class="question right" question-id="${i+1}">В${i+1}</div>`
            )
        } else if (questionsProgress[i] === 'false') {
            questionsWrapper.insertAdjacentHTML(
                'beforeend',
                `<div class="question wrong" question-id="${i+1}">В${i+1}</div>`
            )
        } else {
            questionsWrapper.insertAdjacentHTML(
                'beforeend',
                `<div class="question" question-id="${i+1}">В${i+1}</div>`
            )
        }
    }
}

export const loadQuestion = (number = currentQuestion) => {
    const question = questions.questions[number].content;
    const answers = questions.questions[number].options;
    const questionElement = document.querySelector('.legend');
    const answersElement = document.querySelector('.answers');

    questionElement.innerHTML = question;
    answersElement.innerHTML = '';
    
    for (let i = 0; i < answers.length; i++) {
        answersElement.insertAdjacentHTML(
        'beforeend',
        `<div class="answer" answer-id="${i}">
            <input type="radio" id="answer${i}" name="answer" value="answer${i}" />
            <label for="answer${i}">${answers[i]}</label>
        </div>`
        )
    }    
}

export const nextQuestion = () => {
    if (currentQuestion != questions.max - 1) {
        currentQuestion += 1;
    }
    loadQuestion();
}

export const prevQuestion = () => {
    if (currentQuestion != 0) {
        currentQuestion -=1;
    }
    loadQuestion();
}

export const chooseQuestion = (event) => {
    const question = event.target.closest('.question');
    if (!question) return;

    const questionNumber = Number(question.getAttribute('question-id')) - 1;
    currentQuestion = questionNumber;
    loadQuestion(questionNumber);    
}

export const chooseAnswer = (event) => {
    const answer = event.target.closest('.answer');
    if (!answer) return;

    currentAnswer = Number(answer.getAttribute('answer-id'));
}

export const checkAnswer = () => {
    const rightAnswer = questions.questions[currentQuestion].correct;
    const checkedAnswer = document.querySelectorAll('.answer')[currentAnswer];
    const checkedQuestion = document.querySelectorAll('.question')[currentQuestion];    

    if (currentAnswer === rightAnswer) {
        checkedAnswer.classList.add('right');
        checkedQuestion.classList.add('right');
        questionsProgress[currentQuestion] = 'true';
    } else {
        checkedAnswer.classList.add('wrong');
        checkedQuestion.classList.add('wrong');
        document.querySelectorAll('.answer')[rightAnswer].classList.add('right');
        questionsProgress[currentQuestion] = 'false';
    }
    setStorage();
}

export const countProgress = () => {
    const progressElement = document.querySelector('.progress');
    const rightQuantity = questionsProgress.filter((item) => item === 'true').length;
    progressElement.innerHTML = `${(rightQuantity * 100 / questions.max).toFixed(2)}%`;
}

const setStorage = () => {
    localStorage.setItem('questionsProgress', JSON.stringify(questionsProgress));
}