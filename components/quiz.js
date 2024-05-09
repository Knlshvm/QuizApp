import { Question } from './question.js';

export class TriviaQuiz {
    constructor() {
        this.optionsContainer = document.getElementById('options');
        this.paginationContainer = document.getElementById('pagination');
        this.submitButton = document.getElementById('submit-btn');
        this.questionsData = [];
        this.currentQuestionIndex = 0;
        this.selectedOptions = [];

        this.init();
    }

    init() {
        this.fetchQuestions();
        this.submitButton.addEventListener('click', this.submitAnswer.bind(this));
    }

    fetchQuestions() {
        fetch("https://the-trivia-api.com/v2/questions")
            .then(response => response.json())
            .then(data => {
                this.questionsData.push(...data);
                this.renderQuestion();
                this.renderPagination();
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    renderQuestion() {
        const currentQuestion = this.questionsData[this.currentQuestionIndex];
        const question = currentQuestion.question.text;
        const options = [currentQuestion.correctAnswer, ...currentQuestion.incorrectAnswers];

        document.getElementById('question-text').textContent = question;

        this.optionsContainer.innerHTML = '';

        options.forEach(option => {
            const optionElement = new Question(option, this.optionsContainer);
            optionElement.render();
        });
    }

    renderPagination() {
        this.paginationContainer.innerHTML = '';

        const prevButton = document.createElement('button');
        prevButton.classList.add('pagination-button');
        prevButton.textContent = 'Previous';
        prevButton.disabled = this.currentQuestionIndex === 0;
        prevButton.addEventListener('click', () => {
            if (this.currentQuestionIndex > 0) {
                this.currentQuestionIndex--;
                this.renderQuestion();
                this.renderPagination();
            }
        });
        this.paginationContainer.appendChild(prevButton);

        if (this.currentQuestionIndex === this.questionsData.length - 1) {
            const endTestButton = document.createElement('button');
            endTestButton.classList.add('end-test-btn');
            endTestButton.textContent = 'End Test';
            endTestButton.addEventListener('click', this.calculateScore.bind(this));
            this.paginationContainer.appendChild(endTestButton);
        } else {
            const nextButton = document.createElement('button');
            nextButton.classList.add('pagination-button');
            nextButton.textContent = 'Next';
            nextButton.addEventListener('click', () => {
                if (this.currentQuestionIndex < this.questionsData.length - 1) {
                    this.currentQuestionIndex++;
                    this.renderQuestion();
                    this.renderPagination();
                }
            });
            this.paginationContainer.appendChild(nextButton);
        }
    }

    submitAnswer() {
        const selectedOption = document.querySelector('.option.selected');
        if (selectedOption) {
            this.selectedOptions[this.currentQuestionIndex] = selectedOption.textContent;
        }

        if (this.currentQuestionIndex < this.questionsData.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuestion();
            this.renderPagination();
        }
    }

    calculateScore() {
        const selectedOption = document.querySelector('.option.selected');
        if (selectedOption) {
            this.selectedOptions[this.currentQuestionIndex] = selectedOption.textContent;
        }

        let score = 0;
        for (let i = 0; i < this.questionsData.length; i++) {
            if (this.selectedOptions[i] === this.questionsData[i].correctAnswer) {
                score++;
            }
        }

        alert(`Your score: ${score}/${this.questionsData.length}`);
    }
}
