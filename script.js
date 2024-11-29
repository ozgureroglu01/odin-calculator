let firstNum = "";
let operator = "";
let secondNum = "";

const buttons = document.querySelectorAll(".buttons button");
const display = document.querySelector(".display");
const upperDisplay = document.querySelector(".upper-display");

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
    if (b == 0) {
        alert("Can't divide by 0");
        return null;
    }
    else {
        return a / b;
    }

}

function operate(operator, num1, num2) {
    switch (operator) {
        case "+":
            return add(num1, num2);
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
    }
}

function clear() {
    firstNum = "";
    secondNum = "";
    operator = "";
    display.textContent = 0;
    upperDisplay.textContent = "";
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.textContent;

        if (!isNaN(value)) {
            if (display.textContent === "=") {
                firstNum = value;
                secondNum = "";
                operator = "";
                display.textContent = firstNum;
            }
            else {
                if (operator) {
                    secondNum += value;
                }
                else {
                    firstNum += value;
                }
                display.textContent = firstNum + operator + secondNum
            }

        }
        else if (["+", "-", "*", "/"].includes(value)) {
            if (firstNum && !secondNum) {
                operator = value;
                display.textContent = firstNum + operator;
            }
            else if (secondNum) {
                const result = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
                upperDisplay.textContent = `${firstNum} ${operator} ${secondNum} = `;
                firstNum = result.toString();
                secondNum = "";
                operator = value;
                display.textContent = firstNum + operator;
            }
        }
        else if (value == "=") {
            const result = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
            upperDisplay.textContent = `${firstNum} ${operator} ${secondNum} = `;
            display.textContent = parseFloat(result.toFixed(2));
            if (secondNum == 0) {
                clear();
            }
            else {
                firstNum = parseFloat(result.toFixed(2));
                secondNum = "";
                operator = "";
            }
        }
        else if (value == "C") {
            clear();
        }
    });
});

