import { questions } from "./questions.js";

const addQuestionsNumbers = () => {
    const quantity = questions.max;
    const questionsWrapper = document.querySelector('.questions');
    for (let i = 1; i <= quantity; i++) {
        questionsWrapper.insertAdjacentHTML(
            'beforeend',
            `<div class="question">В${i}</div>`
        )
    }
}

const loadQuestion = (number = 0) => {
    const question = questions.questions[number].content;
    const answers = questions.questions[number].options;
    const questionElement = document.querySelector('.legend');
    const answersElement = document.querySelector('.answers');

    questionElement.innerHTML = question;
    
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



addQuestionsNumbers();
loadQuestion();