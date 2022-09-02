const { task } = require("hardhat/config");
const { Subgraph } = require('@semaphore-protocol/subgraph');
const { Identity } = require("@semaphore-protocol/identity");
const { Group } = require("@semaphore-protocol/group");
const { generateProof } = require('@semaphore-protocol/proof');
const { verifyProof } = require('@semaphore-protocol/proof');
const { packToSolidityProof } = require('@semaphore-protocol/proof');

const SEMAPHORE_CONTRACT_GOERLI = "0x99aAb52e60f40AAC0BFE53e003De847bBDbC9611";
const TEST_SEMAPHORE_CONTRACT_GOERLI = "0x7E309d777161b268b87c484CD979b7361b19c39C";

task("createProof", "create a proof")
    .addOptionalParam("logs", "Print the logs", true, types.boolean)
    .setAction(async ({ logs }, { ethers }) => {
        
        const proofElements = {
            newIdentity: null,
            newIdentityCommitment: null,
            group: null,
            groupId: null,
            members: null,
            signalBytes32: null,
            nullifierHash: null,
            externalNullifier: null,
            solidityProof: null
        }

        const subgraph = new Subgraph('goerli');
        const { members } = await subgraph.getGroup('1080', { members: true });
        
        proofElements.newIdentity = new Identity('secret-message');
        proofElements.newIdentityCommitment = proofElements.newIdentity.generateCommitment();
        proofElements.group = new Group(16);        
        proofElements.group.addMembers(members);
        proofElements.members = proofElements.group.members;
        // proofElements.group.addMember(newIdentityCommitment);
        proofElements.externalNullifier = Math.round(Math.random() * 10000000);        
        proofElements.signal = "Select Signal";
        const fullProof = await generateProof(proofElements.newIdentity, proofElements.group, proofElements.externalNullifier, proofElements.signal, {
            zkeyFilePath: "static/semaphore.zkey",
            wasmFilePath: "static/semaphore.wasm"
        });
        const { nullifierHash } = fullProof.publicSignals;
        proofElements.nullifierHash = nullifierHash;
        proofElements.solidityProof = packToSolidityProof(fullProof.proof);
        proofElements.signalBytes32 = ethers.utils.formatBytes32String(proofElements.signal);
        proofElements.groupId = 1080; // fixed at 1080
        
        logs && console.log("LOG | proofElements", proofElements);      
          
        return proofElements;
    });
