import { describe, expect, test } from "vitest";
import { computeFees, getProfile } from "./profiles";

describe("computeFees", () => {
  test.each([
    [30_000_000_000, 20_000_000 * 1.18],
    [25_000_000_000, 20_000_000 * 1.18],
    [5_000_000_000, 12_500_000 * 1.18],
    [24_999_999_999, 12_500_000 * 1.18],
    [1_000_000_000, 5_000_000 * 1.18],
    [4_999_999_999, 5_000_000 * 1.18],
    [200_000_000, 2_000_000 * 1.18],
    [999_999_999, 2_000_000 * 1.18],
    [30_000_000, 500_000 * 1.18],
    [199_999_999, 500_000 * 1.18],
    [29_999_999, 200_000 * 1.18],
    [0, 200_000 * 1.18],
  ])("Computes fees for profile#1 with revenues %d", (revenues, expected) => {
    const fees = computeFees(1, revenues);
    expect(fees).toBe(expected);
  });

  test("Computes fees for profile#2", () => {
    const fees = computeFees(2);
    expect(fees).toBe(5_000_000 * 1.18);
  });

  test("Computes fees for profile#3", () => {
    const fees = computeFees(3);
    expect(fees).toBe(4_000_000 * 1.18);
  });

  test("Computes fees for profile#4", () => {
    const fees = computeFees(4);
    expect(fees).toBe(4_000_000 * 1.18);
  });

  test("Computes fees for profile#5", () => {
    const fees = computeFees(5);
    expect(fees).toBe(150_000 * 1.18);
  });

  test("Computes fees for profile#6", () => {
    const fees = computeFees(6);
    expect(fees).toBe(2_000_000 * 1.18);
  });

  test("Computes fees for profile#7", () => {
    const fees = computeFees(7);
    expect(fees).toBe(100_000 * 1.18);
  });
});

test("get profile by id", () => {
  const profile = getProfile(1);
  expect(profile.name).toBe("Sociétés minières ou Cimenteries");
});
