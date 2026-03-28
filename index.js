import { addQuestionsNumbers, loadQuestion, prevQuestion, 
    nextQuestion, chooseQuestion, chooseAnswer, checkAnswer, 
    countProgress} from "./script/script.js"; 

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const submitBtn = document.querySelector('.submit-btn');
const questionsList = document.querySelector('.questions');
const answers = document.querySelector('.answers');
const progressBtn = document.querySelector('.calc');

addQuestionsNumbers();
loadQuestion();

prevBtn.addEventListener('click', prevQuestion);
nextBtn.addEventListener('click', nextQuestion);
questionsList.addEventListener('click', chooseQuestion);
answers.addEventListener('click', chooseAnswer);
submitBtn.addEventListener('click', checkAnswer);
progressBtn.addEventListener('click', countProgress);