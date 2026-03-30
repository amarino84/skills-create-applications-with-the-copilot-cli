/**
 * Unit tests for calculator.js
 *
 * Covers all four basic arithmetic operations:
 *   - add       (+)
 *   - subtract  (-)
 *   - multiply  (*)
 *   - divide    (/)
 *
 * Also tests the calculate() dispatcher and edge cases.
 */

const { add, subtract, multiply, divide, calculate } = require("../calculator");

// ─── Addition ────────────────────────────────────────────────────────────────
describe("add()", () => {
  test("2 + 3 = 5 (image example)", () => {
    expect(add(2, 3)).toBe(5);
  });

  test("adds two positive numbers", () => {
    expect(add(10, 20)).toBe(30);
  });

  test("adds a positive and a negative number", () => {
    expect(add(10, -4)).toBe(6);
  });

  test("adds two negative numbers", () => {
    expect(add(-5, -3)).toBe(-8);
  });

  test("adds zero (identity property)", () => {
    expect(add(7, 0)).toBe(7);
  });

  test("adds floating-point numbers", () => {
    expect(add(1.1, 2.2)).toBeCloseTo(3.3);
  });
});

// ─── Subtraction ─────────────────────────────────────────────────────────────
describe("subtract()", () => {
  test("10 - 4 = 6 (image example)", () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test("subtracts two positive numbers", () => {
    expect(subtract(20, 5)).toBe(15);
  });

  test("result is negative when b > a", () => {
    expect(subtract(3, 10)).toBe(-7);
  });

  test("subtracts a negative number (double negative)", () => {
    expect(subtract(5, -3)).toBe(8);
  });

  test("subtracts zero (no change)", () => {
    expect(subtract(9, 0)).toBe(9);
  });

  test("subtracts floating-point numbers", () => {
    expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
  });
});

// ─── Multiplication ───────────────────────────────────────────────────────────
describe("multiply()", () => {
  test("45 * 2 = 90 (image example)", () => {
    expect(multiply(45, 2)).toBe(90);
  });

  test("multiplies two positive numbers", () => {
    expect(multiply(6, 7)).toBe(42);
  });

  test("multiplies by zero (zero property)", () => {
    expect(multiply(99, 0)).toBe(0);
  });

  test("multiplies by one (identity property)", () => {
    expect(multiply(15, 1)).toBe(15);
  });

  test("multiplies two negative numbers (positive result)", () => {
    expect(multiply(-4, -3)).toBe(12);
  });

  test("multiplies a positive and a negative number", () => {
    expect(multiply(5, -6)).toBe(-30);
  });

  test("multiplies floating-point numbers", () => {
    expect(multiply(2.5, 4)).toBeCloseTo(10);
  });
});

// ─── Division ────────────────────────────────────────────────────────────────
describe("divide()", () => {
  test("20 / 5 = 4 (image example)", () => {
    expect(divide(20, 5)).toBe(4);
  });

  test("divides two positive numbers evenly", () => {
    expect(divide(10, 2)).toBe(5);
  });

  test("returns a decimal for non-even division", () => {
    expect(divide(7, 2)).toBeCloseTo(3.5);
  });

  test("divides a negative by a positive", () => {
    expect(divide(-12, 4)).toBe(-3);
  });

  test("divides two negatives (positive result)", () => {
    expect(divide(-9, -3)).toBe(3);
  });

  test("divides zero by a number (result is 0)", () => {
    expect(divide(0, 5)).toBe(0);
  });

  // Edge case: division by zero
  test("throws an error when dividing by zero", () => {
    expect(() => divide(9, 0)).toThrow("Division by zero is not allowed");
  });

  test("throws an error when dividing zero by zero", () => {
    expect(() => divide(0, 0)).toThrow("Division by zero is not allowed");
  });
});

// ─── calculate() dispatcher ──────────────────────────────────────────────────
describe("calculate()", () => {
  test('routes "+" to add', () => {
    expect(calculate(2, "+", 3)).toBe(5);
  });

  test('routes "-" to subtract', () => {
    expect(calculate(10, "-", 4)).toBe(6);
  });

  test('routes "*" to multiply', () => {
    expect(calculate(45, "*", 2)).toBe(90);
  });

  test('routes "/" to divide', () => {
    expect(calculate(20, "/", 5)).toBe(4);
  });

  test("throws on unsupported operator", () => {
    expect(() => calculate(5, "^", 2)).toThrow('Unsupported operator: "^"');
  });

  test("propagates divide-by-zero error", () => {
    expect(() => calculate(10, "/", 0)).toThrow("Division by zero is not allowed");
  });
});
