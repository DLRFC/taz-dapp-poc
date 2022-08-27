const assert = require("assert");
const { expect } = require("chai");
const { run, ethers } = require("hardhat")

console.log("Starting test");

describe("TazMessage", function () {
    let tazMessageContract;
    let signers;

    before(async () => {
        tazMessageContract = await run("deployTazMessage", { logs: true });
        signers = await ethers.getSigners();
    })

    it("Should add message", async () => {
        const tx = await tazMessageContract.addMessage(1, "What is the Name of the Dapp?");
        receipt = await tx.wait();
        // console.log("LOG | Message added. Receipt: ", receipt);
        // console.log("LOG | Event emitted. Event: ", receipt.events[0].eventSignature);
        expect(receipt.events[0].event).to.equal("MessageAdded");
    })
});

// describe("Taz Token", function () {
//     let tazContract;
//     let signers

//     before(async () => {
//         contract = await run("deployTazToken", { logs: true });
//         signers = await ethers.getSigners();
//     })

//     it("Should mint", async () => {
//         const uri = "https://gateway.pinata.cloud/ipfs/QmcRvcCSyJUpdw9U9rncRaGmkB183BDLiYDmwb468yebH3";
//         console.log("LOG | Minting to address: " + signers[0].address);
//         const tx = await contract.safeMint(signers[0].address, uri);
//         console.log("LOG | Transaction: ", tx);
//         tokenId = await tx.wait();
//         console.log("LOG | Token ID: ", tokenId);
//         assert.notEqual(tokenId, null);
//     })
// });