'use strict';


function add (num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract (num1, num2) {
    return Number(num1) - Number(num2);
}

function multiply (num1, num2) {
    return Number(num1) * Number(num2);
}

function divide (num1, num2) {
    return Number(num1) / Number(num2);
}

function operate (operator, num1, num2) {
    switch (operator) {
        case "+":
            console.log(num1, num2)
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
display.textContent = 0;
let initialFirstValue;
let finalFirstValue;
let initialSecondValue;
let finalSecondValue;
let currentValue;
let operator;
let evaluated = false;

function displayBox (firstValue, operator, secondValue) {
    
    if (firstValue !== undefined && operator !== undefined && secondValue !== undefined) {
        display.textContent = `${firstValue}${operator}${secondValue}`
    } else if (operator !== undefined) {
        display.textContent = `${firstValue}${operator}`
    } else {
        if (firstValue === undefined) {
            display.textContent = 0;
        } else {
            display.textContent = `${firstValue}`
        }
    }
}

calculator.addEventListener('click', (e) => {
   if (e.target.tagName !== 'BUTTON') {
    return;
   }

   if (!Number.isNaN(Number(e.target.textContent))) {

    if (evaluated === true) {
        evaluated = false;
        initialFirstValue = e.target.textContent;
        finalFirstValue = Number(initialFirstValue);
        displayBox(finalFirstValue, operator, finalSecondValue);
        // display.textContent = finalFirstValue;
        finalSecondValue = undefined;
        initialSecondValue = undefined;
        operator = undefined;
    } else {
        if (operator === undefined) {
            initialFirstValue = initialFirstValue ? initialFirstValue + e.target.textContent : e.target.textContent;
            finalFirstValue = Number(initialFirstValue);
            displayBox(finalFirstValue, operator, finalSecondValue);
        } else {
            initialSecondValue = initialSecondValue ? initialSecondValue + e.target.textContent : e.target.textContent;
            finalSecondValue = Number(initialSecondValue);
            displayBox(finalFirstValue, operator, finalSecondValue);
        }
    }

   }

    if (e.target.textContent === "+" || e.target.textContent === "-" || e.target.textContent === "*" || e.target.textContent === "/") {
        evaluated = false;

        if (finalFirstValue !== undefined && finalSecondValue === undefined) {
            if (operator === undefined) {
                operator = e.target.textContent;
                // display.textContent += e.target.textContent;
                displayBox(finalFirstValue, operator, finalSecondValue);
            } else {
                const newDisplay = display.textContent.replace(operator, e.target.textContent)
                // display.textContent = newDisplay;
                operator = e.target.textContent;
                displayBox(finalFirstValue, operator, finalSecondValue);

            }
        }

        if (finalFirstValue !== undefined && finalSecondValue !== undefined) {
            finalFirstValue = operate(operator, finalFirstValue, finalSecondValue);
            operator = e.target.textContent;
            display.textContent = finalFirstValue + operator;
            // displayBox(finalFirstValue, operator, finalSecondValue);
            finalSecondValue = undefined;
            initialSecondValue = undefined;
        }
        
        
    }

    if (e.target.textContent === "=") {
        if (finalFirstValue !== undefined && finalSecondValue !== undefined) {
            evaluated = true;
            finalFirstValue = operate(operator, finalFirstValue, finalSecondValue);
            display.textContent = finalFirstValue;
            // displayBox(finalFirstValue, operator, finalSecondValue);

            operator = undefined;
            initialSecondValue = undefined;
            finalSecondValue = undefined;
            
        }
    }

    if (e.target.textContent === "AC") {
        display.textContent = 0;
        initialFirstValue = undefined;
        finalFirstValue = undefined;
        initialSecondValue = undefined;
        finalSecondValue = undefined;
        currentValue = undefined;
        operator = undefined;
        evaluated = false;
        
    }

    if (e.target.textContent === "←") {
        if (display.textContent === "0") {
            return;
        }
        if (finalFirstValue !== undefined && operator !== undefined && finalSecondValue !== undefined) {
            finalSecondValue = Math.floor(finalSecondValue / 10);
            if (finalSecondValue === 0) {
                initialSecondValue = undefined;
                finalSecondValue = undefined;
                displayBox(finalFirstValue, operator, finalSecondValue)
            } else {
                displayBox(finalFirstValue, operator, finalSecondValue)
            }
        } else if (operator !== undefined) {
            operator = undefined;
            displayBox(finalFirstValue, operator, finalSecondValue)
        } else {
            finalFirstValue = Math.floor(finalFirstValue / 10);
            if (finalFirstValue === 0) {
                initialFirstValue = undefined;
                finalFirstValue = undefined;
                displayBox(finalFirstValue, operator, finalFirstValue)
            } else {
                displayBox(finalFirstValue, operator, finalFirstValue)
            }

        }
    }

    if (e.target.textContent === ".") {
        if (initialFirstValue !== undefined) {
            initialFirstValue += '.';
            displayBox(initialFirstValue, operator, finalSecondValue);
            // console.log(finalFirstValue + ".");
        }
    }

})