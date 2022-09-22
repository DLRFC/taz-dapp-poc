const { hre, run, ethers } = require('hardhat')

const { TAZMESSAGE_CONTRACT, TAZTOKEN_CONTRACT, SEMAPHORE_CONTRACT } = require('../config/goerli.json')
const tazMessageAbi = require('../artifacts/contracts/TazMessage.sol/TazMessage.json').abi
const tazTokenAbi = require('../artifacts/contracts/TazToken.sol/TazToken.json').abi

async function main() {
  const [signer1, signer2] = await ethers.getSigners()

  const tazMessage = new ethers.Contract(TAZMESSAGE_CONTRACT, tazMessageAbi, signer1)
  const tazToken = new ethers.Contract(TAZTOKEN_CONTRACT, tazTokenAbi, signer1)

  const publicKeys = process.env.PUBLIC_KEY_ARRAY.split(',')

  // console.log('Calling tazMessage.addAdmins')
  // const tx1 = await tazMessage.connect(signer1).addAdmins(publicKeys)
  // const receipt1 = await tx1.wait()
  // console.log('tazMessage.addAdmins receipt', receipt1)

  console.log('Calling tazToken.addAdmins')
  const tx2 = await tazToken.connect(signer1).addAdmins(publicKeys)
  const receipt2 = await tx2.wait()
  console.log('tazToken.addAdmins receipt', receipt2)

  // tazToken.addReviewers()
  // tazToken.addStartStoppers()
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
