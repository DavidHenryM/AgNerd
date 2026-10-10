import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { Script } from "node:vm";

export async function checkBrowserChunks(directory) {
  let checked = 0;
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      checked += await checkBrowserChunks(filename);
    } else if (entry.isFile() && entry.name.endsWith(".js")) {
      const source = await readFile(filename, "utf8");
      try {
        new Script(source, { filename });
      } catch (error) {
        throw new Error(`Invalid browser chunk ${filename}: ${error.message}`, { cause: error });
      }
      checked++;
    }
  }
  return checked;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const checked = await checkBrowserChunks(path.join(".next", "static", "chunks"));
  if (checked === 0) throw new Error("No browser JavaScript chunks found after build");
  console.log(`Validated syntax of ${checked} browser JavaScript chunks`);
}
