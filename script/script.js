import { questions } from "./questions.js";

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const questionsList = document.querySelector('.questions');
let currentQuestion = 0;

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
        `<div class="answer">
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
    loadQuestion(questionNumber);
}

prevBtn.addEventListener('click', prevQuestion);
nextBtn.addEventListener('click', nextQuestion);
questionsList.addEventListener('click', chooseQuestion);

addQuestionsNumbers();
loadQuestion();