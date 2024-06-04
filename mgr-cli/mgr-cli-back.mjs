#!/usr/bin/env node

import { execSync } from "child_process";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fsExtra from "fs-extra";

const { copySync, ensureDirSync } = fsExtra;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const { projectName, includeAuth } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Qual o nome do projeto?",
      default: "my-dotnet-project",
    },
    {
      type: "confirm",
      name: "includeAuth",
      message: "Deseja incluir um módulo de autenticação?",
      default: true,
    },
  ]);

  console.log("Criando novo projeto .NET...");
  execSync(`dotnet new mvc -o ${projectName}-backend`, { stdio: "inherit" });

  const backendDir = path.join(process.cwd(), `${projectName}-backend`);
  process.chdir(backendDir);

  const areasDir = path.join(backendDir, "Areas");
  const servicesDir = path.join(backendDir, "Services");
  const modelsDir = path.join(backendDir, "Models");
  const controllersDir = path.join(backendDir, "Controllers");

  const directories = [areasDir, servicesDir, modelsDir, controllersDir];

  directories.forEach((dir) => {
    ensureDirSync(dir);
  });

  if (includeAuth) {
    console.log("Copiando arquivos de autenticação...");
    const templateDir = path.join(__dirname, "templates", "auth");

    if (fs.existsSync(templateDir)) {
      copySync(templateDir, areasDir, { overwrite: true });
    } else {
      console.log(
        "O diretório do template de autenticação não foi encontrado. Certifique-se de que o template existe em templates/auth."
      );
    }
  }

  const backendFilesToCopy = [
    { src: "Startup.cs", dest: "Startup.cs" },
    { src: "Program.cs", dest: "Program.cs" },
    { src: "appsettings.json", dest: "appsettings.json" },
  ];

  backendFilesToCopy.forEach((file) => {
    const srcFile = path.join(__dirname, "templates", file.src);
    const destFile = path.join(backendDir, file.dest);
    if (fs.existsSync(srcFile)) {
      console.log(`Copiando ${file.src}...`);
      copySync(srcFile, destFile, { overwrite: true });
    } else {
      console.log(
        `O arquivo ${file.src} não foi encontrado. Certifique-se de que o arquivo existe em templates ${file.src}.`
      );
    }
  });

  console.log("Projeto back-end configurado com sucesso!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
