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
  const { projectName, includeLogin, installMgrComponent } =
    await inquirer.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Qual o nome do projeto?",
        default: "my-angular-project",
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

  console.log("Criando novo projeto ModalGR...");
  execSync(
    `ng new ${projectName} --no-standalone --routing --ssr=false --style=scss`,
    {
      stdio: "inherit",
    }
  );

  process.chdir(path.join(process.cwd(), projectName));

  console.log("Configurando o registry e limpando o cache do npm...");
  execSync("npm config set registry https://registry.npmjs.org", {
    stdio: "inherit",
  });
  execSync("npm cache clean --force", { stdio: "inherit" });

  console.log("Instalando dependências com npm...");
  execSync("npm install", { stdio: "inherit" });

  const appDir = path.join(process.cwd(), "src", "app");
  const coreDir = path.join(appDir, "core");
  const modulesDir = path.join(appDir, "modules", "login");
  const pagesDir = path.join(modulesDir, "pages", "login");
  const componentsDir = path.join(pagesDir, "components");

  const directories = [
    path.join(coreDir, "constants"),
    path.join(coreDir, "services"),
    path.join(coreDir, "utils"),
    componentsDir,
  ];

  directories.forEach((dir) => {
    ensureDirSync(dir);
  });

  if (installMgrComponent) {
    console.log("Instalando mgr-component...");
    try {
      execSync("npm install /Users/matheusreis/Documents/studies/mgr-template/template/projects/mgr-component", {
        stdio: "inherit",
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

  const filesToCopy = [
    { src: "app-routing.module.ts", dest: "app-routing.module.ts" },
    { src: "app.module.ts", dest: "app.module.ts" },
    { src: "app.component.ts", dest: "app.component.ts" },
    { src: "app.component.html", dest: "app.component.html" },
  ];

  filesToCopy.forEach((file) => {
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

  console.log("Projeto configurado com sucesso!");

  // Adicionando os comandos especificados
  console.log("Linkando o mgr-component...");
  execSync("npm link mgr-component", { stdio: "inherit" });

  console.log("Configurando o registry do npm...");
  execSync("npm set registry http://localhost:4873", { stdio: "inherit" });

  console.log("Instalando a versão específica do mgr-component...");
  execSync("npm install mgr-component@0.0.7 --legacy-peer-deps", { stdio: "inherit" });

  console.log("Instalação e configuração finalizadas!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
