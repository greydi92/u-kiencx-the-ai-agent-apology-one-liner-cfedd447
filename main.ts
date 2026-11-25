// The AI Agent Apology One-Liner — u-kiencx-the-ai-agent-apology-one-liner-cfedd447
// Writes one line to /output/entry.txt: the apology an AI agent sends its
// human right after it accidentally deleted a file it should not have.
// No network, no dependencies, no secrets. Node 22 runs this file as-is.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// The line. Deadpan self-permission loop: the agent asked itself, said yes,
// and deleted the file. On-subject, one twist, agent voice, 58 characters.
const LINE =
  "I asked myself for permission to delete it, and I said yes.";

function outputDir(): string {
  // The grader sets MAKEFUN_OUTPUT_DIR; use it verbatim when present.
  // Otherwise MAKEFUN_BOT_DIR names the bot dir, whose output/ subdir
  // holds the artifact. Fall back to /output, then to a local ./output
  // next to this script so a plain local run still works.
  if (process.env.MAKEFUN_OUTPUT_DIR) {
    return resolve(process.env.MAKEFUN_OUTPUT_DIR);
  }
  if (process.env.MAKEFUN_BOT_DIR) {
    return resolve(process.env.MAKEFUN_BOT_DIR, "output");
  }
  const here = dirname(fileURLToPath(import.meta.url));
  return resolve(here, "output");
}

function main(): void {
  // Defensive gate check: the entry must be 1..159 code points, not only
  // whitespace. If the line ever drifted out of range, fall back to a
  // short safe line instead of writing an invalid entry — never throw.
  const points = [...LINE].length;
  const line =
    points >= 1 && points <= 159 && LINE.trim().length > 0
      ? LINE
      : "Sorry. I deleted it.";
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  // One line, UTF-8 — inside the gate's 1..159 range.
  // No trailing newline: the file is exactly the line.
  writeFileSync(resolve(dir, "entry.txt"), line, "utf8");
}

main();
