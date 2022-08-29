const assert = require("assert");
const { expect } = require("chai");
const { run, ethers } = require("hardhat");
const { Identity } = require("@semaphore-protocol/identity");
const { Group } = require("@semaphore-protocol/group");
const { generateProof } = require('@semaphore-protocol/proof');
const { verifyProof } = require('@semaphore-protocol/proof');
const { packToSolidityProof } = require('@semaphore-protocol/proof');
const { Subgraph } = require('@semaphore-protocol/subgraph')
const { solidity } = require("../hardhat.config");
const tazMessageAbi = require("../artifacts/contracts/TazMessage.sol/TazMessage.json").abi;

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
        signers = await ethers.getSigners();
        // tazMessageContract = await run("deployTazMessage", { logs: true });
        tazMessageContract = await new ethers.Contract("0xa6E078cc0AD77d69f7Ee28C0A76956C2f1fF47DD", tazMessageAbi, signers[0]);
    })

    it("Should add message", async () => {
        
        const messageContent = "My cat responded to their name today. Do I have a dog now?";
        const messageId = 5;

        const newIdentity = new Identity('secret-message');
        const newIdentityCommitment = newIdentity.generateCommitment();
        const group = new Group(16);
        const subgraph = new Subgraph('goerli');
        const { members } = await subgraph.getGroup('1080', { members: true });
        group.addMembers(members);
        // group.addMember(newIdentityCommitment);
        const externalNullifier = Math.round(Math.random() * 10000);        
        const signal = messageContent.slice(0, 31);
        const fullProof = await generateProof(newIdentity, group, externalNullifier, signal, {
            zkeyFilePath: "static/semaphore.zkey",
            wasmFilePath: "static/semaphore.wasm"
        });
        const { nullifierHash } = fullProof.publicSignals;
        const solidityProof = packToSolidityProof(fullProof.proof);
        const signalBytes32 = ethers.utils.formatBytes32String(signal);
        const groupId = 1080; // fixed at 1080

        console.log("LOG | groupId", groupId);
        console.log("LOG | newIdentityCommitment", newIdentityCommitment);
        console.log("LOG | members", members);
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

    it("Should reply to message", async () => {
        
        const messageContent = "The name of the Dapp is TAZ!";
        const messageId = 2;
        const parentMessageId = 1;

        const newIdentity = new Identity('secret-message');
        const newIdentityCommitment = newIdentity.generateCommitment();
        const group = new Group(16);
        const subgraph = new Subgraph('goerli');
        const { members } = await subgraph.getGroup('1080', { members: true });
        group.addMembers(members);
        // group.addMember(newIdentityCommitment);
        const externalNullifier = Math.round(Math.random() * 10000);        
        const signal = messageContent.slice(0, 31);
        const fullProof = await generateProof(newIdentity, group, externalNullifier, signal, {
            zkeyFilePath: "static/semaphore.zkey",
            wasmFilePath: "static/semaphore.wasm"
        });
        const { nullifierHash } = fullProof.publicSignals;
        const solidityProof = packToSolidityProof(fullProof.proof);
        const signalBytes32 = ethers.utils.formatBytes32String(signal);
        const groupId = 1080; // fixed at 1080

        console.log("LOG | groupId", groupId);
        console.log("LOG | newIdentityCommitment", newIdentityCommitment);
        console.log("LOG | members", members);
        console.log("LOG | signalBytes32", signalBytes32);
        console.log("LOG | nullifierHash", nullifierHash);
        console.log("LOG | externalNullifier", externalNullifier);
        console.log("LOG | solidityProof", solidityProof);        
        
        const tx = await tazMessageContract.replyToMessage(parentMessageId, messageId, messageContent, groupId, signalBytes32, nullifierHash, externalNullifier, solidityProof, { gasLimit: 1500000 });
        const receipt = await tx.wait();

        // console.log("LOG | Message added. Receipt: ", receipt);
        // console.log("LOG | Event emitted. Event: ", receipt.events[0].eventSignature);
        
        expect(receipt.events[1].event).to.equal("MessageAdded");
    });

    it("Should fail to reply to message", async () => {
        
        const messageContent = "The name of the Dapp is TAZ!";
        const messageId = 2;
        const parentMessageId = 0;

        const newIdentity = new Identity('secret-message');
        const newIdentityCommitment = newIdentity.generateCommitment();
        const group = new Group(16);
        const subgraph = new Subgraph('goerli');
        const { members } = await subgraph.getGroup('1080', { members: true });
        group.addMembers(members);
        // group.addMember(newIdentityCommitment);
        const externalNullifier = Math.round(Math.random() * 10000);        
        const signal = messageContent.slice(0, 31);
        const fullProof = await generateProof(newIdentity, group, externalNullifier, signal, {
            zkeyFilePath: "static/semaphore.zkey",
            wasmFilePath: "static/semaphore.wasm"
        });
        const { nullifierHash } = fullProof.publicSignals;
        const solidityProof = packToSolidityProof(fullProof.proof);
        const signalBytes32 = ethers.utils.formatBytes32String(signal);
        const groupId = 1080; // fixed at 1080

        console.log("LOG | groupId", groupId);
        console.log("LOG | newIdentityCommitment", newIdentityCommitment);
        console.log("LOG | members", members);
        console.log("LOG | signalBytes32", signalBytes32);
        console.log("LOG | nullifierHash", nullifierHash);
        console.log("LOG | externalNullifier", externalNullifier);
        console.log("LOG | solidityProof", solidityProof);        
        
        await expect(tazMessageContract.replyToMessage(parentMessageId, messageId, messageContent, groupId, signalBytes32, nullifierHash, externalNullifier, solidityProof, { gasLimit: 1500000 })).to.be.revertedWith("Invalid ID provided for parent message");
   
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