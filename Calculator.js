// Get references to the calculator buttons and display
const buttons = document.querySelectorAll('.button');
const display = document.querySelector('#display');

// Initialize calculator state
let currentNumber = '';
let previousNumber = null;
let operator = null;

// Helper function to update the display
function updateDisplay() {
  display.textContent = currentNumber;
}

// Helper function to perform a calculation
function calculate() {
  const num1 = parseFloat(previousNumber);
  const num2 = parseFloat(currentNumber);
  let result;

  switch (operator) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
  }

  currentNumber = result.toString();
  previousNumber = null;
  operator = null;
}

// Add event listeners to buttons
buttons.forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    // Number button
    if (!isNaN(value)) {
      currentNumber += value;
      updateDisplay();
    }

    // Operator button
    if (['+', '-', '*', '/'].includes(value)) {
      // If an operator was already selected, perform the previous calculation
      if (operator !== null && previousNumber !== null) {
        calculate();
        updateDisplay();
      }

      previousNumber = currentNumber;
      currentNumber = '';
      operator = value;
    }

    // Equals button
    if (value === '=') {
      if (previousNumber !== null) {
        calculate();
        updateDisplay();
      }
    }

    // Clear button
    if (value === 'C') {
      currentNumber = '';
      previousNumber = null;
      operator = null;
      updateDisplay();
    }
  });
});