export class Question {
    constructor(text, container) {
        this.text = text;
        this.container = container;
    }

    render() {
        const optionElement = document.createElement('div');
        optionElement.classList.add('option');
        optionElement.textContent = this.text;
        optionElement.addEventListener('click', () => {
            document.querySelectorAll('.option').forEach(option => {
                option.classList.remove('selected');
            });
            optionElement.classList.add('selected');
        });
        this.container.appendChild(optionElement);
    }
}
