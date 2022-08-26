const assert = require("assert");
const { expect } = require("chai");
const { run, ethers } = require("hardhat")

console.log("Starting test");

describe("Taz Token", function () {
    let tazContract;
    let signers

    before(async () => {
        contract = await run("deploy", { logs: true });
        signers = await ethers.getSigners();
    })

    it("Should mint", async () => {
        const uri = "https://gateway.pinata.cloud/ipfs/QmcRvcCSyJUpdw9U9rncRaGmkB183BDLiYDmwb468yebH3";
        console.log("LOG | Minting to address: " + signers[0].address);
        const tx = await contract.safeMint(signers[0].address, uri);
        console.log("LOG | Transaction: ", tx);
        tokenId = await tx.wait();
        console.log("LOG | Token ID: ", tokenId);
        assert.notEqual(tokenId, null);
    })
});