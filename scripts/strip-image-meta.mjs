import sharp from 'sharp';
import { readFileSync, writeFileSync, copyFileSync, unlinkSync } from 'node:fs';
import { execSync } from 'node:child_process';

/**
 * Strips embedded metadata (EXIF, XMP, PNG text chunks) from image files
 * staged for a commit. Run automatically via .githooks/pre-commit.
 * - JPEG: re-encodes only if EXIF is present (rotation is baked in first).
 * - PNG:  surgically drops tEXt/iTXt/zTXt/eXIf/tIME chunks, pixels untouched.
 * - WEBP: re-encodes if an EXIF chunk is present.
 */

const PNG_STRIP_TYPES = ['tEXt', 'iTXt', 'zTXt', 'eXIf', 'tIME'];

const strip = async (file) => {
  const raw = readFileSync(file);

  if (/\.png$/i.test(file)) {
    if (raw.readUInt32BE(0) !== 0x89504e47) return false; // not a real PNG
    const parts = [raw.subarray(0, 8)];
    let pos = 8;
    const removed = [];
    while (pos + 8 <= raw.length) {
      const len = raw.readUInt32BE(pos);
      const type = raw.toString('latin1', pos + 4, pos + 8);
      const end = pos + 12 + len;
      if (!PNG_STRIP_TYPES.includes(type)) parts.push(raw.subarray(pos, end));
      else removed.push(type);
      pos = end;
    }
    if (!removed.length) return false;
    writeFileSync(file, Buffer.concat(parts));
    console.log(`[strip-image-meta] ${file}: removed ${removed.join(', ')} chunk(s)`);
    return true;
  }

  if (/\.(jpe?g|webp)$/i.test(file)) {
    const meta = await sharp(file).metadata();
    const hasExif = raw.subarray(0, 200).includes('Exif') || !!meta.orientation;
    if (!hasExif) return false;
    const out = file + '.stripped.tmp';
    await sharp(file).rotate().toFile(out); // bake orientation, drop EXIF/IPTC/XMP
    copyFileSync(out, file);
    unlinkSync(out);
    console.log(`[strip-image-meta] ${file}: EXIF stripped (orientation baked in)`);
    return true;
  }

  return false;
};

const files = execSync('git diff --cached --name-only --diff-filter=ACMR')
  .toString()
  .split('\n')
  .filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

for (const f of files) {
  try {
    if (await strip(f)) execSync(`git add -- ${JSON.stringify(f)}`);
  } catch (err) {
    console.error(`[strip-image-meta] failed on ${f}:`, err.message);
    process.exit(1);
  }
}
process.exit(0);
