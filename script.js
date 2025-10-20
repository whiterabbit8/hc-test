import { questions } from "./questions.js";

const addQuestionsNumbers = () => {
    const quantity = questions.max;
    const questionsWrapper = document.querySelector('.questions');
    for (let i = 1; i <= quantity; i++) {
        questionsWrapper.insertAdjacentHTML(
            'beforeend',
            `<div class="question">В${i}</div>`
        )
    };
}

addQuestionsNumbers();