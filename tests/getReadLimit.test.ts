import { describe, expect, it } from "vitest";
import { getReadLimit } from "../src/components/lib";

describe("getReadLimit", () => {
  it("should only set read limit as integer values", () => {
    const result = getReadLimit();

    expect(result === parseInt(result.toString())).toBe(true);
  });
});
