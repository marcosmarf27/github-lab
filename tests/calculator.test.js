import { describe, it, expect } from "vitest";
import { sum } from "../src/calculator.js";

describe("calculator", () => {
  it("adds two numbers", () => {
    expect(sum(2, 3)).toBe(5);
  });
});
