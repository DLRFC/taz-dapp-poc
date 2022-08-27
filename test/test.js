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
    let signal;
    let nullifierHash;
    let externalNullifier;
    let proof;

//     uint256 groupId, 
// bytes32 signal, 
// uint256 nullifierHash, 
// uint256 externalNullifier, 
// uint256[8] calldata proof

    before(async () => {
        tazMessageContract = await run("deployTazMessage", { logs: true });
        signers = await ethers.getSigners();
    })

    it("Should add message", async () => {
        
        const messageContent = "What is the Name of the Dapp?";
        const messageId = 1;

        // uint256 groupId, 
        // bytes32 signal, 
        // uint256 nullifierHash, 
        // uint256 externalNullifier, 
        // uint256[8] calldata proof) external {

        const externalNullifier = messageId;
        const signal = "Hello ZK"; // ethers.utils.formatBytes32String(messageContent).slice(0,3`1`);
        console.log("signal", signal);
        const newIdentity = new Identity('test 1');
        const newTrapdoor = newIdentity.getTrapdoor();
        const newNullifier = newIdentity.getNullifier();
        const newIdentityCommitment = newIdentity.generateCommitment();
        const group = new Group();
        group.addMember(newIdentityCommitment);
        const groupId = 42; // fixed at 42
        console.log("About to generate proof");
        const fullProof = await generateProof(
            newIdentity,
            group,
            externalNullifier,
            signal,
            {
                zkeyFilePath: "static/semaphore.zkey",
                wasmFilePath: "static/semaphore.wasm",
            },
        )
        console.log("Finished generating proof");
        const { nullifierHash } = fullProof.publicSignals;
        const solidityProof = packToSolidityProof(fullProof.proof);

        console.log("LOG | newIdentity", newIdentity);
        console.log("LOG | newTrapdoor", newTrapdoor);
        console.log("LOG | newNullifier", newNullifier);
        console.log("LOG | newIdentityCommitment", newIdentityCommitment);
        
        const tx = await tazMessageContract.addMessage(messageId, messageContent, groupId, ethers.utils.formatBytes32String(signal), nullifierHash, externalNullifier, solidityProof, { gasLimit: 1500000 });
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