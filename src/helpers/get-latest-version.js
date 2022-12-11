/**
 * ✅ Node
 * ❌ Vite | React
 */

import { exec } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { EOL } from 'os';

const sh = (command) =>
   new Promise((resolve, reject) => exec(command, (error, stdout) => (!!error ? reject(error) : resolve(stdout))));

const shStyles = {
   yellow: '\x1b[33m',
   green: '\x1b[32m',
   blue: '\x1b[34m',
   dim: '\x1b[2m',
   reset: '\x1b[0m',
   bold: '\x1b[1m',
};

export const getLatestVersion = async (packageName) =>
   (await sh(`npm view ${packageName?.trim()?.toLowerCase()} version`))?.trim();

export const updatePackages = async () => {
   const path = `${process.cwd()}/package.json`;
   const packageFile = readFileSync(path, 'utf-8');
   const packageJSON = JSON.parse(packageFile);
   const { dependencies, devDependencies } = packageJSON;
   const hasUpdate = [];

   const compareVersions = async (dependency) => {
      const dependencyType = dependencies?.[dependency] ? dependencies : devDependencies;
      const currentVersion = dependencyType[dependency].replace(/[^a-z0-9.]/gi, '');
      const latestVersion = await getLatestVersion(dependency);

      if (currentVersion !== latestVersion) {
         dependencyType[dependency] = `^${latestVersion}`;

         hasUpdate.push(dependency);
         console.log(
            `${shStyles.bold}${dependency}${shStyles.dim}:${shStyles.reset}\t${shStyles.reset}${shStyles.yellow}${currentVersion}${shStyles.reset}\t${shStyles.dim}➜${shStyles.reset}   ${shStyles.green}${latestVersion}${shStyles.reset}`
         );
      }
   };

   console.log('🤹 Looking for new versions...\n');

   for (const dependency in dependencies) await compareVersions(dependency);
   for (const dependency in devDependencies) await compareVersions(dependency);

   writeFileSync(path, `${JSON.stringify(packageJSON, null, 3)}${EOL}`);

   console.log(
      hasUpdate.length > 0
         ? `\nRun ${shStyles.bold}${shStyles.blue}npm i${shStyles.reset} to install new versions 🚀\n`
         : `✅ Nothing to be updated\n`
   );
};
