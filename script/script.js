import { questions } from "./questions.js";

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const submitBtn = document.querySelector('.submit-btn');
const questionsList = document.querySelector('.questions');
const answers = document.querySelector('.answers');
let currentQuestion = 0;
let currentAnswer = 0;

const addQuestionsNumbers = () => {
    const quantity = questions.max;
    const questionsWrapper = document.querySelector('.questions');
    for (let i = 1; i <= quantity; i++) {
        questionsWrapper.insertAdjacentHTML(
            'beforeend',
            `<div class="question" question-id="${i}">В${i}</div>`
        )
    }
}

const loadQuestion = (number = currentQuestion) => {
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

const nextQuestion = () => {
    if (currentQuestion != questions.max - 1) {
        currentQuestion += 1;
    }
    loadQuestion();
}

const prevQuestion = () => {
    if (currentQuestion != 0) {
        currentQuestion -=1;
    }
    loadQuestion();
}

const chooseQuestion = (event) => {
    const question = event.target.closest('.question');
    if (!question) return;

    const questionNumber = Number(question.getAttribute('question-id')) - 1;
    currentQuestion = questionNumber;
    loadQuestion(questionNumber);    
}

const chooseAnswer = (event) => {
    const answer = event.target.closest('.answer');
    if (!answer) return;

    currentAnswer = Number(answer.getAttribute('answer-id'));
}

const checkAnswer = () => {
    const rightAnswer = questions.questions[currentQuestion].correct_indexes[0];
    const checkedAnswer = document.querySelectorAll('.answer')[currentAnswer];
    const checkedQuestion = document.querySelectorAll('.question')[currentQuestion];    

    if (currentAnswer === rightAnswer) {
        checkedAnswer.classList.add('right');
        checkedQuestion.classList.add('right');
    } else {
        checkedAnswer.classList.add('wrong');
        checkedQuestion.classList.add('wrong');
        document.querySelectorAll('.answer')[rightAnswer].classList.add('right');
    }
}

prevBtn.addEventListener('click', prevQuestion);
nextBtn.addEventListener('click', nextQuestion);
questionsList.addEventListener('click', chooseQuestion);
answers.addEventListener('click', chooseAnswer);
submitBtn.addEventListener('click', checkAnswer);


addQuestionsNumbers();
loadQuestion();