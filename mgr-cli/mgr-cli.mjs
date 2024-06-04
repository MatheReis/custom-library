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
  const { projectName, includeAuth, includeLogin, installMgrComponent } =
    await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Qual o nome do projeto?",
        default: "projeto",
      },
      {
        type: "confirm",
        name: "includeAuth",
        message: "Deseja incluir um módulo de autenticação?",
        default: true,
      },
      {
        type: "confirm",
        name: "includeLogin",
        message: "Deseja incluir um módulo de login?",
        default: true,
      },
      {
        type: "confirm",
        name: "installMgrComponent",
        message: "Deseja instalar o mgr-component?",
        default: false,
      },
    ]);

  // Criando pasta do projeto
  console.log(`Criando pasta do projeto ${projectName}...`);
  ensureDirSync(projectName);

  // Criando projeto back-end .NET
  console.log("Criando novo projeto .NET...");
  execSync(`dotnet new mvc -o ${projectName}-backend`, {
    stdio: "inherit",
    cwd: projectName,
  });

  const backendDir = path.join(
    process.cwd(),
    projectName,
    `${projectName}-backend`
  );

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
        `O arquivo ${file.src} não foi encontrado. Certifique-se de que o arquivo existe em templates/auth.`
      );
    }
  });

  console.log("Projeto back-end configurado com sucesso!");

  // Criando projeto front-end Angular
  console.log("Criando novo projeto Angular...");
  execSync(
    `ng new ${projectName}-frontend --no-standalone --routing --ssr=false --style=scss`,
    {
      stdio: "inherit",
      cwd: projectName,
    }
  );

  const frontendDir = path.join(
    process.cwd(),
    projectName,
    `${projectName}-frontend`
  );

  console.log("Configurando o registry e limpando o cache do npm...");
  execSync("npm config set registry https://registry.npmjs.org", {
    stdio: "inherit",
    cwd: frontendDir,
  });
  execSync("npm cache clean --force", { stdio: "inherit", cwd: frontendDir });

  console.log("Instalando dependências com npm...");
  execSync("npm install", { stdio: "inherit", cwd: frontendDir });

  const appDir = path.join(frontendDir, "src", "app");
  const coreDir = path.join(appDir, "core");
  const modulesDir = path.join(appDir, "modules", "login");
  const pagesDir = path.join(modulesDir, "pages", "login");
  const componentsDir = path.join(pagesDir, "components");

  const frontendDirectories = [
    path.join(coreDir, "constants"),
    path.join(coreDir, "services"),
    path.join(coreDir, "utils"),
    componentsDir,
  ];

  frontendDirectories.forEach((dir) => {
    ensureDirSync(dir);
  });

  if (installMgrComponent) {
    console.log("Instalando mgr-component...");
    try {
      execSync("npm install /Users/matheusreis/Documents/studies/mgr-template/template/projects/mgr-component", {
        stdio: "inherit",
        cwd: frontendDir,
      });
    } catch (error) {
      console.error("Erro ao instalar mgr-component:", error);
      process.exit(1);
    }
  }

  if (includeLogin) {
    console.log("Copiando arquivos de login...");
    const templateDir = path.join(__dirname, "templates", "login");

    if (fs.existsSync(templateDir)) {
      copySync(templateDir, pagesDir, { overwrite: true });
    } else {
      console.log(
        "O diretório do template de login não foi encontrado. Certifique-se de que o template existe em templates/login."
      );
    }
  }

  const frontendFilesToCopy = [
    { src: "app-routing.module.ts", dest: "app-routing.module.ts" },
    { src: "app.module.ts", dest: "app.module.ts" },
    { src: "app.component.ts", dest: "app.component.ts" },
    { src: "app.component.html", dest: "app.component.html" },
  ];

  frontendFilesToCopy.forEach((file) => {
    const srcFile = path.join(__dirname, "templates", file.src);
    const destFile = path.join(appDir, file.dest);
    if (fs.existsSync(srcFile)) {
      console.log(`Copiando ${file.src}...`);
      copySync(srcFile, destFile, { overwrite: true });
    } else {
      console.log(
        `O arquivo ${file.src} não foi encontrado. Certifique-se de que o arquivo existe em templates/${file.src}.`
      );
    }
  });

  console.log("Projeto front-end configurado com sucesso!");
  console.log("Instalação e configuração finalizadas!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
