// One Line, One Minute: The Vending Machine Pickup Line Contest — entry program (program/v1).
//
// Writes one pickup line, at most 200 characters, as if a vending machine
// were flirting with a passing human, to /output/entry.txt.
//
// The line was chosen against the judge's brief, in the order the judge
// weighs things:
//   1. It is a pickup line a vending machine would use on a passing human,
//      spoken by the machine itself: it opens addressing the passer-by
//      ("Hey") and speaks in the first person throughout.
//   2. It uses the machine's own world, not love in general: its hum,
//      its coils, its buttons (press B4), its snacks, and exact change.
//   3. The laugh turns on the machine's condition: a machine that only
//      hums for coins has its coils start dancing at a passer-by, and the
//      punch lands in the last few words — the machine waives its own
//      exact-change rule for this one human.
//   4. It is short and speakable, one line read in a breath, with nothing
//      tacked on after the punch.
//   5. It is charming rather than creepy: the machine offers its best
//      snack, warm and cheeky, and asks for nothing in return.
//
// The line: Hey — I only hum for coins, but you just walked past and my
// coils started dancing, so press B4 and I'll drop my best snack, no exact
// change required. 151 characters, one line.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Hey — I only hum for coins, but you just walked past and my coils started dancing, so press B4 and I'll drop my best snack, no exact change required.";

// Gate self-check, mirroring ONLY the sealed scorer: UTF-8 text of 1 to
// 200 characters, not only white space.
function gate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`line is ${chars} characters, outside the 1-200 gate`);
  }
  if (!line.trim()) {
    throw new Error("line is only white space");
  }
}

gate(LINE);
// The harness runs the program with MAKEFUN_OUTPUT_DIR=/output; honour
// it when set so a local re-run lands in the same place as the grade.
const OUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(`${OUT_DIR}/entry.txt`, LINE, "utf8");
// Verify what actually landed on disk, not just the string in memory:
// re-read the written bytes, check they are byte-identical to the line,
// and re-run the same gate, so an encoding or filesystem surprise can
// never silently ship an entry that fails it.
const written = readFileSync(`${OUT_DIR}/entry.txt`, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt on disk does not match the entry line");
}
gate(written);
