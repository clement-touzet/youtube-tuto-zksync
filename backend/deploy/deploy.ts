import { HardhatRuntimeEnvironment } from "hardhat/types";
import dotenv from "dotenv";
import { Contract, Wallet } from "zksync-web3";
import { Deployer } from "@matterlabs/hardhat-zksync-deploy";
import fs from "fs/promises";
import * as hre from "hardhat";

dotenv.config();

export default async function (hre: HardhatRuntimeEnvironment) {
  console.log("Deploying EventFactory contract...");
  let wallet_pk: string;
  process.env.NODE_ENV == "test"
    ? (wallet_pk =
        "0x7726827caac94a7f9e1b160f7ea819f172f7b6f9d2a97f992c38edeab82d4110") // clé privée du compte riche
    : (wallet_pk = getEnvVariable("WALLET_PK")); // Votre clé privée
  const wallet = new Wallet(wallet_pk);
  const eventFactoryContract = await deployEventFactory(wallet);
  console.log(
    "EventFactory contract deployed at, writing in file: ",
    eventFactoryContract.address
  );
  await writeEventFactoryInfos(
    eventFactoryContract,
    "eventFactory",
    "./deployedContractsInfo/eventFactory.json"
  );
  console.log(
    "constructor args:" + eventFactoryContract.interface.encodeDeploy()
  );
}

export function getEnvVariable(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing: process.env['${name}'].`);
  }
  return value;
}

async function deployEventFactory(wallet: Wallet): Promise<Contract> {
  console.log("deploying...");
  let deployer: Deployer = new Deployer(hre, wallet);
  const artifact = await deployer.loadArtifact("EventFactory"); // artifact = toutes les infos pour déployer un contract
  let eventFactoryContract: Contract = await deployer.deploy(artifact);

  return eventFactoryContract;
}

async function writeEventFactoryInfos(
  contract: Contract,
  contractName: string,
  path: string
) {
  const data = {
    [contractName]: {
      address: contract.address,
      network: process.env.NODE_ENV,
    },
  };
  const content = JSON.stringify(data, null, 2);
  await fs.writeFile(path, content, { encoding: "utf-8" });
}
