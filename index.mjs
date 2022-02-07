import cac from "cac";
import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { camelCase, pascalCase } from "change-case";

const cli = cac();

const execute = () => {
  cli.command("fc <baseName>", "create react functional component").action((baseName) => {
    replace("fc.txt", baseName, `.tsx`);
    replace("sb.txt", baseName, `.stories.tsx`);
  });
  cli.command("recoil <baseName>", "create recoil atom").action((baseName) => {
    replace("recoil.txt", baseName, `.ts`, false);
  });
  cli.help();
  cli.parse();
};

const replace = (templateName, baseName, extension, pascalCaseName = true) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const templatePath = join(__dirname, "templates", templateName);
  const data = readFileSync(templatePath, "utf8");
  const replaced = data
    .replace(/__PlaceHolder__/g, pascalCase(baseName))
    .replace(/__placeHolder__/g, camelCase(baseName));
  const fileName = pascalCaseName ? pascalCase(baseName) : camelCase(baseName) + extension;
  const resultPath = join(process.cwd(), fileName);
  writeFileSync(resultPath, replaced);
  console.log("created:", fileName);
};

export default execute;
