import fs from 'node:fs';
import { join } from 'node:path';
import readline from 'node:readline';
import { stringify } from 'csv-stringify/sync';

const DEBUG_FILE = 'debug.log';
const OUTPUT_FILE = 'scores.csv';

// Clear debug file
await fs.promises.writeFile(DEBUG_FILE, '');

if (process.argv.length <= 2) {
  throw new Error('You must pass a directory containing all markdown files for evaluation');
}

const path = process.argv[2];

const pathStats = await fs.promises.stat(path);

if (!pathStats.isDirectory()) {
  throw new Error('The specified path is not a directory');
}

const scores = new Map();

const debugFile = fs.createWriteStream(DEBUG_FILE);

const files = await fs.promises.readdir(path);
await Promise.all(
  files.filter((filename) => filename.endsWith('.md'))
  .map((filename) => processFile(join(path, filename)))
);

const orderedByGroup = Array.from(scores.values()).sort((a, b) => a.Groep.localeCompare(b.Groep));

const csvOutput = stringify(orderedByGroup, {
  header: true,
  delimiter: ';',
});
await fs.promises.writeFile(OUTPUT_FILE, csvOutput);

debugFile.close();

async function processFile(path) {
  const rl = readline.createInterface({
    input: fs.createReadStream(path),
  });

  let assignment;
  let group;
  let score;

  for await (const line of rl) {
    line.trim();
    if (line.startsWith('# ')) {
      assignment = line.substring(2);
    } else if (line.startsWith('## ')) {
      group = line.substring(3);
    } else if (line.startsWith('>')) {
      score = line.length <= 2 ? '-' : Number(line.substring(2));

      debugFile.write(`Read score ${JSON.stringify({
        assignment,
        group,
        score,
      })}\n`);

      addScore({
        group,
        assignment,
        score
      });
    }
  }
}

function addScore({
  group,
  assignment,
  score
}) {
  if (!scores.has(group)) {
    scores.set(group, {
      Groep: group,
    });
  }

  scores.get(group)[assignment] = score;
}