import sharp from "sharp";
import { unlink } from "fs/promises";

const jobs = [
  {
    src: "nutritiondeficiencieschartwtsie.png",
    dest: "public/images/articles/nutrition-deficiencies.webp",
    quality: 82,
  },
  {
    src: "fieldwtsie.png",
    dest: "public/images/articles/field.webp",
    quality: 80,
  },
  {
    src: "capsuleswtsie.png",
    dest: "public/images/articles/capsules.webp",
    quality: 80,
  },
];

for (const { src, dest, quality } of jobs) {
  const info = await sharp(src).webp({ quality }).toFile(dest);
  const saved = ((1 - info.size / (await sharp(src).metadata()).size ?? 1) * 100).toFixed(0);
  console.log(`✓ ${src} → ${dest}  (${(info.size / 1024).toFixed(0)} KB)`);
  await unlink(src);
}
