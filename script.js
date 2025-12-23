'use strict';

let operand1;
let operand2;
let operator;

function add (num1, num2) {
    return num1 + num2;
}

function subtract (num1, num2) {
    return num1 - num2;
}

function multiply (num1, num2) {
    return num1 * num2;
}

function divide (num1, num2) {
    return num1 / num2;
}

function operate (operator, num1, num2) {
    switch (operator) {
        case "+":
            return add (num1, num2);
            break;
        case "-":
            return subtract(num1, num2);
            break;
        case "*":
            return multiply(num1, num2);
            break;
        case "/":
            return divide(num1, num2);
            break;
        default:
            break;
    }
}

const calculator = document.querySelector('#calculator-container');
const display = document.querySelector('#display')
let value;
calculator.addEventListener('click', (e) => {
    value = Number(e.target.textContent)
    if (!(Number.isNaN(value))) {
        console.log(e.target.textContent);
        display.textContent = e.target.textContent;
    }
})