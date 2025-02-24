// Basic arithmetic function
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
    // Prevent dividing by zero
    if (b === 0) {
        return null;
    }
    return a / b;
}

// Call the right function for calculation
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

// Track variables for calculation
let firstOperand = '';
let secondOperand = '';
let currentOperator = null;
let shouldResetScreen = false;

const display = document.querySelector('.display');
const digitButtons = document.querySelectorAll('.digit');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('.equals');

// Add event handlers
// Add event handler for digits (0-9 and .)
digitButtons.forEach(button => {
    button.addEventListener('click', () => appendDigit(button.dataset.digit));
});

// Add event handler for operators
operatorButtons.forEach(button => {
    button.addEventListener('click', () => setOperator(button.dataset.operator));
});

// Add event handler for evaluation (=)
equalsButton.addEventListener('click', evaluate);

// Display digit(s)
function appendDigit(digit) {
    if (shouldResetScreen) {
        resetScreen();
    }

    if (display.textContent === '0' && digit !== '.') {
        display.textContent = digit;
    } else {
        display.textContent += digit;
    }
}

// Set operator for calculation
function setOperator(operator) {
    firstOperand = display.textContent;
    currentOperator = operator;
    shouldResetScreen = true;
}

// Get result of calculation
function evaluate() {
    secondOperand = display.textContent;
    const result = operate(currentOperator, firstOperand, secondOperand);

    if (result === null) {
        // Division by zero or invalid
        display.textContent = 'Error';
    } else {
        display.textContent = result;
    }

    firstOperand = display.textContent;
    currentOperator = null;
}

// Reset screen
function resetScreen() {
    display.textContent = '';
    shouldResetScreen = false;
}
