import {
  calculateMean,
  calculateMode,
  calculateMedian,
} from "../src/calculateFunctions.js";

import { expect, test } from "@jest/globals";
import "../src/toBeWithinRange.js";
import axios from "axios";

const reqInstance = axios.create({
  headers: {
    Accept: "application/json",
  },
});

test("Mean to be within range", () => {
  const arr = [10, 2, 38, 23, 38, 23, 21];
  const result = calculateMean(arr);
  expect(result.success).toBeWithinRange(22.14, 22.15);
});

test("Mean to be close to", () => {
  const arr = [10, 2, 38, 23, 38, 23, 21];
  const result = calculateMean(arr);
  expect(result.success).toBeCloseTo(22.14, 2);
});

test("Mean to be any Number", () => {
  const arr = [10, 2, 38, 23, 38, 23, 21];
  const result = calculateMean(arr);
  expect(result.success).toEqual(expect.any(Number));
});

test("Mode to be", () => {
  const arr = [10, 2, 38, 23, 38, 23, 21];
  const result = calculateMode(arr);
  expect(result.success).toBe(23);
});

test("Median to be", () => {
  const arr = [10, 2, 38, 23, 38, 23, 21];
  const result = calculateMedian(arr);
  expect(result.success).toBe(23);
});

test("Mean from Express server", async () => {
  let response = await reqInstance.get(
    "http://localhost:3002/mean?nums=33,343333,333,111,11"
  );
  await expect(response.data.value.success).toBeCloseTo(68764.2, 4);
});

test("Mode from Express server", async () => {
  let response = await reqInstance.get(
    "http://localhost:3002/mode?nums=33,343333,333,111,11"
  );
  await expect(response.data.value.success).toBe(11);
});

test("Median from Express server", async () => {
  let response = await reqInstance.get(
    "http://localhost:3002/median?nums=33,343333,333,111,11"
  );
  await expect(response.data.value.success).toBe(111);
});

// test("Mean from Express server", () => {
//     let response = {};
//     let reqInstance = axios.create({
//       headers: {
//         Accept: "application/json",
//       },
//     });

//     async function getResponse() {
//       response = await reqInstance.get(
//         "http://localhost:3002/mean?nums=33,343333,333,111,11"
//       );
//       expect(response.data.value.success).toBeCloseTo(68763.2, 4);
//     }

//     getResponse();
//   });
