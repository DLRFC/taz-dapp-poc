const assert = require('assert')
const { expect } = require('chai')
const { run, ethers } = require('hardhat')

describe("TazToken", function () {
    let tazContract;
    let signers

    before(async () => {
        contract = await run("deployTazToken", { logs: true });
        signers = await ethers.getSigners();
    })

    it("Should mint", async () => {
        const uri = "https://bafkreickoepvzub4bh6xtlrpdg5s64iwrzy4dc3vmjrgugxi3gplymqs74.ipfs.dweb.link/";
        console.log("TEST LOG | Minting to address: " + signers[0].address);
        const tx = await contract.safeMint(signers[0].address, uri);
        console.log("LOG | Transaction: ", tx);
        tokenId = await tx.wait();
        console.log("TEST LOG | Token ID: ", tokenId);
        await expect(tx).to.emit(contract, 'NewToken')//.withArgs(tokenId, uri)
    })
});