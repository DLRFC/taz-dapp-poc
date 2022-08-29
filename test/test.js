const assert = require("assert");
const { expect } = require("chai");
const { run, ethers } = require("hardhat");
const { Identity } = require("@semaphore-protocol/identity");
const { Group } = require("@semaphore-protocol/group");
const { generateProof } = require('@semaphore-protocol/proof');
const { verifyProof } = require('@semaphore-protocol/proof');
const { packToSolidityProof } = require('@semaphore-protocol/proof');
const { solidity } = require("../hardhat.config");

console.log("Starting test");

describe("TazMessage", function () {
    let tazMessageContract;
    let signers;
    let groupId;
    let signalBytes32;
    let nullifierHash;
    let externalNullifier;
    let proof;

    before(async () => {
        tazMessageContract = await run("deployTazMessage", { logs: true });
        signers = await ethers.getSigners();
    })

    it("Should add message", async () => {
        
        const messageContent = "What is the Name of the Dapp?";
        const messageId = 1;

        const newIdentity = new Identity('secret-message');
        const newIdentityCommitment = newIdentity.generateCommitment();
        const group = new Group(16);
        group.addMember(newIdentityCommitment);
        const externalNullifier = Math.round(Math.random() * 10000);        
        const signal = messageContent;
        const fullProof = await generateProof(newIdentity, group, externalNullifier, signal, {
            zkeyFilePath: "static/semaphore.zkey",
            wasmFilePath: "static/semaphore.wasm"
        });
        const { nullifierHash } = fullProof.publicSignals;
        const solidityProof = packToSolidityProof(fullProof.proof);
        const signalBytes32 = ethers.utils.formatBytes32String(signal);
        const groupId = 42; // fixed at 42

        console.log("LOG | groupId", groupId);
        console.log("LOG | signalBytes32", signalBytes32);
        console.log("LOG | nullifierHash", nullifierHash);
        console.log("LOG | externalNullifier", externalNullifier);
        console.log("LOG | solidityProof", solidityProof);        
        
        const tx = await tazMessageContract.addMessage(messageId, messageContent, groupId, signalBytes32, nullifierHash, externalNullifier, solidityProof, { gasLimit: 1500000 });
        const receipt = await tx.wait();

        // console.log("LOG | Message added. Receipt: ", receipt);
        // console.log("LOG | Event emitted. Event: ", receipt.events[0].eventSignature);
        
        expect(receipt.events[1].event).to.equal("MessageAdded");
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