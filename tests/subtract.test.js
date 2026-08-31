import { describe, it, expect } from "vitest";
import { subtract } from "../src/calculator.js";

describe("subtract", () => {
  it("subtracts two numbers", () => {
    expect(subtract(5, 3)).toBe(2);
  });
});
