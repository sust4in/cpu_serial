[![Deno](https://github.com/sust4in/cpu_serial/actions/workflows/deno.yml/badge.svg)](https://github.com/sust4in/cpu_serial/actions/workflows/deno.yml)

# Deno CPU Serial Number Retrieval

A simple Deno module to retrieve the CPU serial number in a cross-platform way.

## Supported Platforms

- Windows
- macOS
- Linux

## Usage

```javascript
import { getCPUSerialNumber } from "mod.ts";

try {
  const cpuSerialNumber = await getCPUSerialNumber();
  console.log("CPU serial number:", cpuSerialNumber);
} catch (error) {
  console.error(error);
}
```
