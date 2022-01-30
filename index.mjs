import cac from "cac";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const cli = cac();

const execute = () => {
  cli.command("fc <baseName>", "create react functional component").action((baseName) => {
    replace("fc.txt", `${baseName}.tsx`, baseName);
    replace("sb.txt", `${baseName}.stories.tsx`, baseName);
  });
  cli.help();
  cli.parse();
};

const replace = (templateName, fileName, baseName) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const templatePath = join(__dirname, "templates", templateName);
  const data = readFileSync(templatePath, "utf8");
  const replaced = data.replace(/__placeholder__/g, baseName);
  const resultPath = join(process.cwd(), fileName);
  writeFileSync(resultPath, replaced);
  console.log("created:", fileName);
};

export default execute;
