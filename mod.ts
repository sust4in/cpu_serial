const { run, build, readAll } = Deno;

export function getCPUSerialNumber(): Promise<string> {
  switch (build.os) {
    case "linux":
      return getCPUSerialLinux();
    case "windows":
      return getCPUSerialWindows();
    case "darwin":
      return getCPUSerialMac();
    default:
      throw new Error(`Not supported on your operating system '${build.os}'`);
  }
}

function parse(bytes: Uint8Array, os: string): string {
  const output = new TextDecoder().decode(bytes);

  if (os === "windows") {
    return output
      .toString()
      .split("ProcessorId")[1]
      .replace(/\r+|\n+|\s+/gi, "")
      .trim();
  } else if (os === "linux") {
    const serialMatch = output.match(/Serial\s+:\s+(\S+)/);
    if (serialMatch) {
      return serialMatch[1];
    }

    // If a unique serial number is not found, try to extract the CPU ID
    // Note: This ID is not unique
    const idMatch = output.match(/ID:\s*(\S+)/);
    return idMatch ? idMatch[1] : "";
  } else if (os === "darwin") {
    const match = output.match(/Serial\sNumber\s\(system\):\s+(\S+)/);
    return match ? match[1] : "";
  }

  throw new Error(`Not supported on your operating system '${os}'`);
}

async function getCPUSerialWindows(): Promise<string> {
  const ps = run({
    stdout: "piped",
    cmd: ["wmic", "cpu", "get", "ProcessorId"],
  });

  const output = await readAll(ps.stdout!);

  ps.stdout.close();
  ps.close();

  return parse(output, "windows");
}

async function getCPUSerialMac(): Promise<string> {
  const ps = run({
    stdout: "piped",
    cmd: ["system_profiler", "SPHardwareDataType"],
  });

  const output = await readAll(ps.stdout!);

  ps.stdout.close();
  ps.close();

  return parse(output, "darwin");
}

async function getCPUSerialLinux(): Promise<string> {
    const ps = run({
        stdout: "piped",
        cmd: ["sudo", "dmidecode", "-t", "processor"],
      });
    
      const output = await readAll(ps.stdout!);
    
      ps.stdout.close();
      ps.close();
    
      return parse(output, "linux");
}
