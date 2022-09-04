const { SEMAPHORE_CONTRACT } = require("../config/goerli.json")

async function main() {
console.log("Deploy started");

const TazMessage = await hre.ethers.getContractFactory("TazMessage");
const taz = await TazMessage.deploy(SEMAPHORE_CONTRACT);

await taz.deployed();

console.log("TazMessage deployed to:", taz.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});