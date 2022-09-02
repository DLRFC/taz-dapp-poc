const { task } = require("hardhat/config");

const SEMAPHORE_CONTRACT_GOERLI = "0x99aAb52e60f40AAC0BFE53e003De847bBDbC9611";
const TEST_SEMAPHORE_CONTRACT_GOERLI = "0x7E309d777161b268b87c484CD979b7361b19c39C";

task("deployTazMessage", "Deploy a TazMessage contract")
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs }, { ethers }) => {
        const TazTokenContract = await ethers.getContractFactory("TazMessage");
        const taz = await TazTokenContract.deploy(SEMAPHORE_CONTRACT_GOERLI);
        await taz.deployed();
        logs && console.log(`TazMessage contract has been deployed to: ${taz.address}`);
        return taz;
    });


// task("deployTazToken", "Deploy a TazToken contract")
//     .addOptionalParam("logs", "Print the logs", true, types.boolean)
//     .setAction(async ({ logs }, { ethers }) => {
//         const TazTokenContract = await ethers.getContractFactory("TazToken");
//         const taz = await TazTokenContract.deploy();
//         await taz.deployed();
//         logs && console.log(`TazToken contract has been deployed to: ${taz.address}`);
//         return taz;
//     });   


// async function main() {
//     console.log("Deploy started");
    
//     const TazToken = await hre.ethers.getContractFactory("TazToken");
//     const nft = await TazToken.deploy();
  
//     await nft.deployed();
  
//     console.log("TazToken deployed to:", nft.address);
//   }
  
//   main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//       console.error(error);
//       process.exit(1);
//     });