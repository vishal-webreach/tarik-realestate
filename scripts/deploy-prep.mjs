// Local deploy-prep: builds the site, works out which files in dist/ changed
// since the last confirmed upload, and copies just those into dist-changed/.
// Runs entirely on this machine — it never talks to the server.
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { createInterface } from 'node:readline/promises';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(root, 'dist');
const changedDir = path.join(root, 'dist-changed');
const manifestPath = path.join(root, '.deploy-manifest.json');

async function listFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await listFiles(full)));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

async function hashDist() {
  const hashes = {};
  for (const file of await listFiles(distDir)) {
    const rel = path.relative(distDir, file).split(path.sep).join('/');
    hashes[rel] = createHash('sha256').update(await readFile(file)).digest('hex');
  }
  return hashes;
}

async function loadManifest() {
  if (!existsSync(manifestPath)) return {};
  return JSON.parse(await readFile(manifestPath, 'utf8'));
}

function sortKeys(obj) {
  return Object.fromEntries(Object.keys(obj).sort().map((k) => [k, obj[k]]));
}

async function main() {
  console.log('Building site (npm run build)...\n');
  const build = spawnSync('npm', ['run', 'build'], { cwd: root, stdio: 'inherit', shell: true });
  if (build.status !== 0) {
    console.error('\nBuild failed — nothing was copied.');
    process.exit(build.status || 1);
  }

  const current = await hashDist();
  const previous = await loadManifest();

  const added = [];
  const changed = [];
  let unchanged = 0;
  for (const [rel, hash] of Object.entries(current)) {
    if (!(rel in previous)) added.push(rel);
    else if (previous[rel] !== hash) changed.push(rel);
    else unchanged++;
  }
  const removed = Object.keys(previous).filter((rel) => !(rel in current)).sort();

  await rm(changedDir, { recursive: true, force: true });
  const toCopy = [...added, ...changed].sort();
  for (const rel of toCopy) {
    const dest = path.join(changedDir, ...rel.split('/'));
    await mkdir(path.dirname(dest), { recursive: true });
    await cp(path.join(distDir, ...rel.split('/')), dest);
  }

  console.log('\n=== Deploy prep summary ===');
  console.log(`New:       ${added.length}`);
  console.log(`Changed:   ${changed.length}`);
  console.log(`Unchanged: ${unchanged}`);
  console.log(`Removed:   ${removed.length}`);
  console.log();
  console.log(toCopy.length ? 'Upload the contents of: dist-changed/' : 'Nothing new to upload');
  if (removed.length) {
    console.log('\nDelete these from the server:');
    for (const rel of removed) console.log(`  ${rel}`);
  }

  if (!toCopy.length && !removed.length) return;

  const rl = createInterface({ input: process.stdin, output: process.stdout });
  const answer = (await rl.question('\nDid you upload these files? (y/N) ')).trim().toLowerCase();
  rl.close();

  if (answer === 'y' || answer === 'yes') {
    await writeFile(manifestPath, JSON.stringify(sortKeys(current), null, 2) + '\n');
    console.log('Saved .deploy-manifest.json');
  } else {
    console.log('Manifest not saved — the next run will show these changes again.');
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
