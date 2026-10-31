import sharp from "sharp";
import fs from "node:fs/promises";
import path from "node:path";

const inputDir = path.join(process.cwd(), "public");
const outputDir = path.join(inputDir, "optimized");

const supportedExtensions = [".jpg", ".jpeg", ".png", ".webp"];

async function optimizeImages() {
  await fs.mkdir(outputDir, { recursive: true });

  async function processDirectory(directory: string) {
    const entries = await fs.readdir(directory, {
      withFileTypes: true,
    });

    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);

      if (entry.isDirectory()) {
        if (fullPath === outputDir) continue;
        await processDirectory(fullPath);
        continue;
      }

      const extension = path.extname(entry.name).toLowerCase();

      if (!supportedExtensions.includes(extension)) continue;

      const relativePath = path.relative(inputDir, fullPath);
      const outputPath = path.join(
        outputDir,
        relativePath.replace(/\.[^.]+$/, ".webp"),
      );

      await fs.mkdir(path.dirname(outputPath), { recursive: true });

      await sharp(fullPath)
        .rotate()
        .resize({
          width: 1920,
          height: 1920,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 78, effort: 5 })
        .toFile(outputPath);

      const originalSize = (await fs.stat(fullPath)).size / 1024 / 1024;
      const optimizedSize = (await fs.stat(outputPath)).size / 1024 / 1024;

      console.log(
        `${entry.name}: ${originalSize.toFixed(2)} MB → ${optimizedSize.toFixed(2)} MB`,
      );
    }
  }

  await processDirectory(inputDir);
  console.log("\nImage optimization completed!");
}

optimizeImages().catch(console.error);