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

// Allowed range from -MAX_VALUE to MAX_VALUE
const MAX_VALUE = 9.9999999e99;

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

    // Check if the number exceeds allowed range
    let currentNumber = parseFloat(display.textContent);
    if (!isNaN(currentNumber)) {
        if (Math.abs(currentNumber) > MAX_VALUE) {
            display.textContent = 'Error';
            shouldResetScreen = true;
            return;
        }
    }

    // Auto scroll to right after appending
    display.scrollLeft = display.scrollWidth;
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

    if (result === null || Math.abs(result) > MAX_VALUE) {
        display.textContent = 'Overflow';
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

    if (Math.abs(percentValue) > MAX_VALUE) {
        display.textContent = 'Overflow';
        return;
    }
    display.textContent = roundResult(percentValue);
}

function toggleSign() {
    if (display.textContent === 'Error') {
        return;
    }

    let currentValue = parseFloat(display.textContent);
    currentValue = -currentValue;

    if (Math.abs(currentValue) > MAX_VALUE) {
        display.textContent = 'Overflow';
        return;
    }

    display.textContent = currentValue;
}

function resetScreen() {
    display.textContent = '';
    shouldResetScreen = false;
}

function roundResult(num) {
    const rounded = Math.round(num * 1e8) / 1e8;
    const str = rounded.toString();

    if (str.length > 17) {
        return rounded.toExponential(8);
    }

    return rounded;
}

window.addEventListener('keydown', handleKeyboardInput);

function handleKeyboardInput(e) {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        appendDigit(e.key);
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        setOperator(e.key);
    }
    if (e.key === 'Enter' || e.key === '=') {
        evaluate();
    }
    if (e.key === 'Escape') {
        clearAll();
    }
    if (e.key === 'Backspace') {
        backspace();
    }
}
