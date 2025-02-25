function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return null;
    }
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    switch(operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return null;
    }
}

let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let shouldResetScreen = false;

const display = document.querySelector('.display');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('#clear');
const backspaceButton = document.querySelector('#backspace');
const percentButton = document.querySelector('#percent');
const signButton = document.querySelector('#sign');

digitButtons.forEach(button => {
    button.addEventListener('click', () => appendDigit(button.dataset.digit));
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => setOperator(button.dataset.operator));
});

equalsButton.addEventListener('click', evaluate);

clearButton.addEventListener('click', clearAll);

backspaceButton.addEventListener('click', backspace);

percentButton.addEventListener('click', percent);

signButton.addEventListener('click', toggleSign);

function appendDigit(digit) {
    if (shouldResetScreen) {
        resetScreen();
    }

    // Disable multiple decimals
    if (display.textContent.includes('.') && digit === '.') {
        return;
    }

    if (display.textContent === '0' && digit !== '.') {
        display.textContent = digit;
    } else {
        display.textContent += digit;
    }
}

function setOperator(operator) {
    // If there's already an operator waiting, evaluate first
    if (currentOperator !== null && !shouldResetScreen) {
        evaluate();
    }

    firstOperand = display.textContent;
    currentOperator = operator;
    shouldResetScreen = true;
}

function evaluate() {
    // If no operator, do nothing
    if (currentOperator === null) {
        return;
    }

    secondOperand = display.textContent;
    const result = operate(currentOperator, firstOperand, secondOperand);

    if (result === null) {
        // Division by zero or invalid
        display.textContent = 'Error';
    } else {
        display.textContent = roundResult(result);
    }

    firstOperand = display.textContent;
    currentOperator = null;
}

function clearAll() {
    display.textContent = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperator = null;
    shouldResetScreen = false;
}

function backspace() {
    // Stop function execution immediately when display.textContent === "Error"
    if (display.textContent === "Error") {
        display.textContent = '0';
        return;
    }

    if (display.textContent.length === 1) {
        display.textContent = '0';
    } else {
        display.textContent = display.textContent.slice(0, -1);
    }
}

function percent() {
    const currentValue = parseFloat(display.textContent);
    const percentValue = currentValue / 100;
    display.textContent = roundResult(percentValue);
}

function toggleSign() {
    if (display.textContent === 'Error') {
        return;
    }

    let currentValue = parseFloat(display.textContent);
    currentValue = -currentValue;
    display.textContent = currentValue;
}

function resetScreen() {
    display.textContent = '';
    shouldResetScreen = false;
}

function roundResult(num) {
    return Math.round(num * 1e8) / 1e8;
}
