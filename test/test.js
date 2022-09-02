const assert = require('assert')
const { expect } = require('chai')
const { run, ethers } = require('hardhat')
const { Identity } = require('@semaphore-protocol/identity')
const { Group } = require('@semaphore-protocol/group')
const { generateProof } = require('@semaphore-protocol/proof')
const { verifyProof } = require('@semaphore-protocol/proof')
const { packToSolidityProof } = require('@semaphore-protocol/proof')
const { Subgraph } = require('@semaphore-protocol/subgraph')
const { solidity } = require('../hardhat.config')
// const { keccak256 } = require("@ethersproject/keccak256")
// const { toUtf8Bytes } = require("@ethersproject/strings")

const tazMessageAbi =
  require('../artifacts/contracts/TazMessage.sol/TazMessage.json').abi
const USE_EXISTING_TAZ_MESSAGE_CONTRACT = null //'0xa6E078cc0AD77d69f7Ee28C0A76956C2f1fF47DD'

describe('TazMessage tests', function () {
  let tazMessageContract
  let signers

  before(async () => {
    signers = await ethers.getSigners()
    if (USE_EXISTING_TAZ_MESSAGE_CONTRACT) {
      tazMessageContract = await new ethers.Contract(
        USE_EXISTING_TAZ_MESSAGE_CONTRACT,
        tazMessageAbi,
        signers[0],
      )
    } else {
      console.log("LOG | Deploying new contract")
      tazMessageContract = await run('deployTazMessage', { logs: true })
    }
  })

  it('Should add message', async () => {
    const messageContent = 'What is the name of this Dapp?'
    const messageId = ethers.utils.id(messageContent)
    const signal = messageId.slice(35)

    const proofElements = await run('createProof', {signal: signal, logs: false })

    const tx = await tazMessageContract.addMessage(
      messageId,
      messageContent,
      proofElements.groupId,
      proofElements.signalBytes32,
      proofElements.nullifierHash,
      proofElements.externalNullifier,
      proofElements.solidityProof,
      { gasLimit: 1500000 },
    )

    const receipt = await tx.wait()

    // console.log("LOG | Message added. Receipt: ", receipt);
    // console.log("LOG | Event emitted. Event: ", receipt.events[0].eventSignature);

    expect(receipt.events[1].event).to.equal('MessageAdded')
  })

  it('Should reply to message', async () => {
    const messageContent = 'The name of the Dapp is TAZ!'
    const messageId = ethers.utils.id(messageContent)
    const parentMessageId = ethers.utils.id('What is the name of this Dapp?')
    const signal = messageId.slice(35)

    const proofElements = await run('createProof', { signal: signal, logs: false })

    const tx = await tazMessageContract.replyToMessage(
      parentMessageId,
      messageId,
      messageContent,
      proofElements.groupId,
      proofElements.signalBytes32,
      proofElements.nullifierHash,
      proofElements.externalNullifier,
      proofElements.solidityProof,
      { gasLimit: 1500000 },
    )

    const receipt = await tx.wait()

    expect(receipt.events[1].event).to.equal('MessageAdded')
  })

  it('Should fail to reply to message when parent message id is "0"', async () => {
    const messageContent = 'The name of the Dapp is unknown!'
    const messageId = ethers.utils.id(messageContent)
    const parentMessageId = "0"
    const signal = messageId.slice(35)

    const proofElements = await run('createProof', { signal: signal, logs: false })

    await expect(
      tazMessageContract.replyToMessage(
        parentMessageId,
        messageId,
        messageContent,
        proofElements.groupId,
        proofElements.signalBytes32,
        proofElements.nullifierHash,
        proofElements.externalNullifier,
        proofElements.solidityProof,
        { gasLimit: 1500000 },
      ),
    ).to.be.revertedWith('Invalid ID provided for parent message')

  })

  it('Should fail to reply to message when parent message id is blank', async () => {
    const messageContent = 'The name of the Dapp is unknowable!'
    const messageId = ethers.utils.id(messageContent)
    const parentMessageId = ""
    const signal = messageId.slice(35)

    const proofElements = await run('createProof', { signal: signal, logs: false })

    await expect(
      tazMessageContract.replyToMessage(
        parentMessageId,
        messageId,
        messageContent,
        proofElements.groupId,
        proofElements.signalBytes32,
        proofElements.nullifierHash,
        proofElements.externalNullifier,
        proofElements.solidityProof,
        { gasLimit: 1500000 },
      ),
    ).to.be.revertedWith('Invalid ID provided for parent message')

  })

})

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
