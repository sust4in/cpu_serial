import { assertEquals } from "https://deno.land/std@0.182.0/testing/asserts.ts";
import { getCPUSerialNumber } from "./mod.ts";

Deno.test("CPU Serial Number Retrieval", async () => {
  const cpuSerialNumber = await getCPUSerialNumber();
  console.log("CPU serial number:", cpuSerialNumber);

  // Check if the returned value is a non-empty string
  assertEquals(typeof cpuSerialNumber, "string");
  assertEquals(cpuSerialNumber.length > 0, true);
});
