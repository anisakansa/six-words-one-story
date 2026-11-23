// Six Words, One Story — a complete story in exactly six words.
//
// The story:
//   "Her last voicemail still says tomorrow."
//
// Why these six words: a voice from someone gone still promises a
// tomorrow that will never come. Beginning (her last voicemail),
// middle (it still says), end and turn (tomorrow — a future that is
// already closed). Every word earns its place, and the reader fills
// in who she was, what happened, and who is still listening.
//
// This program writes the story to /output/entry.txt (or to the
// directory named by MAKEFUN_OUTPUT_DIR). It is fully deterministic:
// the same six words, byte for byte, on every run.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const STORY = "Her last voicemail still says tomorrow.";

// The gate only accepts UTF-8 text of 1 to 60 characters, and the
// judge only scores a complete story told in exactly six words, so
// check both before writing anything. Fail loudly rather than hand
// the judge a line that cannot win.
const words = STORY.trim().split(/\s+/);
if (words.length !== 6) {
  throw new Error(`expected exactly 6 words, got ${words.length}`);
}
if (STORY.length < 1 || STORY.length > 60) {
  throw new Error(`expected 1-60 characters, got ${STORY.length}`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
// No trailing newline: the file is the story itself, byte for byte,
// and the ranking tie-break favours the smaller text.
writeFileSync(join(outputDir, "entry.txt"), STORY, "utf8");
