#!/usr/bin/env node

/**
 * Node.js CLI Calculator
 *
 * Supported operations:
 *   +   Addition       : adds two numbers
 *   -   Subtraction    : subtracts the second number from the first
 *   *   Multiplication : multiplies two numbers
 *   /   Division       : divides the first number by the second (no division by zero)
 *
 * Usage:
 *   node src/calculator.js <number> <operator> <number>
 *
 * Examples:
 *   node src/calculator.js 10 + 5   => 10 + 5 = 15
 *   node src/calculator.js 10 - 3   => 10 - 3 = 7
 *   node src/calculator.js 6 * 7    => 6 * 7 = 42
 *   node src/calculator.js 20 / 4   => 20 / 4 = 5
 */

// Addition: returns the sum of a and b
function add(a, b) {
  return a + b;
}

// Subtraction: returns the difference of a and b
function subtract(a, b) {
  return a - b;
}

// Multiplication: returns the product of a and b
function multiply(a, b) {
  return a * b;
}

// Division: returns the quotient of a divided by b
// Throws an error if b is zero to prevent undefined results
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero is not allowed");
  }
  return a / b;
}

// Routes the operation to the correct function based on the operator symbol
function calculate(a, operator, b) {
  switch (operator) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "*": return multiply(a, b);
    case "/": return divide(a, b);
    default:
      throw new Error(`Unsupported operator: "${operator}". Use +, -, *, or /`);
  }
}

// Export functions for unit testing
if (typeof module !== "undefined") {
  module.exports = { add, subtract, multiply, divide, calculate };
}

// Only run CLI logic when this file is executed directly (not when imported by tests)
if (require.main === module) {
  const [,, arg1, operator, arg2] = process.argv;

  if (!arg1 || !operator || !arg2) {
    console.error("Usage: node src/calculator.js <number> <operator> <number>");
    console.error("Supported operators: + - * /");
    process.exit(1);
  }

  const a = parseFloat(arg1);
  const b = parseFloat(arg2);

  if (isNaN(a) || isNaN(b)) {
    console.error("Error: Both operands must be valid numbers");
    process.exit(1);
  }

  try {
    const result = calculate(a, operator, b);
    console.log(`${a} ${operator} ${b} = ${result}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
}
