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

// const calculatorObj = { 
//     operators: { "+": (a, b) => a + b, "-": (a, b) => a - b, "*": (a, b) => a * b, "/": (a, b) => a / b }, operate(op) { return calculator.operators[op](calculator.firstValue, calculator.secondValue); } 
// };

const calculator = document.querySelector('#calculator-container');
const display = document.querySelector('#display')
display.textContent = 0;
let initialFirstValue;
let finalFirstValue;
let initialSecondValue;
let finalSecondValue;
let currentValue;
let evaluated = false;

// for talking point in interviews, my first approach, before realizing this is getting too complicated
// and had Chat GPT mentor/assist me in coming up with a new method

// calculator.addEventListener('click', (e) => {
//     if ((e.target.textContent === "+" || e.target.textContent === "-" || e.target.textContent === "*" || e.target.textContent === "/") && operator === undefined) {
//         display.textContent += `${e.target.textContent}`;
//         operator = `${e.target.textContent}`;
//     } else if (e.target.tagName === "BUTTON" && operator === undefined && !Number.isNaN(Number((e.target.textContent)))) {
//         initialFirstValue = initialFirstValue ? initialFirstValue + e.target.textContent : e.target.textContent;
//         finalFirstValue = Number(initialFirstValue);
//         display.textContent = finalFirstValue;        
    
//     } else if (e.target.tagName === "BUTTON" && operator && !Number.isNaN(Number((e.target.textContent)))) {
//         // secondValue = Number(e.target.textContent)
//         initialSecondValue = initialSecondValue ? initialSecondValue + e.target.textContent : e.target.textContent;
//         display.textContent += e.target.textContent;
//         finalSecondValue = Number(initialSecondValue);
        
//     } else if (e.target.tagName === "BUTTON" && e.target.textContent === "=" && finalFirstValue !== undefined && finalSecondValue !== undefined && operator !== undefined) {    
//         currentValue = operate(operator, finalFirstValue, finalSecondValue);
//         display.textContent = currentValue;
//         initialFirstValue = undefined
//         finalFirstValue = currentValue;
//         initialSecondValue = undefined;
//         finalSecondValue = undefined;
//         operator = undefined;   
//         evaluated = true;     
//     }
//     else {
//         return;
//     }
// })

calculator.addEventListener('click', (e) => {
   if (e.target.tagName !== 'BUTTON') {
    return;
   }

   if (!Number.isNaN(Number(e.target.textContent))) {

    if (evaluated === true) {
        evaluated = false;
        initialFirstValue = e.target.textContent;
        finalFirstValue = Number(initialFirstValue);
        display.textContent = finalFirstValue;
        finalSecondValue = undefined;
        initialSecondValue = undefined;
        operator = undefined;
    } else {
        if (operator === undefined) {
            initialFirstValue = initialFirstValue ? initialFirstValue + e.target.textContent : e.target.textContent;
            finalFirstValue = Number(initialFirstValue);
            display.textContent = finalFirstValue;
        } else {
            console.log(initialSecondValue);
            initialSecondValue = initialSecondValue ? initialSecondValue + e.target.textContent : e.target.textContent;
            finalSecondValue = Number(initialSecondValue);
            display.textContent += e.target.textContent;
        }
    }

   }

    if (e.target.textContent === "+" || e.target.textContent === "-" || e.target.textContent === "*" || e.target.textContent === "/") {
        evaluated = false;
 
        if (finalFirstValue !== undefined && finalSecondValue === undefined) {
            if (operator === undefined) {
                operator = e.target.textContent;
                display.textContent += e.target.textContent;
            } else {
                const newDisplay = display.textContent.replace(operator, e.target.textContent)
                display.textContent = newDisplay;
                operator = e.target.textContent;
            }
        }

        if (finalFirstValue !== undefined && finalSecondValue !== undefined) {
            finalFirstValue = operate(operator, finalFirstValue, finalSecondValue);
            operator = e.target.textContent;
            display.textContent = finalFirstValue + operator;
            finalSecondValue = undefined;
            initialSecondValue = undefined;
        }
        
        
    }

    if (e.target.textContent === "=") {
        if (finalFirstValue !== undefined && finalSecondValue !== undefined) {
            evaluated = true;
            finalFirstValue = operate(operator, finalFirstValue, finalSecondValue);
            display.textContent = finalFirstValue;
            operator = undefined;
            initialSecondValue = undefined;
            finalSecondValue = undefined;
        }
    }

    if (e.target.textContent === "AC") {

    }
})