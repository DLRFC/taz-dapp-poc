const SEMAPHORE_CONTRACT_GOERLI = "0x99aAb52e60f40AAC0BFE53e003De847bBDbC9611";
const TEST_SEMAPHORE_CONTRACT_GOERLI = "0x7E309d777161b268b87c484CD979b7361b19c39C";

async function main() {
console.log("Deploy started");

const TazMessage = await hre.ethers.getContractFactory("TazMessage");
const taz = await TazMessage.deploy(SEMAPHORE_CONTRACT_GOERLI);

await taz.deployed();

console.log("TazMessage deployed to:", taz.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
    console.error(error);
    process.exit(1);
});