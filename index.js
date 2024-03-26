class Calculator {
    constructor(resultElement, tempElement, equalButton, clearButton, deleteButton) {
        this.result = resultElement;
        this.temp = tempElement;
        this.equal = equalButton;
        this.ac = clearButton;
        this.del = deleteButton;
        this.init();
    }

    init() {
        this.clear();
        this.equal.addEventListener("click", () => this.handleEqualClick());
        this.ac.addEventListener("click", () => this.handleAcClick());
        this.del.addEventListener("click", () => this.handleDelClick());
        this.addClickListeners(".number .btn", this.appendNumber.bind(this));
        this.addClickListeners(".operator .btn", this.chooseOperation.bind(this));
    }

    clear() {
        this.allOperators = [];
        this.operands = [''];
    }

    appendNumber(number) {
        if (number === '.' && this.operands[this.operands.length - 1].includes('.')) return;
        this.operands[this.operands.length - 1] += number.toString();
    }

    chooseOperation(operation) {
        if (this.operands[this.operands.length - 1] === '') return;
        if (this.operands.length > 1) this.compute();
        this.allOperators.push(operation);
        this.operands.push('');
    }

    compute() {
        const previous = parseFloat(this.operands[this.operands.length - 2]);
        const current = parseFloat(this.operands[this.operands.length - 1]);
        if (isNaN(current) || isNaN(previous)) return;
        let result = 0;

        switch (this.allOperators[this.allOperators.length - 1]) {
            case "+":
                result = previous + current;
                break;
            case "-":
                result = previous - current;
                break;
            case "*":
                result = previous * current;
                break;
            case "/":
                result = previous / current;
                break;
            default:
                throw new Error("Invalid operator. Only +, -, *, / operators are supported.");
        }
        this.operands.push(result);
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay = '';
        if (!isNaN(integerDigits)) {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        return `${integerDisplay}${typeof decimalDigits !== 'undefined' ? `.${decimalDigits}` : ''}`;
    }

    updateDisplay() {
        this.result.innerText = this.getDisplayNumber(this.operands[this.operands.length - 1]);
        if (this.allOperators.length > 0) {
            this.temp.innerText = `${this.getDisplayNumber(this.operands[this.operands.length - 2])} ${this.allOperators[this.allOperators.length - 1]}`;
        } else this.temp.innerText = '';
        console.log(this.operands);
        console.log(this.allOperators);
    }

    addClickListeners(selector, handler) {
        const buttons = document.querySelectorAll(selector);
        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                handler(button.innerText);
                this.updateDisplay();
            });
        });
    }

    handleEqualClick() {
        this.compute();
        this.allOperators = [];
        this.operands = [this.operands[this.operands.length - 1]];
        this.updateDisplay();
    }

    handleAcClick() {
        this.clear();
        this.updateDisplay();
    }

    handleDelClick() {
        this.operands[this.operands.length - 1] = this.operands[this.operands.length - 1].toString().slice(0, -1);
        this.updateDisplay();
    }
}

const resultElement = document.querySelector("#result");
const tempElement = document.querySelector("#temp");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#ac");
const deleteButton = document.querySelector("#del");

new Calculator(resultElement, tempElement, equalButton, clearButton, deleteButton);