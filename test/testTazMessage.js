const assert = require('assert')
const { expect } = require('chai')
const { run, ethers } = require('hardhat')
const { Identity } = require('@semaphore-protocol/identity')
const { GROUP_ID, TAZMESSAGE_CONTRACT, SEMAPHORE_CONTRACT } = require('../config/goerli.json')

const identitySeed = process.env.IDENTITY_SEED
const tazMessageAbi = require('../artifacts/contracts/TazMessage.sol/TazMessage.json').abi

// Alter settings depending on what testing is needed
const DEPLOY_NEW_TAZ_MESSAGE_CONTRACT = false // Generally always do this on local fork
const CREATE_NEW_GROUP = false // Will fail if group id already exists
const ADD_MEMBER = false // Will fail if member has already been added to the group

/* Initial steps required when deploying the contract locally:
   - Deploy a new TazMessage contract
   - Add a group to the local-forked-Goerli Semaphore contract with the new TazMessage contract address as the group admin
   - Add a member to that group on the Semaphore contract so that membership can be verified */

describe('TazMessage', () => {
  let contract
  let signer1
  let signer2
  const semaphoreAbi = [
    'function createGroup(uint256 groupId, uint256 merkleTreeDepth, uint256 zeroValue, address admin)'
  ]

  before(async () => {
    const signers = await ethers.getSigners()
    signer1 = signers[0]
    signer2 = signers[1]

    if (DEPLOY_NEW_TAZ_MESSAGE_CONTRACT) {
      // Deploy a new TazMessage contract
      console.log('--------------------------------------------------------------------')
      console.log('TEST | Deploying new contract')
      contract = await run('deployTazMessage', {
        semaphoreContract: SEMAPHORE_CONTRACT,
        logs: true
      })
    } else {
      // Use already-deployed TazMessage contract
      console.log('TEST | Using existing TazMessage contract')
      contract = new ethers.Contract(TAZMESSAGE_CONTRACT, tazMessageAbi, signer1)
    }

    if (CREATE_NEW_GROUP) {
      // Add a new group on the Semaphore contract with the TazMessage contract as group admin
      const semaphoreContract = new ethers.Contract(SEMAPHORE_CONTRACT, semaphoreAbi, signer1)
      const txCreateGroup = await semaphoreContract.createGroup(GROUP_ID, 16, 0, contract.address)
      const receipt = await txCreateGroup.wait()
      // console.log(`TEST | Group creation receipt:`, receipt)
      console.log(`TEST | Group ${GROUP_ID} created`)
    }
  })

  // If a new TazMessage contract is deployed, it may be necessary to update the group admin
  // on the Semaphore contract to be the address of the new TazMessage contract.
  // The new admin should be the new contract, and this should be run using a connection to the old contract (old contract in config)
  /*  describe('# updateSemaphoreGroupAdmin', () => {
    it('Should update the Semaphore group admin', async () => {
      const newAdminContract = '' // contract.address ?
      const tx = await contract.connect(signer1).updateSemaphoreGroupAdmin(GROUP_ID, newAdminContract)
      const receipt = await tx.wait()
    })
  }) */

  if (ADD_MEMBER) {
    describe('# addMember', () => {
      it('Should fail to add a member if caller is not the owner', async () => {
        const identity = new Identity(identitySeed)
        const identityCommitment = identity.generateCommitment()
        const tx = contract.connect(signer2).addMember(GROUP_ID, identityCommitment)
        await expect(tx).to.be.revertedWith('Ownable: caller is not the owner')
      })

      it('Should add a member', async () => {
        const identity = new Identity(identitySeed)
        const identityCommitment = identity.generateCommitment()
        console.log(
          `TEST | Adding member to group ${GROUP_ID} with identityCommitment ${identityCommitment} using contract ${contract.address}`
        )
        const tx = contract.connect(signer1).addMember(GROUP_ID, identityCommitment)
        await expect(tx).to.emit(contract, 'MemberAdded').withArgs(GROUP_ID, identityCommitment)
      })

      it('Should fail to add a member if the member has already been added', async () => {
        const identity = new Identity(identitySeed)
        const identityCommitment = identity.generateCommitment()
        const tx = contract.connect(signer1).addMember(GROUP_ID, identityCommitment)
        await expect(tx).to.be.revertedWith('Member already added to group')
      })
    })
  }

  describe('# addMessage', () => {
    it('Should add a message', async () => {
      const messageContent = 'What is the name of this Dapp?'
      const messageId = ethers.utils.id(messageContent)
      const signal = messageId.slice(35)

      const proofElements = await run('createProof', {
        identitySeed,
        groupId: GROUP_ID,
        signal,
        logs: false
      })

      // console.log('messageId:', messageId)
      // console.log('messageContent:', messageContent)
      // console.log('proofElements.groupId:', proofElements.groupId)
      // console.log('proofElements.merkleTreeRoot:', proofElements.merkleTreeRoot)
      // console.log('proofElements.signalBytes32:', proofElements.signalBytes32)
      // console.log('proofElements.nullifierHash:', proofElements.nullifierHash)
      // console.log('proofElements.externalNullifier:', proofElements.externalNullifier)
      // console.log('proofElements.solidityProof:', proofElements.solidityProof)

      const tx = contract
        .connect(signer1)
        .addMessage(
          messageId,
          messageContent,
          proofElements.groupId,
          proofElements.merkleTreeRoot,
          proofElements.signalBytes32,
          proofElements.nullifierHash,
          proofElements.externalNullifier,
          proofElements.solidityProof,
          { gasLimit: 1500000 }
        )

      await expect(tx).to.emit(contract, 'MessageAdded').withArgs('', messageId, messageContent)
    })

    it('Should fail to add a message if proof is not verified', async () => {
      const messageContent = 'What is the name of this Dapp again?'
      const messageId = ethers.utils.id(messageContent)
      const signal = messageId.slice(35)

      const proofElements = await run('createProof', {
        identitySeed,
        groupId: GROUP_ID,
        signal,
        logs: false
      })

      const tx = contract.connect(signer1).addMessage(
        messageId,
        messageContent,
        proofElements.groupId,
        proofElements.merkleTreeRoot,
        proofElements.signalBytes32,
        proofElements.nullifierHash,
        0, // proofElements.externalNullifier purposely set to zero so proof will fail
        proofElements.solidityProof,
        { gasLimit: 1500000 }
      )

      await expect(tx).to.be.reverted
    })
  })

  describe('# replyToMessage', () => {
    it('Should reply to a message', async () => {
      const messageContent = 'The name of the Dapp is TAZ'
      const messageId = ethers.utils.id(messageContent)
      const parentMessageId = ethers.utils.id('What is the name of this Dapp?')
      const signal = messageId.slice(35)

      const proofElements = await run('createProof', {
        identitySeed,
        groupId: GROUP_ID,
        signal,
        logs: false
      })

      const tx = contract
        .connect(signer1)
        .replyToMessage(
          parentMessageId,
          messageId,
          messageContent,
          proofElements.groupId,
          proofElements.merkleTreeRoot,
          proofElements.signalBytes32,
          proofElements.nullifierHash,
          proofElements.externalNullifier,
          proofElements.solidityProof,
          { gasLimit: 1500000 }
        )

      await expect(tx).to.emit(contract, 'MessageAdded').withArgs(parentMessageId, messageId, messageContent)
    })

    it('Should fail to reply to message when parentMessageId is empty', async () => {
      const messageContent = 'The name of the Dapp is unknowable'
      const messageId = ethers.utils.id(messageContent)
      const parentMessageId = ''
      const signal = messageId.slice(35)

      const proofElements = await run('createProof', {
        identitySeed,
        groupId: GROUP_ID,
        signal,
        logs: false
      })

      const tx = contract
        .connect(signer1)
        .replyToMessage(
          parentMessageId,
          messageId,
          messageContent,
          proofElements.groupId,
          proofElements.merkleTreeRoot,
          proofElements.signalBytes32,
          proofElements.nullifierHash,
          proofElements.externalNullifier,
          proofElements.solidityProof,
          { gasLimit: 1500000 }
        )

      await expect(tx).to.be.revertedWith('Invalid ID for parent message')
    })
  })
})
