import { describe, expect, it, vi } from "vitest";
import { readCrashes } from "../src/components/functions";
import { getReadLimit } from "../src/components/lib/getReadLimit";

vi.mock("../src/components/lib/getReadLimit");

describe("readCrashes", () => {
  it("should produce prompt with set maximum number of stack traces to read", () => {
    const numStackTracesToRead = 2;
    vi.mocked(getReadLimit).mockReturnValue(numStackTracesToRead);

    const result = readCrashes();
    const numStackTracesRead = Math.floor(result.split("```").length / 2);

    expect(numStackTracesRead).toEqual(numStackTracesToRead);
  });
});
