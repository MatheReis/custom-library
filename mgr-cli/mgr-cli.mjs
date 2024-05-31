#!/usr/bin/env node

import { execSync } from "child_process";
import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import fsExtra from "fs-extra";

const { copySync } = fsExtra;

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

  execSync(`ng new ${projectName} --no-standalone --routing --ssr=false --style=scss --version=13`, {
    stdio: "inherit",
  });

  process.chdir(path.join(process.cwd(), projectName));

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
    fs.mkdirSync(dir, { recursive: true });
  });

  if (installMgrComponent) {
    execSync("npm install mgr-component@0.0.6 --legacy-peer-deps", {
      stdio: "inherit",
    });
  }

  if (includeLogin) {
    const templateDir = path.join(__dirname, "templates", "login");

    if (fs.existsSync(templateDir)) {
      copySync(templateDir, pagesDir);
    } else {
      console.log(
        "O diretório do template de login não foi encontrado. Certifique-se de que o template existe em templates/login."
      );
    }
  }

  // Copiar o arquivo app.component.ts personalizado
  const appComponentFile = path.join(
    __dirname,
    "templates",
    "app.component.ts"
  );
  const destAppComponentFile = path.join(appDir, "app.component.ts");

  if (fs.existsSync(appComponentFile)) {
    copySync(appComponentFile, destAppComponentFile);
  } else {
    console.log(
      "O arquivo app.component.ts personalizado não foi encontrado. Certifique-se de que o arquivo existe em templates/app.component.ts."
    );
  }

  // Copiar o arquivo app.component.html personalizado
  const appComponentHtmlFile = path.join(
    __dirname,
    "templates",
    "app.component.html"
  );
  const destAppComponentHtmlFile = path.join(appDir, "app.component.html");

  if (fs.existsSync(appComponentHtmlFile)) {
    copySync(appComponentHtmlFile, destAppComponentHtmlFile);
  } else {
    console.log(
      "O arquivo app.component.html personalizado não foi encontrado. Certifique-se de que o arquivo existe em templates/app.component.html."
    );
  }

  console.log("Projeto configurado com sucesso!");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
