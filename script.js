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

// Call the right function
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
