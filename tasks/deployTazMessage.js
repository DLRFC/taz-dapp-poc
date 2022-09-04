const { task } = require("hardhat/config");
const { SEMAPHORE_CONTRACT_GOERLI } = require("../config/goerli.json")

task("deployTazMessage", "Deploy a TazMessage contract")
    .addParam("semaphoreContract", "Address of the Semaphore contract", null, types.string)
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ semaphoreContract, logs }, { ethers }) => {
        const TazTokenContract = await ethers.getContractFactory("TazMessage");
        const taz = await TazTokenContract.deploy(semaphoreContract);
        await taz.deployed();
        logs && console.log(`TazMessage contract has been deployed to: ${taz.address}`);
        return taz;
    });