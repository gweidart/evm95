#!/usr/bin/env node
// @ts-nocheck
import fs from "fs";
import path from "path";
import chalk from "chalk";
import gradient from "gradient-string";
import clear from "clear";
import figlet from "figlet";
import program from "commander";

import log from "./logger";
import startServer from "./server";

// determine if we are in development mode
// https://github.com/TypeStrong/ts-node/issues/846#issuecomment-631828160

if (process[Symbol.for("ts-node.register.instance")]) {
  process.env.EVM95_DEV = "true";
}

clear();
console.log("");
console.log(gradient.pastel(figlet.textSync("EVM95", { font: "Roman" })));

program
  .version(require("../package.json").version)
  .name("@gweidart/evm95")
  .description("Instant retro Smart Contract interface.")
  .usage("[path-to-artifacts-dir] [options]")
  .option("-b, --buidler", "watches the default Buidler artifact directory")
  .option("-t, --truffle", "watches the default Truffle artifact directory")
  .option("-p, --port <number>", "specify port to host the frontend")
  .parse(process.argv);

program.outputHelp();
console.log("");

// determine what path (if any) to try
let targetPath;
if (program.args[0]) {
  targetPath = program.args[0];
} else if (program.truffle) {
  targetPath = "./build/contracts";
} else if (program.buidler) {
  targetPath = "./artifacts";
}

if (targetPath) {
  const artifactPath = path.resolve(targetPath);
  const validPath =
    fs.existsSync(artifactPath) && fs.lstatSync(artifactPath).isDirectory();

  if (!validPath) {
    log.error(`Invalid directory: ${chalk.white(artifactPath)}\n`);
    process.exit(1);
  }

  log.info(`Artifact directory: ${chalk.yellow(artifactPath)}`);
  startServer({
    port: program.port || 3000,
    artifactPath,
  });
} else {
  startServer({
    port: program.port || 3000,
  });
}
