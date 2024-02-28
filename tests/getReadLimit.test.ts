import { describe, expect, it, vi } from "vitest";
import { getReadLimit } from "../src/components/lib";

describe("getReadLimit", () => {
  it("should only set read limit as integer values", () => {
    const question = vi.fn();

    const limit = 3;
    question.mockReturnValue(limit);

    const result = getReadLimit();
    // expect(result === parseInt(result.toString())).toBe(true);
    expect(limit === parseInt(result.toString())).toBe(true);
  });
});
