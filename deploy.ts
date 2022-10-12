// const ethers = require("ethers");
// const fs = require("fs-extra");
// require("dotenv").config();
import { ethers } from "ethers";
import * as fs from "fs-extra";
import "dotenv/config";

async function main() {
  // get test net rpc 获取测试网络
  let provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL!);
  // // using private key to get wallet
  // let wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

  // using encryptedJson to get waller
  const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
  // must remove new key word
  let wallet = ethers.Wallet.fromEncryptedJsonSync(
    encryptedJson,
    process.env.PRIVATE_KEY_PASSWORD!
  );
  wallet = wallet.connect(provider);
  const abi = fs.readFileSync("./SmartContract_sol_SmartContract.abi", "utf8");
  const binary = fs.readFileSync(
    "./SmartContract_sol_SmartContract.bin",
    "utf8"
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);
  console.log("Deploying, please wait...");
  const contract = await contractFactory.deploy();
  // const contract = await contractFactory.deploy({ gasPrice: 100000000000 })
  const deploymentReceipt = await contract.deployTransaction.wait(1);
  console.log(`Contract deployed to ${contract.address}`);
  await contract.setMyBalance(8888);
  let balance = await contract.getMyBalance();
  console.log(balance);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
