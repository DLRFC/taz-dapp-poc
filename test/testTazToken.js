const assert = require('assert')
const { expect } = require('chai')
const { run, ethers } = require('hardhat')
const tazTokenAbi =
    require('../artifacts/contracts/TazToken.sol/TazToken.json').abi
const {
    GROUP_ID,
    TAZTOKEN_CONTRACT,
    SEMAPHORE_CONTRACT,
    IDENTITY_SEED
} = require('../config/goerli.json')
const DEPLOY_NEW_TAZ_TOKEN_CONTRACT = true

describe("TazToken", function () {
    let contract
    let signer1, signer2

    before(async () => {
        const signers = await ethers.getSigners()
        signer1 = signers[0]
        signer2 = signers[1]

        if(DEPLOY_NEW_TAZ_TOKEN_CONTRACT) {
            contract = await run("deployTazToken", {
                semaphoreContract: SEMAPHORE_CONTRACT,
                logs: true
            })
        } else {
            contract = new ethers.Contract(
                TAZTOKEN_CONTRACT,
                tazTokenAbi,
                signer1,
            )
        }
    })

    describe('# safeMint', () => {
        it("Should verify proof and mint an NFT", async () => {
            const uri = "https://bafkreickoepvzub4bh6xtlrpdg5s64iwrzy4dc3vmjrgugxi3gplymqs74.ipfs.dweb.link/";
            const signal = uri.slice(0,31)

            const proofElements = await run('createProof', {
                identitySeed: IDENTITY_SEED,
                groupId: GROUP_ID,
                signal,
                logs: true,
            })

            const tokenId = await contract.callStatic.safeMint(
                signer2.address,
                uri,
                proofElements.groupId,
                proofElements.signalBytes32,
                proofElements.nullifierHash,
                proofElements.externalNullifier,
                proofElements.solidityProof,
                { gasLimit: 1500000 },
            );

            console.log("TEST LOG | Token ID: ", tokenId);

            console.log("TEST LOG | Minting to address: " + signer2.address);

            const tx = await contract.safeMint(
                signer2.address,
                uri,
                proofElements.groupId,
                proofElements.signalBytes32,
                proofElements.nullifierHash,
                proofElements.externalNullifier,
                proofElements.solidityProof,
                { gasLimit: 1500000 },
            );

            console.log("LOG | Transaction: ", tx);

            await expect(tx).to.emit(contract, 'NewToken').withArgs(tokenId, uri)
        })
    })

});
