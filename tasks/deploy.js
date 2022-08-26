const { task } = require("hardhat/config");

task("deploy", "Deploy a TazToken contract")
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs }, { ethers }) => {
        const TazTokenContract = await ethers.getContractFactory("TazToken");
        const taz = await TazTokenContract.deploy();

        await taz.deployed();

        logs && console.log(`TazToken contract has been deployed to: ${taz.address}`);

        return taz;
    })


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