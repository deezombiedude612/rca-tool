import { it, expect, describe, vi } from "vitest";
import { getNewUserPrompt } from "../src/components/lib";

describe("getNewUserPrompt", () => {
  it("should only allow non-empty prompt inputs", () => {
    const question = vi.fn();

    const prompt = "prompt";
    question.mockReturnValue(prompt);

    const result = getNewUserPrompt();
    expect(result).toBe(prompt);
  });
});
